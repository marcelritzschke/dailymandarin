"use client";
import { LearningCard } from "@/types/types";
import { useState } from "react";
import { translateMandarinToPinyin } from "@/utils/translation";
import { Card, Grade, Rating } from "ts-fsrs";
import { updateFsrsCard } from "@/lib/actions";

const StudyCardComponent: React.FC<{ cards: LearningCard[] }> = ({ cards }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cardIdx, setCardIdx] = useState<number>(0);

  const setRating = async (rating: Grade) => {
    const fsrsCard: Card = cards[cardIdx].fsrsCard;
    // const f: FSRS = fsrs();
    // const schedulingCards: RecordLog = f.repeat(fsrsCard, new Date());
    // const newCard: Card = schedulingCards[rating].card;

    // try {
    //   const res = await fetch("/api/add-card", {
    //     method: "PUT",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ id: cards[cardIdx].id, fsrsCard: newCard }),
    //   });

    //   if (!res.ok) {
    //     throw new Error("Network response was not ok");
    //   }
    // } catch (error) {
    //   console.error("Error sending message:", error);
    // }
    updateFsrsCard(cards[cardIdx].id, rating, fsrsCard);

    setIsOpen(false);
    setCardIdx(cardIdx + 1);
  };

  if (cards.length && cardIdx < cards.length) {
    const hanzi = cards[cardIdx].word.original.split("");

    return (
      <>
        <h5 className="noto-serif-sc">
          {hanzi.map((c, idx) => (
            <span
              key={idx}
              className={`
                            hanzi-spacing
                        `}
            >
              {c}
            </span>
          ))}
        </h5>
        <h6 className="mb-2 text-body-secondary">{translateMandarinToPinyin(cards[cardIdx].word.original)}</h6>

        <div className="container">
          <div className={`${isOpen ? "visible" : "invisible"}`}>
            <hr className="border-2 border-light w-75 mx-auto" />
            <p>{cards[cardIdx].word.translation}</p>
          </div>

          {isOpen ? (
            <div className="row mx-auto rating-buttons">
              <div className="col-sm-3 p-1">
                <button type="button" className="btn btn-primary w-100" onClick={() => setRating(Rating.Again)}>
                  Again
                </button>
              </div>
              <div className="col-sm-3 p-1">
                <button type="button" className="btn btn-primary w-100" onClick={() => setRating(Rating.Hard)}>
                  Hard
                </button>
              </div>
              <div className="col-sm-3 p-1">
                <button type="button" className="btn btn-primary w-100" onClick={() => setRating(Rating.Good)}>
                  Good
                </button>
              </div>
              <div className="col-sm-3 p-1">
                <button type="button" className="btn btn-primary w-100" onClick={() => setRating(Rating.Easy)}>
                  Easy
                </button>
              </div>
            </div>
          ) : (
            <div className="row mx-auto rating-buttons">
              <div className="col-sm-12 p-1">
                <button type="button" className="btn btn-primary" onClick={() => setIsOpen(true)}>
                  Show Answer
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  } else {
    return (
      <div className="container">
        <p>
          Finished for Today <i className="bi bi-rocket-takeoff"></i>
        </p>
        <a type="button" className="btn btn-primary mt-3" href="/">
          Return Home
        </a>
      </div>
    );
  }
};

export default StudyCardComponent;
