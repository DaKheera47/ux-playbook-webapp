import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TextQuestion({
  heading,
  questions,
  smileyImage,
}: {
  heading: string;
  questions: IQuestion[];
  smileyImage: string;
}) {
  // max height of a page can only be 297mm
  const numQuestions = questions.length;

  // calculate the height of each question
  const questionHeight = 297 / numQuestions;

  return (
    <Card className="w-[210mm] overflow-x-hidden">
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
      </CardHeader>

      <CardContent>
        {questions.map((question, idx) => {
          return (
            <div
              key={idx}
              className="!max-h-[150px] rounded-md border border-red-500"
              style={{
                height: `${questionHeight}mm`,
                pageBreakInside: "avoid",
              }}
            >
              <p className="text-muted-foreground">{question.text}</p>

              <img
                src={smileyImage}
                alt="Smiley o meter"
                className="h-3/5 rounded-lg object-contain"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
