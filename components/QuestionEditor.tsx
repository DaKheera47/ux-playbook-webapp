import { useState } from "react";
import { $introductionQuestions, $baseQuestions } from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { cn, displayRatingType, isBaseQuestion } from "@/lib/utils";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  question: IBaseQuestion | IIntroductionQuestion;
  type?: "add" | "edit";
  questionType?: "introduction" | "base";
};

export default function QuestionEditor({
  question,
  type,
  questionType,
}: Props) {
  const baseQuestions = useStore($baseQuestions);
  const introductionQuestions = useStore($introductionQuestions);

  const $questionsList =
    questionType === "base" ? $baseQuestions : $introductionQuestions;
  const questions =
    questionType === "base" ? baseQuestions : introductionQuestions;

  const sampleQuestion = isBaseQuestion(question)
    ? {
        text: question.text,
        description: question.description,
        ratingType: question.ratingType,
      }
    : {
        text: question.text,
      };

  const [editingQuestion, setEditingQuestion] = useState<
    IBaseQuestion | IIntroductionQuestion
  >(sampleQuestion);

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    $questionsList.set(updatedQuestions);
  };

  const handleEditQuestion = (
    question: IBaseQuestion | IIntroductionQuestion,
    index: number
  ) => {
    if (index === -1) {
      // append new question
      $questionsList.set([...questions, question]);
      return;
    }

    const updatedQuestions = [...questions];
    updatedQuestions[index] = question;
    $questionsList.set(updatedQuestions);
  };

  const isBaseQuestionMatch = (
    q: IBaseQuestion | IIntroductionQuestion,
    question: IBaseQuestion
  ) => {
    if (!isBaseQuestion(q)) {
      return false;
    }

    // compare all things if base question to ensure uniqueness as much as possible
    return (
      q.text === question.text &&
      q.ratingType === question.ratingType &&
      q.description === question.description
    );
  };

  const index = questions.findIndex((q) => {
    if (!isBaseQuestion(question)) {
      // compare only text if intro question
      return q.text === question.text;
    }

    return isBaseQuestionMatch(q, question);
  });

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full justify-start bg-white">
        <Button
          variant={type === "add" ? "link" : "outline"}
          className="h-full w-full flex-col items-start gap-y-1 text-left"
        >
          {question.text}

          {type !== "add" && isBaseQuestion(question) && (
            <>
              <span className="text-xs text-gray-500">
                {question?.description}
              </span>

              <span className="text-xs text-gray-500">
                {displayRatingType(question?.ratingType)}
              </span>
            </>
          )}
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
                  description: isBaseQuestion(editingQuestion)
                    ? editingQuestion?.description
                    : undefined,
                  ratingType: isBaseQuestion(editingQuestion)
                    ? editingQuestion?.ratingType
                    : undefined,
                })
              }
            />
          </div>

          {isBaseQuestion(editingQuestion) && (
            <>
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
                      ratingType: editingQuestion?.ratingType,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="rating-type" className="text-right">
                  Rating Type
                </Label>
                <Select
                  value={editingQuestion?.ratingType}
                  onValueChange={(value) =>
                    setEditingQuestion({
                      text: editingQuestion?.text ?? "",
                      description: editingQuestion?.description,
                      ratingType: value as IRatingType,
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Rating Type" />
                  </SelectTrigger>
                  <SelectContent id="rating-type">
                    <SelectItem value="words">Words</SelectItem>
                    <SelectItem value="smilies">Smiley-o-Meter</SelectItem>
                    <SelectItem value="thumbs">Thumbs Ups</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
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
