// store/pdfOptions.ts
import { atom } from "nanostores";

export const $questions = atom<IQuestion[]>([
  { text: "Example Base Question", description: "Base Example Description" },
]);
export const $introductionQuestions = atom<IQuestion[]>([
  {
    text: "Example Introduction Question",
    description: "Introduction Example Description",
  },
]);

export const $isLandscape = atom<boolean>(false);

export const $numberOfUsers = atom<number>(1);

export const $ratingType = atom<IRatingType>("smilies");

export const $showIntroduction = atom<boolean>(true);

export const $randomizeQuestions = atom<boolean>(true);

export const $randomizeAlgorithm = atom<IRandomizeAlgorithm>("random");

export const $layout = atom<ILayout>("table");
