// store/pdfOptions.ts
import { atom } from "nanostores";

export const $questions = atom<IQuestion[]>([
  { text: "Example Base Question" },
]);
export const $introductionQuestions = atom<IQuestion[]>([
  { text: "Example Introduction Question" },
]);

export const $isLandscape = atom<boolean>(false);

export const $numberOfUsers = atom<number>(1);

export const $ratingType = atom<IRatingType>("smilies");

export const $showIntroduction = atom<boolean>(true);
