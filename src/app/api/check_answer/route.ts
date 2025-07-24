import { createClient, createServiceRoleClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Get today's date as string for daily quest selection
function getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Get daily quest using date as seed for consistent selection
async function getDailyQuest(supabase: Awaited<ReturnType<typeof createClient>>) {
    const { data: allQuests } = await supabase
        .from('quests')
        .select('id, question, answer, score, is_answered, type, code, image')
        .eq('is_answered', false);
    
    if (!allQuests || allQuests.length === 0) {
        return null;
    }

    // Use date as seed to always get the same quest for the same day
    const dateString = getTodayDateString();
    const dateNumber = new Date(dateString).getTime();
    const questIndex = dateNumber % allQuests.length;
    
    return allQuests[questIndex];
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const serviceRoleClient = await createServiceRoleClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { answer } = body;

        if (!answer) {
            return NextResponse.json({ error: "Answer is required" }, { status: 400 });
        }

        const cookieStore = await cookies();
        const todayDateString = getTodayDateString();
        const answerCookieName = `quest_answered_${todayDateString}`;
        
        // Check if user already answered today's quest
        const hasAnsweredToday = cookieStore.get(answerCookieName);
        if (hasAnsweredToday) {
            return NextResponse.json({ 
                error: "You have already answered today's quest!",
                alreadyAnswered: true
            }, { status: 400 });
        }

        // Get today's quest
        const dailyQuest = await getDailyQuest(supabase);
        if (!dailyQuest) {
            return NextResponse.json({ error: "No quest available" }, { status: 404 });
        }

        // Get user's assigned gate from profiles
        const { data: profile } = await supabase
            .from('profiles')
            .select('gate, nickname, it_id')
            .eq('user', user.id)
            .single();

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        const isCorrect = answer.toLowerCase().trim() === dailyQuest.answer.toLowerCase().trim();

        if (isCorrect) {
            // Add score to user's gate (USING SERVICE ROLE CLIENT)
            const { data: gateData } = await serviceRoleClient
                .from('gates')
                .select('score')
                .eq('name', profile.gate)
                .single();
                
            if (gateData) {
                const { error: updateError } = await serviceRoleClient
                    .from('gates')
                    .update({ score: gateData.score + dailyQuest.score })
                    .eq('name', profile.gate);
                    
                if (updateError) {
                    console.error('Gate score update error:', updateError);
                }
            }

            // Make is_answered to true in quests table
            const { error: questUpdateError } = await serviceRoleClient
                .from('quests')
                .update({ is_answered: true })
                .eq('id', dailyQuest.id);
                
            if (questUpdateError) {
                console.error('Quest update error:', questUpdateError);
            }

            // Also add score to user's profile
            const { data: userData } = await serviceRoleClient
                .from('profiles')
                .select('score')
                .eq('user', user.id)
                .single();
                
            if (userData) {
                const { error: userUpdateError } = await serviceRoleClient
                    .from('profiles')
                    .update({ score: (userData.score || 0) + dailyQuest.score })
                    .eq('user', user.id);
                    
                if (userUpdateError) {
                    console.error('User score update error:', userUpdateError);
                }
            }
        }

        // Set cookie to mark that user has answered today (expires at midnight)
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const response = NextResponse.json({ 
            correct: isCorrect,
            message: isCorrect ? `Correct! You earned ${dailyQuest.score} points!` : "Wrong answer, try again tomorrow!",
            score: isCorrect ? dailyQuest.score : 0,
            answerStatus: isCorrect ? 'correct' : 'incorrect',
            quest: {
                id: dailyQuest.id,
                question: dailyQuest.question,
                score: dailyQuest.score
            }
        });

        // Set cookie that expires at midnight
        response.cookies.set(answerCookieName, 'true', {
            expires: tomorrow,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        // Always store the quest ID so we can show the same quest later
        const questIdCookieName = `quest_id_${todayDateString}`;
        response.cookies.set(questIdCookieName, dailyQuest.id, {
            expires: tomorrow,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        // Store quest data so we can reconstruct the same quest
        const questDataCookieName = `quest_data_${todayDateString}`;
        response.cookies.set(questDataCookieName, JSON.stringify({
            id: dailyQuest.id,
            question: dailyQuest.question,
            score: dailyQuest.score
        }), {
            expires: tomorrow,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        // If answer was correct, set another cookie to track correctness
        if (isCorrect) {
            const correctCookieName = `quest_correct_${todayDateString}`;
            response.cookies.set(correctCookieName, 'true', {
                expires: tomorrow,
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax'
            });
        }

        return response;

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET method to fetch today's quest and user's answer status
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const cookieStore = await cookies();
        const todayDateString = getTodayDateString();
        const answerCookieName = `quest_answered_${todayDateString}`;
        const correctCookieName = `quest_correct_${todayDateString}`;
        const questDataCookieName = `quest_data_${todayDateString}`;

        // Check if user already answered today's quest
        const hasAnsweredToday = cookieStore.get(answerCookieName);
        const wasCorrect = cookieStore.get(correctCookieName);
        const storedQuestData = cookieStore.get(questDataCookieName);

        let questToReturn;

        // If user has already answered, return the stored quest data
        if (hasAnsweredToday && storedQuestData) {
            try {
                questToReturn = JSON.parse(storedQuestData.value);
            } catch (error) {
                console.error('Error parsing stored quest data:', error);
                // Fallback to daily quest if stored data is corrupted
                questToReturn = await getDailyQuest(supabase);
            }
        } else {
            // Get today's quest for users who haven't answered yet
            questToReturn = await getDailyQuest(supabase);
        }

        if (!questToReturn) {
            return NextResponse.json({ error: "No quest available" }, { status: 404 });
        }

        return NextResponse.json({
            id: questToReturn.id,
            question: questToReturn.question,
            score: questToReturn.score,
            code: questToReturn.code,
            image: questToReturn.image,
            hasAnswered: !!hasAnsweredToday,
            wasCorrect: !!wasCorrect,
            date: todayDateString
        });

    } catch (error) {
        console.error('GET API Error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
