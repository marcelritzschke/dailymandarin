import { Suspense } from "react";
import DeckTableBodyLoader from "./DeckTableBodyLoader";
import DeckTableHead from "./DeckTableHead";
import DeckTableBodyLoading from "./DeckTableBodyLoading";

const LearningCardsTable: React.FC = () => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <DeckTableHead />
        <Suspense fallback={<DeckTableBodyLoading />}>
          <DeckTableBodyLoader />
        </Suspense>
      </table>
    </div>
  );
};

export default LearningCardsTable;
