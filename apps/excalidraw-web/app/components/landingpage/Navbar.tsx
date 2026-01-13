import { Brush } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-10 py-6">
      <div className="flex justify-between items-center">
        <div>
          <Brush className="p-2 size-9 mr-2" />
        </div>
        <h1 className="text-2xl font-semibold ">Excalidraw</h1>
      </div>

      <Link href="/signup">
        <button className="rounded-lg border-2 border-zinc-900 px-4 py-2 text-sm font-medium hover:bg-zinc-900 hover:text-white transition">
          Open App
        </button>
      </Link>
    </nav>
  );
}
