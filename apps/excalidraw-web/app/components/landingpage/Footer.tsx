export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 py-8 text-center text-sm text-zinc-500">
      © {new Date().getFullYear()} SketchFlow — Built for clarity.
    </footer>
  );
}