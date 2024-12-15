import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { revalidateDeck } from "@/lib/utils";
import { handleGithubLogin } from "@/lib/github-login";

const LoginCallback: React.FC = async () => {
  const session = await getServerSession(authOptions);
  await handleGithubLogin();

  await revalidateDeck();

  return (
    <div className="container">
      <p className="d-flex justify-content-center">Logged in as {session?.user?.name}</p>
    </div>
  );
};

export default LoginCallback;
