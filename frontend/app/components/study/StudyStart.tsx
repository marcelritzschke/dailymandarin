"use client";
import { LearningCard } from "@/types/types";
import { useState } from "react";

interface StudyStartParams {
  setCards: (cards: LearningCard[]) => void;
  setStarted: (value: boolean) => void;
}

const StudyStart: React.FC<StudyStartParams> = ({ setCards, setStarted }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const fetchStudyCards = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/study", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const cards: LearningCard[] = await res.json();
      setCards(cards);
    } catch (error) {
      console.error("Error sending message:", error);
    }

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
