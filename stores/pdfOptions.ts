// store/pdfOptions.ts
import { atom } from "nanostores";

export const $questions = atom<IQuestion[]>([{ text: "What is your name?" }]);

export const $isLandscape = atom<boolean>(false);

export const $numberOfUsers = atom<number>(0);

export const $ratingType = atom<IRatingType>("smilies");
