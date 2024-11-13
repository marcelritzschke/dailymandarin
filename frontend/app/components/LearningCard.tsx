import { LearningCard } from "@/types/types";

interface LearningCardProps {
    card: LearningCard;
}

const LearningCardComponent = ({ card }: LearningCardProps) => {
    return (
      <div style={{
        border: '1px solid #ddd',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px 0',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        maxWidth: '400px'
      }}>
        <h2>{card.word} [{card.id}]</h2>
        <p>{card.description}</p>
        <p><strong>Example:</strong> {card.example}</p>
      </div>
    );
  };
  
  export default LearningCardComponent;
  