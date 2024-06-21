interface IQuestion {
  text: string;
  description?: string;
}

type IRatingType = "smilies" | "thumbs" | "words";

type IRandomizeAlgorithm = "linear-down" | "random";

type ILayout = "table" | "question-then-smiley";
