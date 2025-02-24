export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 flex justify-center">
      <div className="mx-auto w-full max-w-md h-screen relative bg-white border-x border-slate-200 shadow-sm">
        <div className="p-4 h-full flex items-center justify-center">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
