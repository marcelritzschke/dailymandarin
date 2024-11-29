import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    fsrsCard: {
      id: true,
      fsrsOfLearningCardId: true,
    },
  },
});
export default prisma;
