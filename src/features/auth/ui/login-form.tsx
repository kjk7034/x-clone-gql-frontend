"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Form } from "@/shared/ui/shadcn/form";
import { Button } from "@/shared/ui/shadcn/button";
import { loginSchema } from "../model/schema";
import type { LoginInput } from "@/shared/api/__generated__/graphql";
import { handleGraphQLError, ERROR_MESSAGES } from "@/shared/api/errors";
import { LoginFormField } from "./components/login-form-field";
import { LoginButton } from "./components/login-button";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [error, setError] = useState<string>("");

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      setError("");
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: decodeURIComponent(callbackUrl), // callbackUrl 추가
      });

      if (result?.error) {
        // 서버에서 반환하는 에러 코드에 따라 다른 메시지 표시
        const errorCode = result.error as keyof typeof ERROR_MESSAGES;
        setError(ERROR_MESSAGES[errorCode] || "로그인 중 오류가 발생했습니다.");
        return;
      }

      router.push(callbackUrl);
    } catch (err) {
      handleGraphQLError(err, {
        context: "Login Form",
        defaultMessage: "로그인 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <LoginFormField
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          field={form.register("email")}
        />

        <LoginFormField
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="current-password"
          field={form.register("password")}
        />

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <LoginButton isSubmitting={form.formState.isSubmitting} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              계정이 없으신가요?
            </span>
          </div>
        </div>

        <Link href="/create-account" className="w-full">
          <Button variant="outline" className="w-full">
            회원가입
          </Button>
        </Link>
      </form>
    </Form>
  );
}
