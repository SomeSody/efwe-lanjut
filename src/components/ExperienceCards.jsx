import { useState } from "react";

const exp = [
  {
    id: 1,
    title: "The Best tour in Florence: Renaissance & Medici Tales - guided by a STORYTELLER",
    rating: 5.0, reviews: 12156, price: "from $4 per adult",
    emoji: "🏛️", from: "#c8d8e8", to: "#8090a8",
  },
  {
    id: 2,
    title: "Full-Day Ninh Binh Highlights Tour from Hanoi",
    rating: 5.0, reviews: 7975, price: "from $83 per adult",
    emoji: "🌿", from: "#a8c8a0", to: "#5a9060",
  },
  {
    id: 3,
    title: "Small Group Blue Cave and Sunj Beach Boat Tour from Dubrovnik",
    rating: 4.9, reviews: 8914, price: "from $84 per adult",
    emoji: "🏖️", from: "#60b8d8", to: "#1870a8",
  },
  {
    id: 4,
    title: "London Small Group Tour of Historical Pubs",
    rating: 5.0, reviews: 9359, price: "from $40 per adult",
    emoji: "🍺", from: "#c8b090", to: "#906040",
  },
];

function Stars({ rating }) {
  return (
    <span className="flex gap-px">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-[10px] ${i < Math.round(rating) ? "text-[#00a87a]" : "text-gray-300"}`}
        >
          ●
        </span>
      ))}
    </span>
  );
}

export default function ExperienceCards() {
  const [liked, setLiked] = useState({});
  const toggle = (id) => setLiked((p) => ({ ...p, [id]: !p[id] }));

  return (
    <div className="w-full px-6 pb-12">
      <h2 className="text-xl font-black text-[#00372d] mb-1">
        Experiences travelers love
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Travelers' Choice Awards Best of the Best
      </p>

      <div className="grid grid-cols-4 gap-4">
        {exp.map((exp) => (
          <div
            key={exp.id}
            className="rounded-xl overflow-hidden border border-gray-200 bg-white cursor-pointer transition-transform hover:-translate-y-1"
          >
            {/* Image area */}
            <div
              className="relative aspect-square flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${exp.from}, ${exp.to})` }}
            >
              <span className="text-6xl opacity-40 select-none">{exp.emoji}</span>

              {/* Badge */}
              <div className="absolute bottom-2.5 left-2.5 bg-[#f5a623] rounded-lg px-2 py-1 flex flex-col items-center leading-none">
                <span className="text-sm">🦉</span>
                <span className="text-[10px] font-black text-[#1a1a1a]">2026</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-xs font-bold text-gray-900 leading-snug mb-2 line-clamp-3">
                {exp.title}
              </p>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-xs font-bold text-gray-900">{exp.rating.toFixed(1)}</span>
                <Stars rating={exp.rating} />
                <span className="text-[11px] text-gray-500">({exp.reviews.toLocaleString()})</span>
              </div>
              <p className="text-xs font-bold text-gray-900">{exp.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
