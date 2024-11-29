import { CreateAccountForm } from "@/features/auth/ui/create-account-form";
import Link from "next/link";

export default function CreateAccountPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="mt-2 text-gray-600">
            이미 계정이 있으신가요?{" "}
            <Link href="/login" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>
        <CreateAccountForm />
      </div>
    </div>
  );
}
