import { NextResponse } from "next/server";
import { BilingualText } from "@/types/types";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

export async function POST(request: Request) {
    const { count, msg }: { count: number, msg: BilingualText } = await request.json();

    console.log(count, msg);

    const messages: ChatCompletionMessageParam[] = [
        { 
            role: "user",
            content: `Please provide exactly ${count} example sentences in Chinese with English translation for the word ${msg.original} meaning ${msg.translation}. Your response shall be parsed. Therefor each example shall be on a separate line and divided by a colon. Do not use enumerations.` },
    ];

    const response = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
        max_tokens: 300,
    });

    return NextResponse.json(response);
}