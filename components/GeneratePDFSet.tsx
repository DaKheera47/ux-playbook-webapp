"use client";

import {
  $introductionQuestions,
  $isLandscape,
  $layout,
  $numberOfUsers,
  $questions,
  $randomizeAlgorithm,
  $randomizeQuestions,
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
  const randomizeQuestions = useStore($randomizeQuestions);
  const randomizeAlgorithm = useStore($randomizeAlgorithm);
  const layout = useStore($layout);

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
        randomizeQuestions,
        randomizeAlgorithm,
        isLandscape,
        layout,
      }),
    }).then((res) => {
      if (res.ok) {
        res.blob().then((blob) => {
          const url = URL.createObjectURL(blob);

          a.href = url;
          console.log(a);
          a.download = "pdf-set.zip";

          // click to download
          a.click();
        });
      }
    });
  };

  return (
    <div>
      <Button onClick={handleGeneratePDFSet} className="w-full">
        Generate PDF Set for {numUsers} {numUsers > 1 ? "users" : "user"}
      </Button>
    </div>
  );
}
