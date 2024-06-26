import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function displayRatingType(ratingType: IRatingType) {
  const map = {
    words: "Words",
    smilies: "Smiley-o-Meter",
    thumbs: "Thumbs Ups",
  };

  return map[ratingType] ?? "Unset";
}

export function isBaseQuestion(
  question: IBaseQuestion | IIntroductionQuestion
): question is IBaseQuestion {
  return (question as IBaseQuestion).ratingType !== undefined;
}
