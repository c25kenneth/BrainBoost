"use client";

import { FileText } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const RecentMaterialItem = (m: {
  id: string;
  title: string;
  date: string;
  concepts: string;
}) => {
  return (
    <Link href={`/notes/${m.id}`} className="shrink-0 text-xs text-primary">
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
        View →
      </div>
    </Link>
  );
};

export default RecentMaterialItem;
