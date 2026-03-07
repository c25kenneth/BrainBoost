"use client";

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

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
      console.log(data["response"]["fileText"]);
    } catch (err) {
      console.error(err);
    } finally {
      // set the loading functionality here.
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
            console.log("Hello");
          }}
        >
          Create Study Set
        </Button>
      </DialogTrigger>

      <DialogContent>
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
              <Button type="submit">Create</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateStudySetDialogue;
