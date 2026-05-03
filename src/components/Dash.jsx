import { useState } from "react";

export default function Dash() {
  const [activeTab, setActiveTab] = useState(0);
  const [query, setQuery] = useState("");

  return (
    <div className="w-full px-6 pt-10">
      {/* Title */}
      <h1 className="text-5xl font-black text-center text-[#00372d] 
          tracking-tight mb-7">
        Where to?
      </h1>

      {/* Search Bar */}
      <div className="flex items-center bg-gray-100 rounded-full 
            pl-5 pr-2 py-2 gap-3 mb-7 border border-gray-200 
            focus-within:border-[#00372d] transition-colors">
        <span className="text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Places to go, things to do, hotels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-gray-800 
          outline-none placeholder-gray-400"
        />
        <button className="bg-[#34d67b] hover:bg-[#22b862] text-white
                  font-bold text-sm rounded-full px-7 py-2.5 
                  transition-colors cursor-pointer">
          Search
        </button>
      </div>

      {/* Hero Banner */}
      <div className="bg-[#111111] rounded-2xl flex items-center 
            justify-between px-14 py-12 gap-8 overflow-hidden">
        <div className="flex-1">
          <h2 className="text-4xl font-black text-white leading-tight mb-3">
            Book the best with<br />the badge
          </h2>
          <button className="bg-[#f5a623] hover:bg-[#e6951a]
                  text-[#1a1a1a] font-bold text-sm rounded-full
                  px-7 py-3 transition-colors cursor-pointer">
            See the winners
          </button>
        </div>

        <div className="w-36 h-36 border-2 border-[#c9a84c] rounded-full
              flex items-center justify-center flex-shrink-0">
          <div className="w-24 h-24 bg-[#f5a623] rounded-2xl flex flex-col
              items-center justify-center">
            <span className="text-3xl">🦉</span>
            <span className="text-base font-black text-[#1a1a1a] tracking-wider">2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
