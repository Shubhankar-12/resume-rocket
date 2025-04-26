import React from "react";

const AppPage = () => {
  return (
    <div>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&scope=user`}
        className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Login with GitHub
      </a>
      ;
    </div>
  );
};

export default AppPage;
