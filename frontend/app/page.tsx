import { LearningCard } from '@/types/types';
import LearningCardsTable from './components/LearningCardsTable';
import cardsJson from '@/public/cards.json';


export default async function HomePage() {
  const cards: LearningCard[] = cardsJson;

  return (
    <div className="container mt-4">
      <LearningCardsTable cards={ cards }/>
    </div>
  );
}
