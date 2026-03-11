import FileUploadCard from "@/components/FileUploadCard";
import SignOutButton from "@/components/SignOutButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFirstThreeNotes } from "../notes/actions";
import { getSession } from "@/lib/auth/auth";
import RecentMaterialItem from "@/components/RecentMaterialItem";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getSession();
  const firstThreeNotes = await getFirstThreeNotes(session!.user.id);

  return (
    <div className="flex flex-col bg-background">
      {/* Navbar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <p className="text-3xl">🧠</p>
          <span className="font-bold tracking-tight text-primary text-2xl">
            BrainBoost
          </span>
        </div>
        <SignOutButton />
      </header>

      <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-6 ">
        <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center gap-y-5">
          <FileUploadCard />

          {/* Recent materials */}
          <Card className="w-full">
            <CardHeader className="flex flex-row justify-between">
              <CardTitle className="text-base">Recent Materials</CardTitle>
              <Link href={"/notes"} className="text-sm text-primary">
                See More
              </Link>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {"error" in firstThreeNotes ? (
                <p className="p-4 text-sm text-muted-foreground">
                  Failed to load notes.
                </p>
              ) : firstThreeNotes.length === 0 ? (
                <p className="p-4 text-sm text-muted-foreground">
                  No notes yet.
                </p>
              ) : (
                firstThreeNotes.map((note) => (
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
        </div>
      </main>
    </div>
  );
}
