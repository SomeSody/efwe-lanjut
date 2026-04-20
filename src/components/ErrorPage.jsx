import { useEffect, useState } from "react";
import BrowserFace from "./BrowserFace";

export default function ErrorPage({
  code = "404",
  title = "Page Not Found",
  description = "Halaman tidak ditemukan",
}) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-400 via-emerald-400 to-cyan-500 p-6">

      <div className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-3xl px-10 py-12 flex flex-col items-center text-center gap-6 max-w-md w-full">

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-widest text-teal-700">
          {code}
        </h1>

        <div className={`transition ${glitch ? "animate-pulse" : ""}`}>
          <div className="animate-[float_3s_ease-in-out_infinite]">
            <BrowserFace />
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 uppercase tracking-wide">
          {title}
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
          {description}
        </p>

        <button
          onClick={() => window.history.back()}
          className="mt-2 px-6 py-2 rounded-full border-2 border-teal-700 text-teal-700 font-semibold tracking-wide
          hover:bg-teal-700 hover:text-white transition-all duration-200 active:scale-95"
        >
          ← Kembali
        </button>
      </div>

      <style>
        {`
          @keyframes float {
            0%,100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
    </div>
  );
}