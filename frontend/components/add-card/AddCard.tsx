"use client";
import { revalidateDeck } from "@/lib/actions";
import { BilingualText, LearningCard } from "@/types/types";
import { FormEvent, useState } from "react";
import { createEmptyCard } from "ts-fsrs";

const AddCard: React.FC = () => {
  const [wordInput, setWordInput] = useState("");
  const [translationInput, setTranslationInput] = useState("");
  const [examples, setExamples] = useState<BilingualText[]>([
    { original: "", translation: "" },
    { original: "", translation: "" },
    { original: "", translation: "" },
  ]);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isAlertExamples, setIsAlertExamples] = useState<boolean>(false);

  const addExample = () => {
    setExamples([...examples, { original: "", translation: "" }]);
  };

  const generateExamples = async () => {
    if (!wordInput || !translationInput) {
      setIsAlert(true);
      return;
    }

    setIsAlert(false);
    const count: number = examples.length;
    const word: BilingualText = { original: wordInput, translation: translationInput };
    try {
      const res = await fetch("/api/fetch-examples", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count: count, msg: word }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      const response: string = data.choices[0].message.content;

      const examples: BilingualText[] = response
        .trim()
        .split("\n")
        .map((line) => {
          let colon = undefined;
          if (line.indexOf(":") != -1) {
            colon = ":";
          }
          if (line.indexOf("：") != -1) {
            colon = "：";
          }

          if (colon) {
            const parts = line.split(colon);
            return {
              original: parts[0]?.trim() || "",
              translation: parts[1]?.trim() || "",
            };
          } else {
            return { original: "", translation: "" };
          }
        });

      if (examples.length !== count) {
        setIsAlertExamples(true);
      } else {
        setIsAlertExamples(false);
        setExamples([...examples]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const submitToDict = async (e: FormEvent) => {
    e.preventDefault();

    const newCard: LearningCard = {
      level: 1,
      word: { original: wordInput, translation: translationInput },
      examples: examples,
      fsrsCard: createEmptyCard(),
    };
    try {
      const res = await fetch("/api/add-card", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ card: newCard }),
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    await revalidateDeck();
  };

  return (
    <form onSubmit={submitToDict}>
      <div className="row mb-3">
        <div className="col">
          <label htmlFor="wordInput" className="form-label">
            Word
          </label>
          <input
            type="text"
            className="form-control"
            id="wordInput"
            value={wordInput}
            onChange={(e) => setWordInput(e.target.value)}
          />
        </div>
        <div className="col">
          <label htmlFor="translationInput" className="form-label">
            Translation
          </label>
          <input
            type="text"
            className="form-control"
            id="translationInput"
            value={translationInput}
            onChange={(e) => setTranslationInput(e.target.value)}
          />
        </div>
      </div>
      {isAlert && (
        <div className="row mb-3">
          <div className="alert alert-primary" role="alert">
            Please provide a word and its translation!
          </div>
        </div>
      )}
      <div className="row mb-3 mt-4 mx-0">Examples</div>
      {examples.map((example, idx) => (
        <div className="row mb-3" key={idx}>
          <div className="col">
            <input type="text" className="form-control" value={example.original} placeholder="Sentence" readOnly />
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              value={example.translation}
              placeholder="Translation"
              readOnly
            />
          </div>
        </div>
      ))}
      {isAlertExamples && (
        <div className="row mb-3">
          <div className="alert alert-danger" role="alert">
            Failed fetching examples. Please try again.
          </div>
        </div>
      )}
      <div className="row mb-3 mt-5">
        <div className="col">
          <button type="button" className="btn btn-info w-100" onClick={generateExamples}>
            Ask ChatGPT for Examples
          </button>
        </div>
        <div className="col">
          <button type="button" className="btn btn-info w-100" onClick={addExample}>
            Add Example
          </button>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddCard;
