export default function Hero() {
  return (
    <section className="mx-auto max-w-5xl px-6 pt-24 text-center">
      <h1 className="text-6xl font-bold tracking-tight leading-tight">
        Think better <br />
        <span className="text-zinc-500">by drawing it out</span>
      </h1>

      <p className="mt-6 text-lg text-zinc-600 max-w-2xl mx-auto">
        A calm, simple whiteboard to sketch ideas, explain concepts,
        and collaborate visually — without distractions.
      </p>

      <div className="mt-10 flex justify-center gap-4">
        <button className="rounded-xl bg-zinc-900 px-8 py-4 text-white font-medium hover:scale-105 transition">
          Start Drawing
        </button>

        <button className="rounded-xl border-2 border-zinc-900 px-8 py-4 font-medium hover:bg-zinc-100 transition">
          Live Collaboration
        </button>
      </div>

      {/* Fake Canvas Preview */}
      <div className="mt-20 rounded-2xl border-2 border-dashed border-zinc-300 bg-white p-10 shadow-sm">
        <p className="text-zinc-400 italic">
          ✏️ Sketch your ideas here...
        </p>
      </div>
    </section>
  );
}
