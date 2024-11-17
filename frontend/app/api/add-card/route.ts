import { NextResponse } from "next/server";
import { LearningCard } from "@/types/types";
import { promises as fs } from 'fs'


export async function POST(request: Request) {
    const { card }: { card: LearningCard } = await request.json();

    const file = await fs.readFile(process.cwd() + '/public/cards.json', 'utf-8');
    const cards: LearningCard[] = JSON.parse(file);
    cards.push(card);

    fs.writeFile(process.cwd() + '/public/cards.json', JSON.stringify(cards));

    return NextResponse.json({status: 200});
}