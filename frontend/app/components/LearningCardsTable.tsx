import { LearningCard } from "@/types/types"
import Link from "next/link";

const LearningCardsTable: React.FC<{ cards: LearningCard[] }> = ({ cards }) => {
  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Word</th>
            <th scope="col">Description</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card) => (
            <tr key={card.id}>
              <td>
                <Link href={`/cards/${card.id}`} className="text-decoration-none">
                  {card.word}
                </Link>
              </td>
              <td>{card.description}</td>
              {/* <td>
                <span className={`badge ${card.difficulty === 'Easy' ? 'bg-success' : card.difficulty === 'Medium' ? 'bg-warning' : 'bg-danger'}`}>
                  {card.difficulty}
                </span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default LearningCardsTable;
