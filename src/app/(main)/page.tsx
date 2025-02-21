import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../auth";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogoutButton } from "@/features/auth/components/logout-button";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Welcome {session.user.name}!</h1>
        <p className="text-gray-600">You are successfully logged in.</p>
      </div>

      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Authentication Status</AlertTitle>
        <AlertDescription>
          You are currently signed in as {session.user.email}
        </AlertDescription>
      </Alert>

      <div className="mt-4">
        <LogoutButton />
      </div>
    </div>
  );
}
