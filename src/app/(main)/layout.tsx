import { BottomNav } from "@/components/ui/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="mx-auto w-full max-w-md min-h-screen relative pb-16 bg-white border-x border-slate-200 shadow-sm">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
