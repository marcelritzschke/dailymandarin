import { NextResponse } from "next/server";
import { Message } from "@/types/types";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({apiKey: apiKey});

export async function POST(request: Request) {
    const { msg }: { msg: Message[] } = await request.json();

    const messages: ChatCompletionMessageParam[] = [];
    msg.forEach(el => {
        messages.push({role: el.sender, content: el.text});
    })

    const response = await openai.chat.completions.create({
        messages: messages,
        model: "gpt-3.5-turbo",
        max_tokens: 300,
    });

    return NextResponse.json(response);
}