import LearningCardsTable from './components/LearningCardsTable';
import prisma from "@/prisma/client";
import { LearningCard } from '@/types/types';


export default async function HomePage() {
    const cards: LearningCard[] = await prisma.learningCard.findMany({
        include: {
            word: true,
            examples: true
        }
    }) as LearningCard[];
    
    return (
        <div className="container mt-4">
            <LearningCardsTable cards={cards} />
        </div>
    );
}
