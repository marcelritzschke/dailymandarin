import { NextResponse } from "next/server";
import { LearningCard } from "@/types/types";
import { promises as fs } from 'fs'


export async function POST(request: Request) {
    const { idx }: { idx: number } = await request.json();

    const file = await fs.readFile(process.cwd() + '/public/cards.json', 'utf-8');
    let cards: LearningCard[] = JSON.parse(file);
    cards = cards.filter((_, id) => (id !== idx));

    fs.writeFile(process.cwd() + '/public/cards.json', JSON.stringify(cards));

    return NextResponse.json({status: 200});
}