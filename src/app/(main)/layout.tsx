import { BottomNav } from "@/components/ui/bottom-nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="mx-auto w-full max-w-md h-screen flex flex-col bg-white border-x border-slate-200 shadow-sm">
        <ScrollArea className="flex-1">{children}</ScrollArea>
        <BottomNav />
      </div>
    </div>
  );
}
