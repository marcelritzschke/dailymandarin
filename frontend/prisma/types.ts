import { Prisma } from "@prisma/client";

export type LearningCardType = Prisma.LearningCardGetPayload<{
    include: {
        word: true,
        examples: true
    }
}>
