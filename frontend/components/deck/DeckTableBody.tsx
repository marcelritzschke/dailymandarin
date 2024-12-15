"use client";
import { deleteCard } from "@/lib/db/actions";
import { revalidateDeck } from "@/lib/utils";
import { LearningCard } from "@/prisma/types";
import Link from "next/link";

const DeckTableBody: React.FC<{ cards: LearningCard[] }> = ({ cards }) => {
  const deleteVocabulary = async (id?: number) => {
    if (id === undefined) {
      return;
    }

    await deleteCard(id);
    await revalidateDeck();
  };

  return (
    <tbody>
      {cards.map((card) => (
        <tr key={card.id}>
          <td className="col-md-2">
            <Link href={`/cards/${card.id}`} className="text-decoration-none noto-serif-sc ">
              {card.word?.original}
            </Link>
          </td>
          <td className="col-md-6">{card.word?.translation}</td>
          <td className="col-md-1"></td>
          <td className="col-md-1"></td>
          <td className="col-md-1"></td>

          <td className="cold-md-1">
            <button type="button" className="btn text-primary trash-button" onClick={() => deleteVocabulary(card.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default DeckTableBody;
