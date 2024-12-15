import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    fsrsCard: {
      learningCardId: true,
      userId: true,
    },
  },
});
export default prisma;
