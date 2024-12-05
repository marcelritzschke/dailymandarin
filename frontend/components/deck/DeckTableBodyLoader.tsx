import { LearningCard } from "@/types/types";
import prisma from "@/prisma/client";
import DeckTableBody from "./DeckTableBody";

const LearningCardsTableLoader: React.FC = async () => {
  const cards: LearningCard[] = (await prisma.learningCard.findMany({
    include: {
      word: true,
      examples: true,
    },
  })) as Array<LearningCard & { fsrsCard: undefined }>;

  return <DeckTableBody cards={cards} />;
};

export default LearningCardsTableLoader;
