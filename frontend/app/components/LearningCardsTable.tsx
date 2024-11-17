"use client"
import { LearningCard } from "@/types/types"
import Link from "next/link";
import { useState } from "react";



const LearningCardsTable: React.FC<{ cards: LearningCard[] }> = ({ cards }) => {
  
  const deleteVocabulary = async (id: number) => {
    try {
      const res = await fetch("/api/delete-card", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ idx: id }),
      });
      
      if (!res.ok) {
          throw new Error('Network response was not ok');
      }            
    } catch (error) {
        console.error('Error sending message:', error);
    }
    window.location.reload();
  };

  return (
    <div className="table-responsive">
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Word</th>
            <th scope="col">Description</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cards.map((card, idx) => (
            <tr key={idx}>
              <td className="col-md-2">
                <Link href={`/cards/${idx}`} className="text-decoration-none">
                  {card.word.original}
                </Link>
              </td>
              <td className="col-md-8">{card.word.translation}</td>
              {/* <td>
                <span className={`badge ${card.difficulty === 'Easy' ? 'bg-success' : card.difficulty === 'Medium' ? 'bg-warning' : 'bg-danger'}`}>
                  {card.difficulty}
                </span>
              </td> */}
              <td className="cold-md-2">
                <button type="button" className="btn text-danger trash-button" onClick={() => deleteVocabulary(idx)}>
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default LearningCardsTable;
