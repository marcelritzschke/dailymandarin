"use client"
import { LearningCard } from "@/types/types"
import Link from "next/link";



const LearningCardsTable: React.FC<{ cards: LearningCard[] }> = ({ cards }) => {
  
  const deleteVocabulary = async (id?: number) => {
    if (id === undefined) {
      return;
    }

    try {
      const res = await fetch("/api/delete-card", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idx: id }),
      });
      
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }            
    } catch (error) {
        console.error('Error sending message:', error);
    }
    window.location.reload();
  };

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Word</th>
            <th scope="col">Description</th>
            <th scope="col">New</th>
            <th scope="col">Learn</th>
            <th scope="col">Due</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td className="col-md-2">
                <Link href={`/cards/${card.id}`} className="text-decoration-none noto-serif-sc">
                  {card.word.original}
                </Link>
              </td>
              <td className="col-md-6">{card.word.translation}</td>
              <td className="col-md-1"></td>
              <td className="col-md-1"></td>
              <td className="col-md-1"></td>
              
              <td className="cold-md-1">
                <button type="button" className="btn text-danger trash-button" onClick={() => deleteVocabulary(card.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default LearningCardsTable;
