"use client";

import FileUploadCard from "@/components/FileUploadCard";
import SignOutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Youtube } from "lucide-react";

const recentMaterials = [
  {
    id: 1,
    title: "Calculus II – Integration Techniques",
    type: "pdf",
    date: "Mar 3, 2026",
    concepts: 24,
  },
  {
    id: 2,
    title: "3Blue1Brown – Linear Algebra Essence",
    type: "pdf",
    date: "Mar 2, 2026",
    concepts: 18,
  },
  {
    id: 3,
    title: "Organic Chemistry Lecture 7 Slides",
    type: "pdf",
    date: "Mar 1, 2026",
    concepts: 31,
  },
];

export default function Dashboard() {
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
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Materials</CardTitle>
            </CardHeader>
            <CardContent className="divide-y divide-border p-0">
              {recentMaterials.map((m) => (
                <div
                  key={m.id}
                  className="flex cursor-pointer items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <FileText className="size-4 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{m.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {m.date} · {m.concepts} concepts
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="shrink-0 text-xs text-primary"
                  >
                    View →
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
