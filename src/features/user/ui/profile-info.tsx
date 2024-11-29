import { userService } from "../api/user-service";

export async function ProfileInfo() {
  const user = await userService.getMe();

  return (
    <div className="rounded-lg border p-6 shadow-sm">
      <h2 className="text-2xl font-semibold mb-4">프로필 정보</h2>
      <div className="space-y-2">
        <div>
          <label className="text-sm text-gray-500">이메일</label>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <label className="text-sm text-gray-500">닉네임</label>
          <p className="font-medium">{user.nickname}</p>
        </div>
      </div>
    </div>
  );
}
