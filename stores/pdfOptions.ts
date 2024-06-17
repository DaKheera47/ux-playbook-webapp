// store/users.ts
import { atom } from "nanostores";

export const $questions = atom<IQuestion[]>([]);

export const $isLandscape = atom<boolean>(false);
