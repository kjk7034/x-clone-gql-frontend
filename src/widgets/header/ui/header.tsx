import { getServerSession } from "next-auth";
import { authOptions } from "@/features/auth/lib/next-auth";
import { HeaderClient } from "./header-client";

export async function Header() {
  const session = await getServerSession(authOptions);

  return <HeaderClient session={session} />;
}
