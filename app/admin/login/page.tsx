import { Suspense } from "react";
import LoginForm from "./_components/login-form";

export default function AdminLoginPage() {
  return (
    <>
      <Suspense fallback="Loading...">
        <LoginForm />
      </Suspense>
    </>
  );
}
