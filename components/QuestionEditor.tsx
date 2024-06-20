import { useState } from "react";
import { $questions } from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { DialogFooter, DialogHeader } from "./ui/dialog";

type Props = {
  question: IQuestion;
  type?: "add" | "edit";
};

export default function QuestionEditor({ question, type }: Props) {
  const questions = useStore($questions);
  const [editingQuestion, setEditingQuestion] = useState<IQuestion>({
    text: question.text,
    description: question.description,
  });

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    $questions.set(updatedQuestions);
  };

  const handleEditQuestion = (question: IQuestion, index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = question;
    $questions.set(updatedQuestions);
  };

  const index = questions.findIndex(
    (q) => q.text === question.text && q.description === question.description
  );

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full justify-start">
        <Button variant={type === "add" ? "link" : "outline"}>
          {question.text}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add or Edit Question</DialogTitle>

          <DialogDescription>
            Make changes to the question here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="text" className="text-right">
              Question
            </Label>

            <Input
              id="text"
              value={editingQuestion?.text}
              onChange={(e) =>
                setEditingQuestion({
                  text: e.target.value,
                  description: editingQuestion?.description,
                })
              }
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>

            <Input
              id="description"
              value={editingQuestion?.description ?? ""}
              onChange={(e) =>
                setEditingQuestion({
                  text: editingQuestion?.text ?? "",
                  description: e.target.value,
                })
              }
              className="col-span-3"
            />
          </div>
        </div>

        <DialogFooter className="flex w-full flex-row sm:justify-between">
          <Button
            variant="destructive"
            onClick={() => handleDeleteQuestion(index)}
          >
            Delete
          </Button>

          <DialogClose asChild>
            <Button
              variant="outline"
              onClick={() => handleEditQuestion(editingQuestion, index)}
            >
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
