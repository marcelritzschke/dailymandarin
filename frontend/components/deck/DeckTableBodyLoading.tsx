import { getActiveUserId } from "@/lib/db/actions";
import { colSizesPublic, colSizesUser } from "@/lib/deck";

const DeckTableBodyLoading: React.FC = async () => {
  const hasUser = (await getActiveUserId()) !== undefined;
  const colSizes = hasUser ? colSizesUser : colSizesPublic;

  return (
    <tbody>
      <tr>
        {colSizes.map((size, idx) => {
          return (
            <td className={`col-md-${size}`} key={idx}>
              <div className="placeholder-wave d-flex flex-column justify-content-center">
                <span className="placeholder w-100"></span>
              </div>
            </td>
          );
        })}
        {hasUser && (
          <td className={`col-md-${colSizes[-1]}`}>
            <span className="d-flex justify-content-center text-primary trash-button">
              <i className="bi bi-trash"></i>
            </span>
          </td>
        )}
      </tr>
    </tbody>
  );
};

export default DeckTableBodyLoading;
