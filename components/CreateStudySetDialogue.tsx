"use client";

import { createNote } from "@/app/notes/actions";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useState } from "react";

interface CreateStudySetDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedFile: File;
}

// interface StudySetDialogueProps {
// fill this with IDs later.
// }

const INITIAL_STUDYSET_DIALOG = {
  name: "",
  description: "",
  subjects: "",
};

const CreateStudySetDialogue = ({
  open,
  onOpenChange,
  selectedFile,
}: CreateStudySetDialogueProps) => {
  const [formData, setFormData] = useState(INITIAL_STUDYSET_DIALOG);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (
      !selectedFile ||
      !formData.name ||
      !formData.description ||
      !formData.subjects
    ) {
      return;
    }

    const submittedFormData = new FormData();

    submittedFormData.append("file", selectedFile);
    submittedFormData.append("name", formData.name);
    submittedFormData.append("description", formData.description);
    submittedFormData.append("subjects", formData.subjects);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: submittedFormData,
      });

      if (!res.ok) {
        throw new Error("File Parsing Failed");
      }

      const data = await res.json();
      // console.log(data["response"]["fileText"]);

      if (!data) {
        throw new Error("No file text found");
      }

      const geminiRes = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ extractedText: data["response"]["fileText"] }),
      });

      if (!geminiRes.ok) {
        throw new Error("Error getting response from Gemini");
      }

      const resultingJSONDoc = await geminiRes.json();
      console.log(resultingJSONDoc["data"]);

      const result = await createNote({
        userId: data["response"]["userId"],
        title: formData.name,
        sourceType: "pdf",
        rawText: data["response"]["fileText"],
        summary: resultingJSONDoc["data"],
        sourceUrl: `/${selectedFile.name}`,
      });

      if (result?.error) {
        throw new Error(result.error);
      }
      console.log("New Note Added!");
    } catch (err) {
      console.error(err);
    } finally {
      // set the loading functionality here.
      setFormData(INITIAL_STUDYSET_DIALOG);
      setLoading(false);
    }

    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          className="mt-5 hover:cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Create Study Set
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => {
          if (loading) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (loading) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Create your Study Set</DialogTitle>

          <DialogDescription>Enter in the relevant details</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="set-name">Set Name *</Label>
            <Input
              id="set-name"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="set-description">Set Description *</Label>
            <Input
              id="set-description"
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="subjects">Set Subjects (comma separated) *</Label>
            <Input
              id="subjects"
              required
              value={formData.subjects}
              onChange={(e) =>
                setFormData({ ...formData, subjects: e.target.value })
              }
            />
          </div>
          <DialogFooter>
            <div className="flex flex-row gap-x-4">
              <Button
                variant="ghost"
                type="button"
                onClick={() => {
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {!loading ? "Create" : "Creating Set..."}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudySetDialogue;
