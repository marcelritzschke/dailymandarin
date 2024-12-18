import { getActiveUserId } from "@/lib/db/actions";

const DeckTableHead: React.FC = async () => {
  const hasUser = (await getActiveUserId()) !== undefined;

  return (
    <thead>
      <tr>
        <th scope="col">Word</th>
        <th scope="col">Description</th>
        <th scope="col">Level</th>
        {hasUser && <th scope="col">State</th>}
        {hasUser && <th scope="col">Due</th>}
        {hasUser && <th scope="col">Elapsed</th>}
        {hasUser && <th scope="col">Reps</th>}
        {hasUser && <th scope="col">Remove</th>}
      </tr>
    </thead>
  );
};

export default DeckTableHead;
