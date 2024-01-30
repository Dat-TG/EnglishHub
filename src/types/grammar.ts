export interface IGrammarCheckResult {
  outputParagraph: string;
  mistakes: {
    description: string;
    shortDescription: string;
    wrongWord: string;
    replacement: string;
  }[];
}
