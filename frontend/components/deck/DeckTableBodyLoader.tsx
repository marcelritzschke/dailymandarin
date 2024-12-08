import { LearningCard } from "@/types/types";
import DeckTableBody from "./DeckTableBody";
import { fetchDeck } from "@/lib/actions";

const LearningCardsTableLoader: React.FC = async () => {
  const cards: LearningCard[] = await fetchDeck();
  return <DeckTableBody cards={cards} />;
};

export default LearningCardsTableLoader;
