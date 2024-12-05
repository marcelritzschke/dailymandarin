const DeckTableBodyLoading: React.FC = () => {
  return (
    <tbody>
      <tr>
        <td className="col-md-2">
          <div className="placeholder-wave d-flex flex-column justify-content-center">
            <span className="placeholder w-100"></span>
          </div>
        </td>
        <td className="col-md-6">
          <div className="placeholder-wave d-flex flex-column justify-content-center">
            <span className="placeholder w-100"></span>
          </div>
        </td>
        <td className="col-md-1">
          <div className="placeholder-wave d-flex flex-column justify-content-center">
            <span className="placeholder w-100"></span>
          </div>
        </td>
        <td className="col-md-1">
          <div className="placeholder-wave d-flex flex-column justify-content-center">
            <span className="placeholder w-100"></span>
          </div>
        </td>
        <td className="col-md-1">
          <div className="placeholder-wave d-flex flex-column justify-content-center">
            <span className="placeholder w-100"></span>
          </div>
        </td>

        <td className="cold-md-1">
          <span className="d-flex justify-content-center text-primary trash-button">
            <i className="bi bi-trash"></i>
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default DeckTableBodyLoading;
