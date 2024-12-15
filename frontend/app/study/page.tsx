import AuthWrapper from "@/components/AuthWrapper";
import StudyComponent from "@/components/study/Study";

export default async function StudyPage() {
  return (
    <div className="container">
      <AuthWrapper msg="Login with Github and start studying your own cards!">
        <StudyComponent />
      </AuthWrapper>
    </div>
  );
}
