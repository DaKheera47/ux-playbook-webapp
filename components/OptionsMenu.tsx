import React, { useState } from "react";
import { $isLandscape, $questions } from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { Input } from "./ui/input";
import { Switch } from "./ui/switch";

type Props = {};

export default function OptionsMenu({}: Props) {
  const [inputText, setInputText] = useState("");
  const questions = useStore($questions);
  const isLandscape = useStore($isLandscape);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = { text: inputText };
      $questions.set(updatedQuestions);
      setEditIndex(null);
    } else {
      $questions.set([...questions, { text: inputText }]);
    }
    setInputText("");
  };

  const handleEditQuestion = (index: number) => {
    setInputText(questions[index].text);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    $questions.set(updatedQuestions);
  };

  return (
    <div className="flex w-2/5 flex-col justify-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-xl">List of questions</h1>

        <div>
          {questions.map((question, index) => (
            <div
              key={index + question.text}
              className="my-2 flex w-full items-center justify-between space-x-4 border-b border-b-gray-300 p-2"
            >
              <p>{question.text}</p>

              <p>{question?.description}</p>

              <div className="flex space-x-2">
                <Button
                  variant="link"
                  onClick={() => handleEditQuestion(index)}
                >
                  Edit
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleDeleteQuestion(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h1>{editIndex !== null ? "Edit Question" : "Add Questions"}</h1>

        <form onSubmit={handleAddQuestion} className="flex space-x-2">
          <Input
            type="text"
            required
            placeholder="Add your questions here"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />

          <Button type="submit">{editIndex !== null ? "Save" : "Add"}</Button>
        </form>
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
