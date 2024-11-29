import { UseFormRegisterReturn } from "react-hook-form";
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/shadcn/form";
import { Input } from "@/shared/ui/shadcn/input";
import type { CreateUserInput } from "@/shared/api/__generated__/graphql";

interface FormFieldProps {
  id: keyof CreateUserInput;
  label: string;
  type?: string;
  placeholder: string;
  autoComplete?: string;
  field: UseFormRegisterReturn<keyof CreateUserInput>;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  autoComplete,
  field,
}: FormFieldProps) {
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
