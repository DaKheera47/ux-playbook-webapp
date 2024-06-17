"use client";

import React, { useState } from "react";
import {
  $isLandscape,
  $numberOfUsers,
  $questions,
  $ratingType,
} from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

import QuestionPreview from "./QuestionPreview";

type Props = {};

export default function OptionsMenu({}: Props) {
  const [questionText, setQuestionText] = useState("");
  const [editQuestionIdx, setQuestionIdx] = useState<number | null>(null);
  const questions = useStore($questions);
  const isLandscape = useStore($isLandscape);
  const numberOfUsers = useStore($numberOfUsers);
  const ratingType = useStore($ratingType);

  const handleAddQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editQuestionIdx !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editQuestionIdx] = { text: questionText };
      $questions.set(updatedQuestions);
      setQuestionIdx(null);
    } else {
      $questions.set([...questions, { text: questionText }]);
    }
    setQuestionText("");
  };

  const handleEditQuestion = (index: number) => {
    setQuestionText(questions[index].text);
    setQuestionIdx(index);
  };

  return (
    <div className="flex w-2/5 flex-col justify-center space-y-8">
      <QuestionPreview handleEditQuestion={handleEditQuestion} />

      <div>
        <Label className="text-xl" htmlFor="question">
          {editQuestionIdx !== null ? "Edit Question" : "Add Questions"}
        </Label>

        <form onSubmit={handleAddQuestion} className="flex space-x-2">
          <Input
            type="text"
            id="question"
            required
            placeholder="Add your questions here"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />

          <Button type="submit">
            {editQuestionIdx !== null ? "Save" : "Add"}
          </Button>
        </form>
      </div>

      <div>
        <Label className="text-xl" htmlFor="users">
          Number of users
        </Label>

        <Input
          type="number"
          id="users"
          required
          placeholder="Number of users"
          value={numberOfUsers}
          onChange={(e) => $numberOfUsers.set(e.target.valueAsNumber)}
        />
      </div>

      <div>
        <Select
          value={ratingType}
          onValueChange={(value) => $ratingType.set(value as IRatingType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Rating Type" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="words">Words</SelectItem>
            <SelectItem value="smilies">Smiley-o-Meter</SelectItem>
            <SelectItem value="thumbs">Thumbs Ups</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div
        onClick={() => $isLandscape.set(!isLandscape)}
        className="flex w-full items-center justify-between hover:cursor-pointer"
      >
        <Label htmlFor="landscape">Landscape</Label>
        <Switch checked={isLandscape} id="landscape" />
      </div>
    </div>
  );
}
