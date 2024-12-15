import { LearningCard } from "@/prisma/types";
import DeckTableBody from "./DeckTableBody";
import { fetchDeck } from "@/lib/db/actions";

const LearningCardsTableLoader: React.FC = async () => {
  const cards: LearningCard[] = await fetchDeck();
  return <DeckTableBody cards={cards} />;
};

export default LearningCardsTableLoader;
