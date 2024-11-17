import ChatBoxComponent from "@/app/components/Chatbox";
import { promises as fs } from 'fs'
import { LearningCard, BilingualText } from "@/types/types";
import MandarinEnglishText from "@/app/components/MandarinEnglishText";

async function fetchCard(id: number): Promise<LearningCard | null> {
  const file = await fs.readFile(process.cwd() + '/public/cards.json', 'utf-8');
  const cards: LearningCard[] = JSON.parse(file);
  
  const res: LearningCard = cards[id];
  if (res === undefined) return null;
  
  return res;
}

interface CardDetailProps {
  params: { id: number };
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
              <MandarinEnglishText text={card.word} focus={card.word.original} />
            </div>
          </div>
          <div className="flex-grow-1"></div>
          <div className="card" style={{height: "69%"}}>
            <div className="card-header">Examples</div>
            <div className="card-body">
              {
                card.examples.map((txt: BilingualText) => (
                  <MandarinEnglishText text={txt} focus={card.word.original} />
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
  