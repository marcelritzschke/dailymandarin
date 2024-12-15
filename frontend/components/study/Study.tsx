"use client";
import { useState } from "react";
import StudyCardComponent from "./StudyCard";
import StudyStart from "./StudyStart";
import { FsrsCardType } from "@/prisma/types";

const StudyComponent: React.FC = () => {
  const [cards, setCards] = useState<FsrsCardType[]>([]);
  const [isStarted, setIsStarted] = useState<boolean>(false);

  return (
    <div className="container text-center">
      {isStarted ? <StudyCardComponent cards={cards} /> : <StudyStart setCards={setCards} setStarted={setIsStarted} />}
    </div>
  );
};

export default StudyComponent;
