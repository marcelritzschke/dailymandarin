import { LearningCard } from '@/types/types';
import { promises as fs } from 'fs'
import LearningCardsTable from './components/LearningCardsTable';


export default async function HomePage() {
    const file = await fs.readFile(process.cwd() + '/public/cards.json', 'utf-8');
    const cards: LearningCard[] = JSON.parse(file);

    return (
        <div className="container mt-4">
            <LearningCardsTable cards={cards} />
        </div>
    );
}
