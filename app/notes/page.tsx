import { getSession } from "@/lib/auth/auth";
import { getPaginatedNotes } from "@/app/notes/actions";
import RecentMaterialItem from "@/components/RecentMaterialItem";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";

const LIMIT = 10;

export default async function NotesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await getSession();
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));

  const result = await getPaginatedNotes(session!.user.id, page, LIMIT);

  return (
    <div className="flex flex-col bg-background min-h-screen">
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="flex items-center gap-2">
            <p className="text-3xl">🧠</p>
            <span className="font-bold tracking-tight text-primary text-2xl">
              BrainBoost
            </span>
          </Link>
        </div>
        <SignOutButton />
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6">
        {/* Back link */}
        <Link
          href="/dashboard"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
        >
          ← Back to Dashboard
        </Link>

        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-base">All Materials</CardTitle>
          </CardHeader>
          <CardContent className="divide-y divide-border p-0">
            {"error" in result ? (
              <p className="p-4 text-sm text-muted-foreground">
                Failed to load notes.
              </p>
            ) : result.notes.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">No notes yet.</p>
            ) : (
              result.notes.map((note) => (
                <RecentMaterialItem
                  key={note._id.toString()}
                  id={note._id.toString()}
                  title={note.title}
                  date={note.updatedAt.toLocaleDateString()}
                  concepts={note.summary.keyConcepts.length.toString()}
                />
              ))
            )}
          </CardContent>
        </Card>

        {/* Pagination controls */}
        {"error" in result || result.totalPages <= 1 ? null : (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Page {result.currentPage} of {result.totalPages} &middot;{" "}
              {result.total} total
            </p>
            <div className="flex gap-2">
              <Link
                href={`/notes?page=${page - 1}`}
                aria-disabled={page <= 1}
                className={`rounded-md border border-border px-3 py-1.5 text-sm transition-colors ${
                  page <= 1
                    ? "pointer-events-none text-muted-foreground opacity-40"
                    : "hover:bg-muted"
                }`}
              >
                ← Prev
              </Link>
              <Link
                href={`/notes?page=${page + 1}`}
                aria-disabled={page >= result.totalPages}
                className={`rounded-md border border-border px-3 py-1.5 text-sm transition-colors ${
                  page >= result.totalPages
                    ? "pointer-events-none text-muted-foreground opacity-40"
                    : "hover:bg-muted"
                }`}
              >
                Next →
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
