import { $questions } from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  handleEditQuestion: (index: number) => void;
};

export default function QuestionPreview({ handleEditQuestion }: Props) {
  const questions = useStore($questions);

  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    $questions.set(updatedQuestions);
  };

  return (
    <div className="space-y-4">
      <Label className="text-xl">List of questions</Label>

      <div>
        {questions.map((question, index) => (
          <div
            key={index + question.text}
            className="my-2 flex w-full items-center justify-between space-x-4 border-b border-b-gray-300 p-2"
          >
            <p>{question.text}</p>
            <p>{question?.description}</p>

            <div className="flex space-x-2">
              <Button variant="link" onClick={() => handleEditQuestion(index)}>
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
  );
}
