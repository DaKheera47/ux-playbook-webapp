import { $questions } from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { Label } from "@/components/ui/label";

import QuestionEditor from "./QuestionEditor";

type Props = {};

export default function QuestionPreview({}: Props) {
  const questions = useStore($questions);

  return (
    <div className="space-y-2">
      <span className="text-xl font-medium capitalize">List of questions</span>

      <div className="space-y-2">
        {questions.map((question, index) => (
          <QuestionEditor key={index} type="edit" question={question} />
        ))}

        {questions.length === 0 && <Label>No questions added yet</Label>}

        <QuestionEditor type="add" question={{ text: "Add a New Question" }} />
      </div>
    </div>
  );
}
