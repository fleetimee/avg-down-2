import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col items-center gap-4">
        <User size={64} className="text-primary" />
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      <Alert>
        <User className="h-4 w-4" />
        <AlertTitle>Profile Information</AlertTitle>
        <AlertDescription className="flex flex-col gap-1">
          <p>Name: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
