import { createClient, createServiceRoleClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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

        console.log("BACKEND: ", user);

        // Get user's assigned gate from profiles
        const { data: profile } = await supabase
            .from('profiles')
            .select('gate')
            .eq('user', user.id)
            .single();

        console.log(profile);

        if (!profile) {
            return NextResponse.json({ error: "Profile not found" }, { status: 404 });
        }

        // Get correct answer for the gate
        const { data: answerData } = await supabase
            .from('quests')
            .select('id, answer, score')
            .eq('is_answered', false)
            .single();

        if (!answerData) {
            return NextResponse.json({ error: "Answer not found for gate" }, { status: 404 });
        }

        const isCorrect = answer.toLowerCase() === answerData.answer.toLowerCase();

        if (isCorrect) {
            await supabase
                .from('quests')
                .update({ is_answered: true })
                .eq('id', answerData.id);
        }

        // Add score to user's gate (USING SERVICE ROLE CLIENT)
        const { data: gateData } = await serviceRoleClient.from('gates').select('score').eq('name', profile.gate).single();
        const { error: updateError } = await serviceRoleClient.from('gates').update({ score: gateData?.score + answerData.score }).eq('name', profile.gate);
        if (updateError) {
            console.error(updateError);
        }

        return NextResponse.json({ 
            correct: isCorrect,
            message: isCorrect ? "Correct answer!" : "Wrong answer, try again!"
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
