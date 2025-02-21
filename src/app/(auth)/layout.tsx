import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex animate-in fade-in duration-1000">
      {/* Left side - Image section */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden group">
        <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
          <Image
            src="/auth-banner.jpg"
            alt="Authentication background"
            fill
            className="object-cover mix-blend-overlay opacity-90"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>
        <div className="relative z-10 p-12 flex flex-col justify-center">
          <div className="space-y-6 transition-all duration-700 group-hover:translate-x-2">
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-200">
              {"Welcome Back"}
            </h1>
            <p className="text-lg text-slate-300 max-w-md leading-relaxed">
              {
                "Track your investments and make informed decisions with our powerful analytics platform."
              }
            </p>
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-4 transition-transform duration-500 group-hover:translate-x-2">
                <div className="w-10 h-10 rounded-full bg-slate-600 border-2 border-slate-800" />
                <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-800" />
                <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-800" />
              </div>
              <p className="text-sm text-slate-400 transition-opacity duration-500 group-hover:text-slate-300">
                Join thousands of investors who trust our platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-slate-50 to-white relative animate-in slide-in-from-right duration-1000">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

        {/* Mobile-only header */}
        <div className="lg:hidden absolute top-0 inset-x-0 p-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
            {"Welcome Back"}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-md mx-auto">
            {"Sign in to access your investment dashboard."}
          </p>
        </div>

        <div className="w-full max-w-[440px] backdrop-blur-[2px] relative hover:backdrop-blur-[4px] transition-all duration-500 mt-24 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-100/50 to-white/50 rounded-3xl -z-10" />
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
          <div className="p-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
