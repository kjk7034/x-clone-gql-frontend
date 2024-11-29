"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/button";
import { Form } from "@/shared/ui/shadcn/form";
import { createAccountSchema } from "../model/schema";
import { CreateUserInput } from "@/shared/api/__generated__/graphql";
import { authService } from "../api/auth-service";
import { handleGraphQLError } from "@/shared/api/errors";
import { FormField } from "./components/form-field";
import { SubmitButton } from "./components/submit-button";
import { Divider } from "./components/divider";

export function CreateAccountForm() {
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      email: "",
      password: "",
      nickname: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: CreateUserInput) => {
    try {
      setError("");
      await authService.createUser(data);
      router.push("/login");
    } catch (err) {
      handleGraphQLError(err, {
        context: "Create Account",
        defaultMessage: "회원가입 중 오류가 발생했습니다.",
        onError: (message) => setError(message),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          id="email"
          label="이메일"
          type="email"
          placeholder="이메일을 입력하세요"
          autoComplete="email"
          field={form.register("email")}
        />

        <FormField
          id="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력하세요"
          autoComplete="new-password"
          field={form.register("password")}
        />

        <FormField
          id="nickname"
          label="닉네임"
          placeholder="닉네임을 입력하세요"
          field={form.register("nickname")}
        />

        {error && (
          <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <SubmitButton
          isSubmitting={form.formState.isSubmitting}
          label="회원가입"
        />

        <Divider label="이미 계정이 있으신가요?" />

        <Link href="/login" className="w-full">
          <Button variant="outline" className="w-full">
            로그인
          </Button>
        </Link>
      </form>
    </Form>
  );
}
