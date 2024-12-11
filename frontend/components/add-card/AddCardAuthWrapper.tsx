"use client";
import { useSession } from "next-auth/react";
import AddCard from "@/components/add-card/AddCard";

const AddCardAuthWrapper: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="container">
      {session ? (
        <AddCard />
      ) : (
        <h2 className="d-flex justify-content-center">
          Login with Github to add your own Learning Cards!
        </h2>
      )}
    </div>
  );
};

export default AddCardAuthWrapper;
