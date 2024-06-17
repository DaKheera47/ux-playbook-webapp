"use client";

import { useState } from "react";
import smileyImage from "@/public/smiley-o-meter.jpg";
import { TextQuestion } from "@/templates/TextQuestion";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type Props = {};

export default function SmileyPage({}: Props) {
  const [inputText, setInputText] = useState("");
  const [num, setNum] = useState(3);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [questions, setQuestions] = useState<IQuestion[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleGeneratePDF = () => {
    setPdfUrl(null);

    fetch("/api/pdf-gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText, num, questions }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        if (pdfUrl) {
          URL.revokeObjectURL(pdfUrl);
        }
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });
  };

  const handleAddQuestion = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editIndex] = { text: inputText };
      setQuestions(updatedQuestions);
      setEditIndex(null);
    } else {
      setQuestions((prev) => [...prev, { text: inputText }]);
    }
    setInputText("");
  };

  const handleEditQuestion = (index: number) => {
    setInputText(questions[index].text);
    setEditIndex(index);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-full space-x-8">
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

        <div className="space-y-4">
          <h1>Smiley-o-meters: {num}</h1>
          <Slider
            min={1}
            max={5}
            step={1}
            value={[num]}
            onValueChange={(e) => setNum(Number(e[0]))}
          />
        </div>

        <div className="flex w-full justify-between">
          <Button onClick={handleGeneratePDF}>Generate PDF</Button>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download="generated.pdf"
              className={buttonVariants()}
            >
              Download PDF
            </a>
          )}
        </div>
      </div>

      <div className="max-h-[297mm] space-y-4 overflow-hidden">
        <h1>RENDER PREVIEW</h1>

        <TextQuestion
          heading="List of questions"
          questions={questions}
          smileyImage={smileyImage.src}
        />
      </div>
    </div>
  );
}
