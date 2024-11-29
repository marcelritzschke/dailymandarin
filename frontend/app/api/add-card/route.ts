import { NextResponse } from "next/server";
import { LearningCard } from "@/types/types";
import prisma from "@/prisma/client";
import { Card } from "ts-fsrs";

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

  return NextResponse.json({ status: 200 });
}

export async function PUT(request: Request) {
  const { id, fsrsCard }: { id: number; fsrsCard: Card } = await request.json();

  await prisma.learningCard.update({
    where: {
      id: id,
    },
    data: {
      fsrsCard: {
        update: fsrsCard,
      },
    },
  });

  return NextResponse.json({ status: 200 });
}
