import { BottomNav } from "@/components/ui/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-md min-h-screen relative pb-16">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
