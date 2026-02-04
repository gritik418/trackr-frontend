import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg-dark-2 text-white font-sans overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-cyan/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px]"></div>

      <main className="z-10 flex flex-col items-center gap-12 text-center p-8 max-w-4xl">
        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
          <Image
            src="/logo.png"
            alt="Trackr Logo"
            width={120}
            height={120}
            className="rounded-2xl"
            priority
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-linear-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Track Everything.<br />Deliver Anything.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The modern standard for task management. Built for high-performance teams who value speed, precision, and clarity.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            href="/login"
            className="px-10 py-5 bg-brand-cyan text-bg-dark-2 font-bold rounded-2xl text-xl hover:bg-brand-cyan-hover hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_var(--color-brand-cyan)]/30"
          >
            Get Started
          </Link>
          <button
            className="px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl text-xl hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
          >
            View Demo
          </button>
        </div>

        <div className="pt-20 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
          {['Fast', 'Secure', 'Collaborative', 'Scalable'].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-cyan rounded-full"></div>
              <span className="text-sm font-medium tracking-widest uppercase">{text}</span>
            </div>
          ))}
        </div>
      </main>

      <footer className="absolute bottom-8 text-gray-600 text-sm">
        © 2026 Trackr Technologies Inc. All rights reserved.
      </footer>
    </div>
  );
}
