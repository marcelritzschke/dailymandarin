import ChatBoxComponent from "@/app/components/Chatbox";
import { LearningCard } from "@/types/types";
import cardsJson from '@/public/cards.json';


function fetchCard(id: string): LearningCard | null {
  const cards: LearningCard[] = cardsJson;
  const res: LearningCard | undefined = cards.find((card) => {
    return card.id.toString() === id;
  });

  if (res === undefined) return null;
  
  return res;
}

interface CardDetailProps {
    params: { id: string };
}

export default async function CardDetailPage({ params }: CardDetailProps) {
  const card = fetchCard(params.id);

  if (!card) return (<p>Card not found</p>);

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="d-flex flex-column col-md-6 px-2">
          <div className="card" style={{height: "49%"}}>
            <div className="card-header">Description</div>
            <div className="card-body">
              <h5 className="card-title">{card.word}</h5>
              <p className="card-text">{card.description}</p>
            </div>
          </div>
          <div className="flex-grow-1"></div>
          <div className="card" style={{height: "49%"}}>
            <div className="card-header">Examples</div>
            <div className="card-body">
              <p className="card-text">{card.example}</p>
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
  