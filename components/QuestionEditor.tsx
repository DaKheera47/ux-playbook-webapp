import { useState } from "react";
import { $introductionQuestions, $questions } from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  question: IQuestion;
  type?: "add" | "edit";
  questionType?: "introduction" | "base";
};

export default function QuestionEditor({
  question,
  type,
  questionType,
}: Props) {
  const baseQuestions = useStore($questions);
  const introductionQuestions = useStore($introductionQuestions);

  const $questionsList =
    questionType === "base" ? $questions : $introductionQuestions;
  const questions =
    questionType === "base" ? baseQuestions : introductionQuestions;

  const [editingQuestion, setEditingQuestion] = useState<IQuestion>({
    text: question.text,
    description: question.description,
  });

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    $questionsList.set(updatedQuestions);
  };

  const handleEditQuestion = (question: IQuestion, index: number) => {
    if (index === -1) {
      // append new question
      $questionsList.set([...questions, question]);
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[index] = question;
    $questionsList.set(updatedQuestions);
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

      <DialogContent className="sm:max-w-lg">
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
              className="col-span-3"
              onChange={(e) =>
                setEditingQuestion({
                  text: e.target.value,
                  description: editingQuestion?.description,
                })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>

            <Input
              id="description"
              value={editingQuestion?.description ?? ""}
              className="col-span-3"
              onChange={(e) =>
                setEditingQuestion({
                  text: editingQuestion?.text ?? "",
                  description: e.target.value,
                })
              }
            />
          </div>
        </div>

        <DialogFooter
          className={cn("flex w-full flex-row sm:justify-between", {
            "sm:justify-end": type === "add",
          })}
        >
          {type !== "add" && (
            <DialogClose asChild>
              <Button
                variant="destructive"
                onClick={() => handleDeleteQuestion(index)}
              >
                Delete
              </Button>
            </DialogClose>
          )}

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
