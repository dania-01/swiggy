import AuthLayout from "@/sections/auth/AuthLayout";
import SignupForm from "@/sections/auth/SignupForm";

export const metadata = {
  title: "Create Account — Swiggy",
};

export default function SignupPage() {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
}
