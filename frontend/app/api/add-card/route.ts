import { NextResponse } from "next/server";
import { LearningCard } from "@/types/types";
import prisma from "@/prisma/client";


export async function POST(request: Request) {
    const { card }: { card: LearningCard } = await request.json();

    await prisma.learningCard.create({
        data: {
          level: card.level,
          word: {
            create: card.word,
          },
          examples: {
            create: card.examples,
          },
        },
      });

    return NextResponse.json({status: 200});
}