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

    // Shuffle the quests using today's date as a seed for deterministic shuffling
    function seededShuffle(array: any[], seed: number) {
        // Simple seeded random generator (mulberry32)
        function mulberry32(a: number) {
            return function() {
                var t = a += 0x6D2B79F5;
                t = Math.imul(t ^ t >>> 15, t | 1);
                t ^= t + Math.imul(t ^ t >>> 7, t | 61);
                return ((t ^ t >>> 14) >>> 0) / 4294967296;
            }
        }
        const random = mulberry32(seed);
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const dateString = getTodayDateString();
    const dateNumber = new Date(dateString).getTime();
    const shuffledQuests = seededShuffle(allQuests, dateNumber);
    return shuffledQuests[0];
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
        const correctCookieName = `quest_correct_${todayDateString}`;
        
        // Check if user already got the correct answer today
        const hasAnsweredCorrectly = cookieStore.get(correctCookieName);
        if (hasAnsweredCorrectly) {
            return NextResponse.json({ 
                error: "You have already answered this quest correctly today!",
                alreadyAnsweredCorrectly: true
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

        // Award points if answer is correct
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
            message: isCorrect ? `ถูกต้อง!` : "คำตอบไม่ถูกต้อง ลองใหม่อีกครั้ง!",
            score: isCorrect ? dailyQuest.score : 0,
            answerStatus: isCorrect ? 'correct' : 'incorrect',
            quest: {
                id: dailyQuest.id,
                question: dailyQuest.question,
                score: dailyQuest.score,
                code: dailyQuest.code,
                image: dailyQuest.image
            },
            hasAnsweredCorrectly: isCorrect
        });

        // Always store the quest ID so we can show the same quest later
        const questIdCookieName = `quest_id_${todayDateString}`;
        response.cookies.set(questIdCookieName, dailyQuest.id, {
            expires: tomorrow,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        // Always store quest data so we can show the same quest
        const questDataCookieName = `quest_data_${todayDateString}`;
        response.cookies.set(questDataCookieName, JSON.stringify({
            id: dailyQuest.id,
            question: dailyQuest.question,
            score: dailyQuest.score,
            code: dailyQuest.code,
            image: dailyQuest.image
        }), {
            expires: tomorrow,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        // If answer was correct, set the correct cookie to prevent further attempts
        if (isCorrect) {
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
        const correctCookieName = `quest_correct_${todayDateString}`;
        const questDataCookieName = `quest_data_${todayDateString}`;

        // Check if user already answered correctly today
        const hasAnsweredCorrectly = cookieStore.get(correctCookieName);
        const storedQuestData = cookieStore.get(questDataCookieName);

        let questToReturn;

        // If we have stored quest data, use it to ensure consistency
        if (storedQuestData) {
            try {
                questToReturn = JSON.parse(storedQuestData.value);
            } catch (error) {
                console.error('Error parsing stored quest data:', error);
                // Fallback to daily quest if stored data is corrupted
                questToReturn = await getDailyQuest(supabase);
            }
        } else {
            // Get today's quest for first-time users
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
            hasAnsweredCorrectly: !!hasAnsweredCorrectly,
            date: todayDateString
        });

    } catch (error) {
        console.error('GET API Error:', error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
