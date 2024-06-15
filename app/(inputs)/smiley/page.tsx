"use client";

import { useState } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type Props = {};

export default function SmileyPage({}: Props) {
  const [inputText, setInputText] = useState("");
  const [num, setNum] = useState(3);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleGeneratePDF = () => {
    fetch("/api/pdf-gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: inputText, num }),
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Revoke the previous object URL if it exists
        if (pdfUrl) {
          URL.revokeObjectURL(pdfUrl);
        }
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      });
  };

  return (
    <div className="flex w-96 flex-col justify-center space-y-8">
      <div className="space-y-4">
        <h1>Text to render</h1>
        <Input
          type="text"
          placeholder="Enter text to render in PDF"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
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
  );
}
