import { LearningCardType } from "@/prisma/types";
import { Card } from "ts-fsrs";

// @TODO: Find a way to retrieve these types from prisma itself to avoid duplication

export interface BilingualText {
  original: string;
  translation: string;
}

export interface LearningCard {
  id?: number;
  word: BilingualText;
  level: number;
  examples: BilingualText[];
  fsrsCard: Card;
}

export interface Message {
  text: string;
  sender: "user" | "system";
}
