// store/pdfOptions.ts
import { atom } from "nanostores";

export const $baseQuestions = atom<IBaseQuestion[]>([
  {
    text: "Example Base Question",
    description: "Base Example Description",
    ratingType: "smilies",
    randomize: false,
  },
]);

export const $introductionQuestions = atom<IIntroductionQuestion[]>([
  {
    text: "Example Introduction Question",
  },
]);

export const $isLandscape = atom<boolean>(false);

export const $numberOfUsers = atom<number>(1);

export const $showIntroduction = atom<boolean>(true);

export const $randomizeQuestions = atom<boolean>(true);

export const $randomizeAlgorithm = atom<IRandomizeAlgorithm>("random");

export const $layout = atom<ILayout>("table");
