const inter = [
  { label: "Outdoors", emoji: "🏜️", from: "#bf5a0a", to: "#e8832a" },
  { label: "Food",     emoji: "🍝", from: "#c47a3a", to: "#e8a86a" },
  { label: "Culture",  emoji: "🎭", from: "#2a1a8a", to: "#8a2aac" },
  { label: "Water",    emoji: "🐠", from: "#0a8a7a", to: "#2ac4b4" },
];

export default function InterestCategories() {
  return (
    <div className="w-full px-6 py-8">
      <h1 className="text-xl font-black mb-1">
        Find things to do by interest
      </h1>
      <p className="text-sm text-gray-500 mb-5">Whatever you're into, we've got it</p>

      <div className="grid grid-cols-4 gap-3">
        {inter.map((item) => (
          <button
            key={item.label}
            className="relative aspect-square rounded-2xl overflow-hidden flex items-end p-4 cursor-pointer transition-transform hover:scale-[1.03]"
            style={{ background: `linear-gradient(145deg, ${item.from}, ${item.to})` }}
          >
            <span className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl opacity-30 select-none">
              {item.emoji}
            </span>
            <span className="relative z-10 text-lg font-black text-white drop-shadow-md">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
