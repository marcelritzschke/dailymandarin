"use client";
import { useState } from "react";
import { LearningCard } from "@/types/types";
import StudyCardComponent from "./study/StudyCard";
import StudyStart from "./study/StudyStart";

const StudyComponent: React.FC = () => {
  const [cards, setCards] = useState<LearningCard[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  return (
    <div className="container text-center">
      {isStarted ? <StudyCardComponent cards={cards} /> : <StudyStart setCards={setCards} setStarted={setIsStarted} />}
    </div>
  );
};

export default StudyComponent;
