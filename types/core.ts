interface IBaseQuestion {
  text: string;
  description?: string;
  ratingType: IRatingType;
  randomize: boolean;
}

interface IIntroductionQuestion {
  text: string;
}

type IRatingType = "smilies" | "thumbs" | "words";

type IRandomizeAlgorithm = "linear-down" | "random";

type ILayout = "table" | "question-then-smiley";
