"use server";

import prisma from "@/prisma/client";
import { LearningCard } from "@/types/types";
import { Card, fsrs, FSRS, RecordLog, Grade } from "ts-fsrs";

export async function updateFsrsCard(id: number | undefined, rating: Grade, fsrsCard: Card) {
  const f: FSRS = fsrs();
  const schedulingCards: RecordLog = f.repeat(fsrsCard, new Date());
  const newCard: Card = schedulingCards[rating].card;

  await prisma.learningCard.update({
    where: {
      id: id,
    },
    data: {
      fsrsCard: {
        update: newCard,
      },
    },
  });
}

export async function fetchDeck(): Promise<LearningCard[]> {
  const cards: LearningCard[] = (await prisma.learningCard.findMany({
    include: {
      word: true,
      examples: true,
    },
  })) as Array<LearningCard & { fsrsCard: undefined }>;
  return cards;
}
