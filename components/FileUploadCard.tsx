// Test branch
"use client";

import { Card, CardContent } from "./ui/card";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

const FileUploadCard = () => {
  const [currFile, setCurrFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement>(null);

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
        onClick={() => inputRef.current?.click()}
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
              <Button
                className="mt-5 hover:cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Hello");
                }}
              >
                Create Study Set
              </Button>
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
