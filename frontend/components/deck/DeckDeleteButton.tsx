"use client";

import { deleteCard } from "@/lib/db/actions";
import { revalidateDeck } from "@/lib/utils";

const deleteDeckCard = async (id?: number) => {
  if (id === undefined) {
    return;
  }

  await deleteCard(id);
  await revalidateDeck();
};

const DeckDeleteButton: React.FC<{ cardId: number }> = ({ cardId }) => {
  return (
    <button type="button" className="btn text-primary trash-button" onClick={() => deleteDeckCard(cardId)}>
      <i className="bi bi-trash"></i>
    </button>
  );
};

export default DeckDeleteButton;
