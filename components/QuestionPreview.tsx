import { Label } from "@/components/ui/label";
import { $introductionQuestions, $questions } from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";
import QuestionEditor from "./QuestionEditor";

type Props = {
  type: "introduction" | "base";
};

export default function QuestionPreview({ type }: Props) {
  const questions = useStore($questions);
  const introductionQuestions = useStore($introductionQuestions);

  let questionsToDisplay = type === "base" ? questions : introductionQuestions;
  let sampleQuestion: IBaseQuestion | IIntroductionQuestion;

  sampleQuestion =
    type === "base"
      ? {
          text: "Add a new base question",
          description: "Example Description",
          ratingType: "smilies",
        }
      : {
          text: "Add a new introduction question",
        };

  return (
    <div className="space-y-2">
      <div className="space-y-2">
        {questionsToDisplay.map((question, index) => (
          <QuestionEditor
            key={index}
            questionType={type}
            type="edit"
            question={question}
          />
        ))}

        {questionsToDisplay.length === 0 && (
          <Label>No questions added yet</Label>
        )}

        <QuestionEditor
          questionType={type}
          type="add"
          question={sampleQuestion}
        />
      </div>
    </div>
  );
}
