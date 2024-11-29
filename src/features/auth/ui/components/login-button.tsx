import { Button } from "@/shared/ui/shadcn/button";

interface LoginButtonProps {
  isSubmitting: boolean;
}

export function LoginButton({ isSubmitting }: LoginButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={isSubmitting}>
      {isSubmitting ? (
        <>
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          처리중...
        </>
      ) : (
        "로그인"
      )}
    </Button>
  );
}
