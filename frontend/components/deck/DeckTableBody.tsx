import { FsrsCardType } from "@/prisma/types";
import Link from "next/link";
import DeckDeleteButton from "./DeckDeleteButton";
import { fetchDeckPublic, fetchDeckUser, getActiveUserId } from "@/lib/db/actions";
import { colSizesPublic, colSizesUser } from "@/lib/deck";

const DeckTableBody: React.FC = async () => {
  const hasUser = (await getActiveUserId()) !== undefined;
  const colSizes = hasUser ? colSizesUser : colSizesPublic;

  let cards: FsrsCardType[] = [];
  if (hasUser) {
    cards = await fetchDeckUser();
  } else {
    cards = await fetchDeckPublic().then((res) => {
      return res.map((c) => {
        return {
          id: c.id,
          learningCard: c,
        } as FsrsCardType;
      });
    });
  }

  return (
    <tbody>
      {cards.map((card) => (
        <tr key={card.id}>
          <td className={`col-md-${colSizes[0]}`}>
            <Link href={`/cards/${card.id}`} className="text-decoration-none noto-serif-sc ">
              {card.learningCard?.word?.original}
            </Link>
          </td>
          <td className={`col-md-${colSizes[1]}`}>{card.learningCard?.word?.translation}</td>
          <td className={`col-md-${colSizes[2]}`}>{card.learningCard?.level}</td>

          {hasUser && <td className={`col-md-${colSizes[3]}`}></td>}
          {hasUser && <td className={`col-md-${colSizes[4]}`}></td>}
          {hasUser && <td className={`col-md-${colSizes[5]}`}></td>}
          {hasUser && <td className={`col-md-${colSizes[6]}`}></td>}

          {hasUser && (
            <td className={`col-md-${colSizes[7]}`}>
              <DeckDeleteButton cardId={card.id} />
            </td>
          )}
        </tr>
      ))}
    </tbody>
  );
};

export default DeckTableBody;
