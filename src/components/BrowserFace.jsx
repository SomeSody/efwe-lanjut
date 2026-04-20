const EyeX = () => (
  <svg viewBox="0 0 60 60" className="w-10 h-10">
    <line x1="8" y1="8" x2="52" y2="52" stroke="#2d3a3a" strokeWidth="10" strokeLinecap="round" />
    <line x1="52" y1="8" x2="8" y2="52" stroke="#2d3a3a" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

export default function BrowserFace() {
  return (
    <div className="bg-white rounded-2xl w-[280px] shadow-[8px_12px_0px_#009e8a] overflow-hidden border border-teal-100">

      <div className="flex gap-2 px-4 py-3 bg-gray-50 border-b">
        <div className="w-3 h-3 rounded-full bg-red-400" />
        <div className="w-3 h-3 rounded-full bg-yellow-400" />
        <div className="w-3 h-3 rounded-full bg-green-400" />
      </div>

      <div className="flex flex-col items-center gap-6 py-10">
        <div className="flex gap-10">
          <EyeX />
          <EyeX />
        </div>

        <svg viewBox="0 0 240 80" className="w-40">
          <path
            d="M20 20 Q120 72 220 20"
            fill="none"
            stroke="#2d3a3a"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}