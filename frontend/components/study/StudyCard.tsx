"use client";
import { useState } from "react";
import { translateMandarinToPinyin } from "@/lib/translation";
import { Grade, Rating } from "ts-fsrs";
import { updateFsrsCard } from "@/lib/db/actions";
import { FsrsCardType } from "@/prisma/types";

const StudyCardComponent: React.FC<{ cards: FsrsCardType[] }> = ({ cards }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cardIdx, setCardIdx] = useState<number>(0);

  const setRating = async (rating: Grade) => {
    const fsrsCard: FsrsCardType = cards[cardIdx];
    updateFsrsCard(cards[cardIdx].id, rating, fsrsCard);

    setIsOpen(false);
    setCardIdx(cardIdx + 1);
  };

  if (cards.length && cardIdx < cards.length) {
    const hanzi = cards[cardIdx].learningCard?.word?.original.split("") as string[];

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
        <h6 className="mb-2 text-body-secondary">
          {translateMandarinToPinyin(cards[cardIdx].learningCard?.word?.original as string)}
        </h6>

        <div className="container">
          <div className={`${isOpen ? "visible" : "invisible"}`}>
            <hr className="border-2 border-light w-75 mx-auto" />
            <p>{cards[cardIdx].learningCard?.word?.translation}</p>
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
