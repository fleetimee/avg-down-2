import { BottomNav } from "@/components/ui/bottom-nav";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="mx-auto w-full max-w-md h-[100dvh] flex flex-col bg-white border-x border-slate-200 shadow-sm">
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">{children}</ScrollArea>
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
