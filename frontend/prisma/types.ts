import { Prisma } from "@prisma/client";

export type BilingualText = Prisma.BilingualTextGetPayload<{
  omit: {
    id: true;
    wordOfCardId: true;
    examplesOfCardId: true;
  };
}>;

export type LearningCard = Prisma.LearningCardGetPayload<{
  include: {
    word: true;
    examples: true;
  };
}>;

export type FsrsCardType = Prisma.FsrsCardGetPayload<{
  include: {
    learningCard: { include: { word: true; examples: true } };
  };
}>;
