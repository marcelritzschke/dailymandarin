import { revalidateDeck } from "@/lib/utils";

const LogoutCallback: React.FC = async () => {
  await revalidateDeck();

  return (
    <div className="container">
      <p className="d-flex justify-content-center">Logged out!</p>
    </div>
  );
};

export default LogoutCallback;
