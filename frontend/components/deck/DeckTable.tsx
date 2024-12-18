import { Suspense } from "react";
import DeckTableHead from "./DeckTableHead";
import DeckTableBodyLoading from "./DeckTableBodyLoading";
import DeckTableBody from "./DeckTableBody";

const LearningCardsTable: React.FC = () => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <DeckTableHead />
        <Suspense fallback={<DeckTableBodyLoading />}>
          <DeckTableBody />
        </Suspense>
      </table>
    </div>
  );
};

export default LearningCardsTable;
