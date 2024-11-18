import prisma from "@/prisma/client";
import ChatBoxComponent from "@/app/components/Chatbox";
import { LearningCard, BilingualText } from "@/types/types";
import MandarinEnglishText from "@/app/components/MandarinEnglishText";

async function fetchCard(id: string): Promise<LearningCard | null> {
  const card: LearningCard = await prisma.learningCard.findUnique({
    where: {
      id: Number(id)
    },
    include: {
        word: true,
        examples: true
    }
  }) as LearningCard;

  if (card === null) return null;
  
  return card;
}

interface CardDetailProps {
  params: { id: string };
}

export default async function CardDetailPage({ params }: CardDetailProps) {
  const card = await fetchCard(params.id);
  
  if (!card) return (<p>Card not found</p>);
  
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="d-flex flex-column col-md-6 px-2">
          <div className="card" style={{height: "29%"}}>
            <div className="card-header">Description</div>
            <div className="card-body">
              <MandarinEnglishText key={undefined} text={card.word} focus={card.word.original} />
            </div>
          </div>
          <div className="flex-grow-1"></div>
          <div className="card" style={{height: "69%"}}>
            <div className="card-header">Examples</div>
            <div className="card-body">
              {
                card.examples.map((txt: BilingualText, idx) => (
                  <MandarinEnglishText key={idx} text={txt} focus={card.word.original} />
                ))
              }
            </div>
          </div>
        </div>
        <div className="col-md-6 px-2">
          <ChatBoxComponent />
        </div>
      </div>
    </div>
  );
}
  