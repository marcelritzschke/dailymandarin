"use server";

import prisma from "@/prisma/client";
import { LearningCard, BilingualText } from "@/prisma/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { Card, fsrs, FSRS, RecordLog, Grade } from "ts-fsrs";
import { FsrsCardType } from "@/prisma/types";

export async function deleteCard(idx: number): Promise<void> {
  const userId = await getActiveUserId();
  if (!userId) {
    throw new Error("Cannot delete public cards.");
  }

  await prisma.fsrsCard.delete({
    where: {
      id: idx,
    },
  });
}

export async function fetchCard(id: string): Promise<LearningCard | null> {
  const card: LearningCard | null = await prisma.learningCard.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      word: true,
      examples: true,
    },
  });

  return card;
}

export async function fetchFsrsCards(): Promise<FsrsCardType[]> {
  const userId = await getActiveUserId();

  if (!userId) {
    throw new Error("Unexpected. No active user. Can't fetch FSRS cards.");
  }

  const cards: FsrsCardType[] = (await prisma.fsrsCard.findMany({
    where: {
      userId: userId,
      due: { lte: new Date() },
    },
    include: {
      learningCard: {
        include: {
          word: true,
          examples: true,
        },
      },
    },
  })) as FsrsCardType[];

  return cards;
}

export async function addCard(wordInput: string, translationInput: string, examples: BilingualText[]) {
  const userId = await getActiveUserId();

  if (!userId) {
    throw new Error("Unexpected. No active user. Card won't be added.");
  }

  await prisma.fsrsCard.create({
    data: {
      due: new Date(),
      learningCard: {
        create: {
          level: 1,
          word: { create: { original: wordInput, translation: translationInput } },
          examples: { create: examples },
        },
      },
      user: { connect: { id: userId } },
    },
  });
}

export async function updateFsrsCard(id: number | undefined, rating: Grade, fsrsCard: FsrsCardType) {
  const f: FSRS = fsrs();
  const schedulingCards: RecordLog = f.repeat(fsrsCard, new Date());
  const newCard: Card = schedulingCards[rating].card;

  await prisma.fsrsCard.update({
    where: {
      id: id,
    },
    data: {
      due: newCard.due,
      stability: newCard.stability,
      difficulty: newCard.difficulty,
      elapsed_days: newCard.elapsed_days,
      scheduled_days: newCard.scheduled_days,
      reps: newCard.reps,
      lapses: newCard.lapses,
      state: newCard.state,
      last_review: newCard.last_review,
    },
  });
}

export async function fetchDeck(): Promise<LearningCard[]> {
  const userId = await getActiveUserId();

  if (userId) {
    const cards: LearningCard[] = (await prisma.fsrsCard
      .findMany({
        where: { userId: userId },
        include: {
          learningCard: { include: { word: true, examples: true } },
        },
      })
      .then((res) => {
        return res.map((card) => {
          return card.learningCard;
        });
      })) as LearningCard[];

    return cards;
  } else {
    const cards: LearningCard[] = (await prisma.learningCard.findMany({
      where: { public: true },
      include: { word: true, examples: true },
    })) as LearningCard[];

    return cards;
  }
}

async function getActiveUserId(): Promise<number | undefined> {
  const session = await getServerSession(authOptions);
  if (session && session.user && session.user.email && session.user.name) {
    return await fetchUserByMail(session.user.email).then((id) => {
      return id;
    });
  }
  return undefined;
}

export async function fetchUserByMail(email: string): Promise<number | undefined> {
  const user: number | undefined = await prisma.user
    .findFirst({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    })
    .then((res) => {
      return res ? res.id : undefined;
    });

  return user;
}

export async function createUser(email: string, name: string): Promise<void> {
  const availableCards: { id: number }[] = await prisma.learningCard.findMany({
    where: {
      public: true,
    },
    select: {
      id: true,
    },
  });

  await prisma.user.create({
    data: {
      email: email,
      name: name,
      oauthId: process.env.GITHUB_ID as string,
      cards: {
        create: availableCards.map((card) => {
          return { due: new Date(), learningCard: { connect: card } };
        }),
      },
    },
  });
}
