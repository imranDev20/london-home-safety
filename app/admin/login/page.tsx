import { Suspense } from "react";
import LoginForm from "./_components/login-form";

export default function AdminLoginPage({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl?: string;
  };
}) {
  return (
    <>
      <LoginForm callbackUrl={callbackUrl} />
    </>
  );
}
