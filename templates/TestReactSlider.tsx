import fs from "fs";
import path from "path";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TestReactSlider({
  text,
  numberOfMeters,
}: {
  text: string;
  numberOfMeters: number;
}) {
  const imagePath = path.resolve(process.cwd(), "public/smiley-o-meter.jpg");
  const imageData = fs.readFileSync(imagePath);
  const base64Image = `data:image/jpeg;base64,${imageData.toString("base64")}`;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{text}</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">
          Showing {numberOfMeters} smiley-o-meters
        </p>

        {Array.from({ length: numberOfMeters }).map((_, index) => (
          <img
            key={index}
            src={base64Image}
            alt="Smiley o meter"
            className="my-4 rounded-lg"
          />
        ))}
      </CardContent>
    </Card>
  );
}
