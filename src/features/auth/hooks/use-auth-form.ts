import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth";
import {
  SignInSchema,
  SignUpSchema,
  signInSchema,
  signUpSchema,
} from "../schemas/auth.schema";

interface UseAuthFormProps {
  mode: "signin" | "signup";
}

export function useAuthForm({ mode }: UseAuthFormProps) {
  const { toast } = useToast();

  const form = useForm<SignInSchema | SignUpSchema>({
    resolver: zodResolver(mode === "signin" ? signInSchema : signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "signup" && { name: "" }),
    },
  });

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(data: SignInSchema | SignUpSchema) {
    try {
      if (mode === "signin") {
        await authClient.signIn.email(
          {
            email: data.email,
            password: data.password,
            callbackURL: "/",
          },
          {
            onSuccess: () => {
              toast({
                title: "Success",
                description: "Successfully signed in!",
                variant: "default",
              });

              form.reset();
            },
            onError: (ctx) => {
              toast({
                title: "Error",
                description: ctx.error.message,
                variant: "destructive",
              });
            },
          }
        );
      } else {
        const signUpData = data as SignUpSchema;
        await authClient.signUp.email(
          {
            email: signUpData.email,
            password: signUpData.password,
            name: signUpData.name,
            callbackURL: "/sign-in",
          },
          {
            onSuccess: () => {
              toast({
                title: "Success",
                description: "Successfully created account!",
                variant: "default",
              });

              form.reset();
            },
            onError: (ctx) => {
              toast({
                title: "Error",
                description: ctx.error.message,
                variant: "destructive",
              });
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description:
          mode === "signin"
            ? "Failed to sign in. Please check your credentials."
            : "Failed to create account. Please try again.",
        variant: "destructive",
      });
    }
  }

  return {
    form,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
  };
}
