import { authOptions } from "@/features/auth/lib/next-auth";
import { ProfileInfo } from "@/features/user/ui/profile-info";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProfileInfo />
    </div>
  );
}
