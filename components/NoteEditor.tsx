"use client";

import { useState, useRef, useCallback } from "react";
import { updateNote } from "@/app/notes/actions";
import {
  BookOpen,
  Lightbulb,
  FlaskConical,
  Target,
  FileText,
  Youtube,
  Image,
  Presentation,
  Plus,
  Trash2,
  Loader2,
} from "lucide-react";

interface NoteSummary {
  tldr: string;
  keyConcepts: string[];
  formulas: string[];
  examTopics: string[];
}

interface NoteData {
  _id: string;
  title: string;
  sourceType: "pdf" | "slides" | "image" | "youtube";
  updatedAt: string;
  summary: NoteSummary;
}

const sourceIcons = {
  pdf: FileText,
  youtube: Youtube,
  image: Image,
  slides: Presentation,
};
const sourceLabels = {
  pdf: "PDF",
  youtube: "YouTube",
  image: "Image",
  slides: "Slides",
};

function EditableText({
  value,
  onSave,
  multiline = false,
  className = "",
  placeholder = "Click to edit…",
}: {
  value: string;
  onSave: (next: string) => void;
  multiline?: boolean;
  className?: string;
  placeholder?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);

  function commit() {
    setEditing(false);
    if (draft.trim() !== value) onSave(draft.trim());
  }

  if (editing) {
    const shared = {
      autoFocus: true as const,
      value: draft,
      onChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
          setDraft(value);
          setEditing(false);
        }
        if (!multiline && e.key === "Enter") commit();
      },
      className: `w-full bg-transparent outline-none ring-1 ring-primary/40 rounded px-1 ${className}`,
    };

    return multiline ? (
      <textarea {...shared} rows={Math.max(3, draft.split("\n").length + 1)} />
    ) : (
      <input {...shared} />
    );
  }

  return (
    <span
      onClick={() => {
        setDraft(value);
        setEditing(true);
      }}
      title="Click to edit"
      className={`cursor-text rounded px-1 -mx-1 hover:bg-muted/60 transition-colors ${
        value ? "" : "text-muted-foreground italic"
      } ${className}`}
    >
      {value || placeholder}
    </span>
  );
}

function EditableList({
  items,
  onSave,
  bulletColor,
  numbered = false,
  mono = false,
}: {
  items: string[];
  onSave: (next: string[]) => void;
  bulletColor?: string;
  numbered?: boolean;
  mono?: boolean;
}) {
  function updateItem(i: number, val: string) {
    const next = [...items];
    next[i] = val;
    onSave(next);
  }

  function removeItem(i: number) {
    onSave(items.filter((_, idx) => idx !== i));
  }

  function addItem() {
    onSave([...items, ""]);
  }

  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 items-start group">
          {numbered ? (
            <span className="shrink-0 font-mono text-xs text-muted-foreground pt-1.5">
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : (
            <span
              className={`mt-2 size-1.5 shrink-0 rounded-full ${bulletColor}`}
            />
          )}
          <EditableText
            value={item}
            onSave={(val) => updateItem(i, val)}
            className={`flex-1 text-sm ${mono ? "font-mono" : ""}`}
          />
          <button
            onClick={() => removeItem(i)}
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-3.5" />
          </button>
        </li>
      ))}
      <li>
        <button
          onClick={addItem}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mt-1"
        >
          <Plus className="size-3.5" /> Add item
        </button>
      </li>
    </ul>
  );
}

export default function NoteEditor({ note }: { note: NoteData }) {
  const [title, setTitle] = useState(note.title);
  const [summary, setSummary] = useState<NoteSummary>(note.summary);
  const [saving, setSaving] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback(
    async (updates: Parameters<typeof updateNote>[1]) => {
      setSaving(true);
      await updateNote(note._id, updates);
      setSaving(false);
    },
    [note._id],
  );

  function scheduleTitle(val: string) {
    setTitle(val);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persist({ title: val }), 300);
  }

  function scheduleSummary(updates: Partial<NoteSummary>) {
    const next = { ...summary, ...updates };
    setSummary(next);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => persist({ summary: next }), 300);
  }

  const SourceIcon = sourceIcons[note.sourceType];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SourceIcon className="size-4" />
            <span>{sourceLabels[note.sourceType]}</span>
            <span>·</span>
            <span>
              Updated{" "}
              {new Date(note.updatedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          {saving && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Loader2 className="size-3 animate-spin" /> Saving…
            </span>
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          <EditableText
            value={title}
            onSave={scheduleTitle}
            className="font-bold text-2xl"
          />
        </h1>
      </div>

      <section className="rounded-xl border border-primary/20 bg-primary/5 p-5 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <BookOpen className="size-4" />
          TL;DR
        </div>
        <EditableText
          value={summary.tldr}
          onSave={(val) => scheduleSummary({ tldr: val })}
          multiline
          className="text-sm leading-relaxed"
          placeholder="Add a summary…"
        />
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <Lightbulb className="size-4 text-yellow-500" />
            Key Concepts
          </div>
          <EditableList
            items={summary.keyConcepts}
            onSave={(val) => scheduleSummary({ keyConcepts: val })}
            bulletColor="bg-yellow-500"
          />
        </section>

        <section className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 font-semibold text-sm">
            <Target className="size-4 text-red-500" />
            Exam Topics
          </div>
          <EditableList
            items={summary.examTopics}
            onSave={(val) => scheduleSummary({ examTopics: val })}
            numbered
          />
        </section>
      </div>

      <section className="rounded-xl border border-border bg-card p-5 flex flex-col gap-3">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <FlaskConical className="size-4 text-blue-500" />
          Formulas
        </div>
        {summary.formulas.length === 0 && (
          <p className="text-sm text-muted-foreground">No formulas yet.</p>
        )}
        <EditableList
          items={summary.formulas}
          onSave={(val) => scheduleSummary({ formulas: val })}
          mono
        />
      </section>
    </div>
  );
}
