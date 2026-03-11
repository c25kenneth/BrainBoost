import { getNoteById } from "@/app/notes/actions";
import SignOutButton from "@/components/SignOutButton";
import NoteEditor from "@/components/NoteEditor";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function NotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = await getNoteById(id);

  if ("error" in result) {
    notFound();
  }

  const note = JSON.parse(JSON.stringify(result.note));

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <Link href="/dashboard" className="flex items-center gap-2">
          <p className="text-3xl">🧠</p>
          <span className="font-bold tracking-tight text-primary text-2xl">
            BrainBoost
          </span>
        </Link>
        <SignOutButton />
      </header>

      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-6">
        {/* Back */}
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          ← Back to All Materials
        </Link>

        <NoteEditor note={note} />
      </main>
    </div>
  );
}
