import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/shadcn/form";
import { Input } from "@/shared/ui/shadcn/input";
import { UseFormRegisterReturn } from "react-hook-form";
import type { LoginInput } from "@/shared/api/__generated__/graphql";

interface LoginFormFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  field: UseFormRegisterReturn<keyof LoginInput>;
}

export function LoginFormField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  field,
}: LoginFormFieldProps) {
  return (
    <FormItem>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <FormControl>
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-describedby={`${id}-error`}
          {...field}
        />
      </FormControl>
      <FormMessage id={`${id}-error`} />
    </FormItem>
  );
}
