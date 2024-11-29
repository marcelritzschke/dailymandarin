import prisma from "@/prisma/client";
import { LearningCard } from "@/types/types";
import { NextResponse } from "next/server";
import { Card } from "ts-fsrs";

export async function GET() {
  const cards: LearningCard[] = (await prisma.learningCard.findMany({
    where: {
      fsrsCard: { due: { lte: new Date() } },
    },
    include: {
      word: true,
      examples: true,
      fsrsCard: true,
    },
  })) as Array<LearningCard & { fsrsCard: Card }>;

  return NextResponse.json(cards);
}
