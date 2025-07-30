import { createClient, createServiceRoleClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Get today's date as string for daily quest selection
function getTodayDateString(): string {
    const today = new Date();
    return today.toISOString().split('T')[0]; // YYYY-MM-DD format
}

// Get daily quest using completely random selection
async function getDailyQuest(supabase: Awaited<ReturnType<typeof createClient>>) {
    // MODIFIED: Only get quests with IDs 94-102 for testing
    const { data: allQuests } = await supabase
        .from('quests')
        .select('id, question, answer, score, is_answered, type, code, image')
        // .gte('id', 94)
        // .lte('id', 102)
        .eq('is_answered', false);

    if (!allQuests || allQuests.length === 0) {
        return null;
    }

    // Completely random selection - no seeding
    const randomIndex = Math.floor(Math.random() * allQuests.length);
    return allQuests[randomIndex];
}

// Get quest by ID (including answer for server-side operations)
async function getQuestById(supabase: Awaited<ReturnType<typeof createClient>>, questId: string) {
    const { data: quest } = await supabase
        .from('quests')
        .select('id, question, answer, score, is_answered, type, code, image')
        .eq('id', questId)
        .single();

    return quest;
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
        const questIdCookieName = `quest_id_${todayDateString}`;
        
        // Check if user already got the correct answer today
        const hasAnsweredCorrectly = cookieStore.get(correctCookieName);
        if (hasAnsweredCorrectly) {
            return NextResponse.json({ 
                error: "You have already answered this quest correctly today!",
                alreadyAnsweredCorrectly: true
            }, { status: 400 });
        }

        // Get today's quest - prioritize stored quest ID for consistency
        let dailyQuest;
        const storedQuestId = cookieStore.get(questIdCookieName);
        
        if (storedQuestId) {
            // Fetch full quest data (including answer) using stored ID
            console.log("Fetching quest by ID:", storedQuestId.value);
            const questResult = await serviceRoleClient
                .from('quests')
                .select('id, question, answer, score, is_answered, type, code, image')
                .eq('id', storedQuestId.value)
                .single();
            
            console.log("Direct DB response:", questResult);
            dailyQuest = questResult.data;
            
            if (!dailyQuest) {
                // If stored quest ID is invalid, get a new random quest
                console.log("No quest found, getting random quest");
                dailyQuest = await getDailyQuest(serviceRoleClient);
            }
        } else {
            // Get today's quest for first-time users
            console.log("Getting random quest for first time user");
            dailyQuest = await getDailyQuest(serviceRoleClient);
        }
        
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

        console.log("USER ANSWER: ", answer);
        console.log("DAILY QUEST OBJECT: ", JSON.stringify(dailyQuest, null, 2));
        console.log("ANSWER FIELD TYPE: ", typeof dailyQuest.answer);
        console.log("ANSWER FIELD LENGTH: ", dailyQuest.answer?.length);
        console.log("ANSWER FIELD FIRST CHAR: ", dailyQuest.answer?.[0]);
        console.log("TRIMMED: ", answer.toLowerCase().trim(), dailyQuest.answer.toLowerCase().trim());
        console.log("IS CORRECT: ", answer.toLowerCase().trim() === dailyQuest.answer.toLowerCase().trim());
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
                type : dailyQuest.type,
                code: dailyQuest.code,
                image: dailyQuest.image
            },
            hasAnsweredCorrectly: isCorrect
        });

        // Always store quest ID so we can fetch the same quest later
        response.cookies.set(questIdCookieName, dailyQuest.id, {
            expires: tomorrow,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        // Also store quest data (without answer) for GET method
        const questDataCookieName = `quest_data_${todayDateString}`;
        response.cookies.set(questDataCookieName, JSON.stringify({
            id: dailyQuest.id,
            question: dailyQuest.question,
            score: dailyQuest.score,
            type: dailyQuest.type,
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
        const questIdCookieName = `quest_id_${todayDateString}`;
        const questDataCookieName = `quest_data_${todayDateString}`;

        // Check if user already answered correctly today
        const hasAnsweredCorrectly = cookieStore.get(correctCookieName);
        const storedQuestId = cookieStore.get(questIdCookieName);
        const storedQuestData = cookieStore.get(questDataCookieName);

        let questToReturn;

        // Priority 1: Use stored quest data (fastest, already parsed)
        if (storedQuestData) {
            try {
                questToReturn = JSON.parse(storedQuestData.value);
            } catch (error) {
                console.error('Error parsing stored quest data:', error);
                questToReturn = null;
            }
        }

        // Priority 2: Use stored quest ID to fetch from database  
        if (!questToReturn && storedQuestId) {
            const fullQuest = await getQuestById(supabase, storedQuestId.value);
            if (fullQuest) {
                // Remove answer field for client response
                questToReturn = {
                    id: fullQuest.id,
                    question: fullQuest.question,
                    score: fullQuest.score,
                    code: fullQuest.code,
                    image: fullQuest.image
                };
            }
        }

        // Priority 3: Get new random quest for first-time users
        if (!questToReturn) {
            const newQuest = await getDailyQuest(supabase);
            if (newQuest) {
                questToReturn = {
                    id: newQuest.id,
                    question: newQuest.question,
                    score: newQuest.score,
                    code: newQuest.code,
                    image: newQuest.image
                };
                
                // CRITICAL: Store quest ID and data for POST method consistency
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                
                const response = NextResponse.json({
                    id: questToReturn.id,
                    question: questToReturn.question,
                    score: questToReturn.score,
                    code: questToReturn.code,
                    image: questToReturn.image,
                    hasAnsweredCorrectly: !!hasAnsweredCorrectly,
                    date: todayDateString
                });
                
                // Store quest ID for POST method
                response.cookies.set(questIdCookieName, newQuest.id, {
                    expires: tomorrow,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });
                
                // Store quest data for future GET requests
                response.cookies.set(questDataCookieName, JSON.stringify(questToReturn), {
                    expires: tomorrow,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax'
                });
                
                return response;
            }
        }

        if (!questToReturn) {
            return NextResponse.json({ error: "No quest available" }, { status: 404 });
        }

        return NextResponse.json({
            id: questToReturn.id,
            question: questToReturn.question,
            score: questToReturn.score,
            type : questToReturn.type,
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