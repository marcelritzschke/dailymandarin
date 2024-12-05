import prisma from "@/prisma/client";
import ChatBoxComponent from "@/components/Chatbox";
import { LearningCard, BilingualText } from "@/types/types";
import MandarinEnglishText from "@/components/MandarinEnglishText";

async function fetchCard(id: string): Promise<LearningCard | null> {
  const card: LearningCard = (await prisma.learningCard.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      word: true,
      examples: true,
    },
  })) as LearningCard & { fsrsCard: undefined };

  if (card === null) return null;

  return card;
}

interface CardDetailProps {
  params: { id: string };
}

export default async function CardDetailPage({ params }: CardDetailProps) {
  const card = await fetchCard(params.id);

  if (!card) return <p>Card not found</p>;

  return (
    <div className="container">
      <div className="row g-3">
        <div className="col-md-6 vstack gap-3">
          <div className="card">
            <div className="card-header">Description</div>
            <div className="card-body overflow-auto">
              <MandarinEnglishText key={undefined} text={card.word} focus={card.word.original} />
            </div>
          </div>
          <div className="card">
            <div className="card-header">Examples</div>
            <div className="card-body overflow-auto">
              {card.examples.map((txt: BilingualText, idx) => (
                <MandarinEnglishText key={idx} text={txt} focus={card.word.original} />
              ))}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <ChatBoxComponent />
        </div>
      </div>
    </div>
  );
}
