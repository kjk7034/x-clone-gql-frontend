import { LoginForm } from "@/features/auth/ui/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="mt-2 text-gray-600">
            계정이 없으신가요?{" "}
            <Link
              href="/create-account"
              className="text-primary hover:underline"
            >
              회원가입
            </Link>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
