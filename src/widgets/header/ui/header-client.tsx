"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/shared/ui/shadcn/button";
import { Session } from "next-auth";

type HeaderClientProps = {
  session: Session | null;
};

export const HeaderClient = ({ session }: HeaderClientProps) => {
  return (
    <header className="border-b">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="text-xl font-bold mr-6">
          Logo
        </Link>
        <nav className="flex items-center space-x-4 ml-auto">
          {session ? (
            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              variant="ghost"
            >
              로그아웃
            </Button>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">로그인</Button>
              </Link>
              <Link href="/create-account">
                <Button>회원가입</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
