const features = [
  {
    title: "Hand-drawn feel",
    desc: "Looks natural, like drawing on paper.",
  },
  {
    title: "Real-time collaboration",
    desc: "Work together instantly, from anywhere.",
  },
  {
    title: "Zero clutter",
    desc: "Only the tools you actually need.",
  },
];

export default function Features() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-28">
      <div className="grid gap-10 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.title}
            className="rounded-xl border border-zinc-200 bg-white p-8 hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold">{f.title}</h3>
            <p className="mt-3 text-zinc-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}