import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../../../../auth";
import { Settings, LogOut } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LogoutButton } from "@/features/auth/components/logout-button";

export default async function SettingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col items-center gap-4">
        <Settings size={64} className="text-primary" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Alert>
        <Settings className="h-4 w-4" />
        <AlertTitle>App Settings</AlertTitle>
        <AlertDescription>
          Settings configuration coming soon...
        </AlertDescription>
      </Alert>

      <Alert variant="destructive">
        <LogOut className="h-4 w-4" />
        <AlertTitle>Account</AlertTitle>
        <AlertDescription className="flex justify-between items-center">
          <span>Sign out from your account</span>
          <LogoutButton />
        </AlertDescription>
      </Alert>
    </div>
  );
}
