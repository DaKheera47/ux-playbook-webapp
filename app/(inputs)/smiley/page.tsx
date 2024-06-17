"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import smileyImage from "@/public/smiley-o-meter.jpg";
import { TextQuestion } from "@/templates/TextQuestion";
import { PDFViewer } from "@react-pdf/renderer";

const OptionsMenu = dynamic(() => import("@/components/OptionsMenu"));

// https://nextjs.org/docs/app/building-your-application/optimizing/lazy-loading#skipping-ssr
const RenderPreview = dynamic(() => import("@/components/RenderPreview"), {
  ssr: false,
});

type Props = {};

export default function SmileyPage({}: Props) {
  return (
    <div className="flex w-full space-x-8">
      <OptionsMenu />
      <RenderPreview />
    </div>
  );
}
