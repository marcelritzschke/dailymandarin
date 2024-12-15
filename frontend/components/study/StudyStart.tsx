"use client";
import { fetchFsrsCards } from "@/lib/db/actions";
import { FsrsCardType } from "@/prisma/types";
import { useState } from "react";

interface StudyStartParams {
  setCards: (cards: FsrsCardType[]) => void;
  setStarted: (value: boolean) => void;
}

const StudyStart: React.FC<StudyStartParams> = ({ setCards, setStarted }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudyCards = async () => {
    setLoading(true);

    await fetchFsrsCards().then((res) => {
      setCards(res);
    });

    setStarted(true);
    setLoading(false);
  };

  return (
    <div className="vstack gap-2 w-50 mx-auto">
      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      <button
        type="button"
        className={`btn btn-primary ${loading && "visually-hidden"}`}
        onClick={() => fetchStudyCards()}
        disabled={loading}
      >
        Start
      </button>
    </div>
  );
};

export default StudyStart;
