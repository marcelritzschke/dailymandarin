import AuthWrapper from "@/components/AuthWrapper";
import AddCard from "@/components/add-card/AddCard";

export default async function AddCardPage() {
  return (
    <div className="container">
      <AuthWrapper msg="Login with Github to add your own Learning Cards!">
        <AddCard />
      </AuthWrapper>
    </div>
  );
}
