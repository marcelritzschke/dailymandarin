import { LearningCard } from '@/types/types';
import LearningCardsTable from './components/LearningCardsTable';

async function fetchCards(): Promise<LearningCard[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cards`);
  return res.json();
}


export default async function HomePage() {
  const cards = await fetchCards();

  return (
    <div className="container mt-4">
      <LearningCardsTable cards={ cards }/>
    </div>
  );
}
