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
  return (
    <Card className="w-[210mm]">
      <CardHeader>
        <CardTitle>{heading}</CardTitle>
      </CardHeader>

      <CardContent>
        {questions.map((question, idx) => {
          return (
            <div key={idx}>
              <p className="text-muted-foreground">{question.text}</p>

              <img
                src={smileyImage}
                alt="Smiley o meter"
                className="my-4 w-full rounded-lg object-contain"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
