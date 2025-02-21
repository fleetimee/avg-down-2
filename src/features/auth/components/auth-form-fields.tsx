import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignInSchema, SignUpSchema } from "../schemas/auth.schema";

interface AuthFormFieldsProps {
  mode: "signin" | "signup";
  form: UseFormReturn<SignInSchema | SignUpSchema>;
  isLoading: boolean;
}

export function AuthFormFields({ mode, form, isLoading }: AuthFormFieldsProps) {
  return (
    <div className="space-y-6">
      {mode === "signup" && (
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Name"
                  className="h-12 px-4 text-base"
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>Enter your full name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                placeholder="Email"
                className="h-12 px-4 text-base"
                disabled={isLoading}
              />
            </FormControl>
            <FormDescription>Enter your email address</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="password"
                placeholder="Password"
                className="h-12 px-4 text-base"
                disabled={isLoading}
              />
            </FormControl>
            <FormDescription>
              {mode === "signup"
                ? "Create a secure password (minimum 8 characters)"
                : "Enter your password"}
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
