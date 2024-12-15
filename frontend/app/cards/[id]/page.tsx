import ChatBoxComponent from "@/components/Chatbox";
import { BilingualText } from "@/prisma/types";
import MandarinEnglishText from "@/components/MandarinEnglishText";
import { fetchCard } from "@/lib/db/actions";

interface CardDetailProps {
  params: { id: string };
}

export default async function CardDetailPage({ params }: CardDetailProps) {
  const card = await fetchCard(params.id);

  if (!card) return <p className="d-flex justify-content-center">Card not found</p>;

  return (
    <div className="container">
      <div className="row g-3">
        <div className="col-md-6 vstack gap-3">
          <div className="card">
            <div className="card-header">Description</div>
            <div className="card-body overflow-auto">
              <MandarinEnglishText
                cardId={undefined}
                text={card.word as BilingualText}
                focus={card.word?.original as string}
              />
            </div>
          </div>
          <div className="card">
            <div className="card-header">Examples</div>
            <div className="card-body overflow-auto">
              {card.examples.map((txt: BilingualText, idx) => (
                <div key={idx}>
                  <MandarinEnglishText cardId={idx} text={txt} focus={card.word?.original as string} />
                </div>
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
