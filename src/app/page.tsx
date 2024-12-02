import { ProfileInfo } from "@/features/user/ui/profile-info";

export default async function HomePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <ProfileInfo />
    </div>
  );
}
