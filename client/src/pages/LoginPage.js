import React from "react";

function LoginPage() {
  return (
    <div className='flex justify-center align-middle pt-3'>
      <a
        className='rounded-md bg-slate-200 px-4 py-2 hover:text-slate-400'
        href='http://localhost:8080/api/v1/oauth2/authorization/google?redirect_url=http://localhost:3000'
      >
        Login with google
      </a>
    </div>
  );
}

export default LoginPage;
