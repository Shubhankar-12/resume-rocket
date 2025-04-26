import { Suspense } from "react";
import GitHubCallbackPage from "./main";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GitHubCallbackPage />
    </Suspense>
  );
};

export default page;
