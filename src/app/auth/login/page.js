import AuthLayout from "@/sections/auth/AuthLayout";
import LoginForm from "@/sections/auth/LoginForm";

export const metadata = {
  title: "Login — Swiggy",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
