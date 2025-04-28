import { Suspense } from "react";
import GitHubCallbackPage from "./main";

const Githubpage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHubCallbackPage />
    </Suspense>
  );
};

export default Githubpage;
