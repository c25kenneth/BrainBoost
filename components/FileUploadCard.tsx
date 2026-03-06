"use client";

import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";
import React, { useRef, useState, useCallback } from "react";
import { Button } from "./ui/button";
import CreateStudySetDialogue from "./CreateStudySetDialogue";

const FileUploadCard = () => {
  const [currFile, setCurrFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const blockCardClick = useRef(false);

  const handleDialogOpenChange = useCallback((open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      blockCardClick.current = true;
      setTimeout(() => {
        blockCardClick.current = false;
      }, 300);
    }
  }, []);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            setCurrFile(file);
          }
        }}
      />
      <Card
        className="w-full border-dashed border-2 border-primary/40 bg-primary/5 hover:bg-primary/10"
        onClick={(e) => {
          if (blockCardClick.current) return;
          if (
            e.target === e.currentTarget ||
            (e.target as HTMLElement).closest("button") === null
          ) {
            inputRef.current?.click();
          }
        }}
      >
        <CardContent className="flex flex-col items-center gap-4 py-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-full bg-primary/15">
            <Plus className="size-6 text-primary" />
          </div>
          <div>
            <p className="font-semibold">
              {currFile ? currFile.name : "Upload a document or type"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              BrainBoost will generate a summary, key concepts, and exam-ready
              notes for you.
            </p>

            {currFile ? (
              <div onClick={(e) => e.stopPropagation()}>
                <CreateStudySetDialogue
                  open={dialogOpen}
                  onOpenChange={handleDialogOpenChange}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUploadCard;
