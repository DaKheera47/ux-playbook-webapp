"use client";

import {
  $introductionQuestions,
  $isLandscape,
  $numberOfUsers,
  $questions,
  $ratingType,
  $showIntroduction,
} from "@/stores/pdfOptions";
import { useStore } from "@nanostores/react";

import { Button } from "@/components/ui/button";

type Props = {};

export default function GeneratePDFSet({}: Props) {
  const baseQuestions = useStore($questions);
  const introductionQuestions = useStore($introductionQuestions);

  const numUsers = useStore($numberOfUsers);
  const ratingType = useStore($ratingType);
  const showIntroduction = useStore($showIntroduction);
  const isLandscape = useStore($isLandscape);

  if (typeof document === "undefined") {
    return null;
  }

  let a: HTMLAnchorElement = document.getElementById(
    "download-anchor"
  ) as HTMLAnchorElement;

  if (!a) {
    a = document.createElement("a");
    a.style.display = "none";
    // set the id to download-anchor
    a.id = "download-anchor";
    document.body.appendChild(a);
  }

  const handleGeneratePDFSet = () => {
    fetch("/api/pdf-gen", {
      method: "POST",
      body: JSON.stringify({
        baseQuestions,
        introductionQuestions,
        numUsers,
        ratingType,
        showIntroduction,
        layout: isLandscape ? "landscape" : "portrait",
      }),
    }).then((res) => {
      if (res.ok) {
        res.blob().then((blob) => {
          console.log("Received PDF blob", blob);
          const url = URL.createObjectURL(blob);
          console.log("URL", url);

          a.href = url;
          console.log(a);
          a.download = "pdf-set.pdf";

          // click to download
          a.click();

          //   // free up memory
          //   URL.revokeObjectURL(url);

          // remove from DOM
          //   document.body.removeChild(a);
        });
      }
    });
  };

  return (
    <div>
      <Button onClick={handleGeneratePDFSet} className="w-full">
        Generate PDF Set
      </Button>
    </div>
  );
}
