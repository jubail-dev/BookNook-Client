
import { Suspense } from "react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#f8f7f3]">
          <p className="text-sm text-[#898276]">
            Loading login page...
          </p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
