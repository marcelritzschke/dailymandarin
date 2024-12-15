import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]";

interface AuthWrapperInterface {
  children: React.ReactNode;
  msg: string;
}

const AuthWrapper: React.FC<AuthWrapperInterface> = async ({ children, msg }: Readonly<AuthWrapperInterface>) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="container">
      {session ? <>{children}</> : <p className="d-flex justify-content-center">{msg}</p>}
    </div>
  );
};

export default AuthWrapper;
