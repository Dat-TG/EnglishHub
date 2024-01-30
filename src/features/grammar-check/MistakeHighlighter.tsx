import React from "react";
import { Typography, Tooltip } from "@mui/material";

interface Mistake {
  description: string;
  shortDescription: string;
  wrongWord: string;
  replacement: string;
}

interface GrammarCheckResult {
  outputParagraph: string;
  mistakes: Mistake[];
}

const MistakeHighlighter: React.FC<GrammarCheckResult> = ({
  outputParagraph,
  mistakes,
}) => {
  const renderHighlightedParagraph = (): JSX.Element[] => {
    let currentIndex = 0;
    const highlightedText: JSX.Element[] = [];

    mistakes.forEach((mistake, index) => {
      const mistakeIndex = outputParagraph.indexOf(
        mistake.replacement,
        currentIndex
      );

      if (mistakeIndex !== -1) {
        // Add text before the mistake
        highlightedText.push(
          <span key={`before-${index}`}>
            {outputParagraph.substring(currentIndex, mistakeIndex)}
          </span>
        );

        // Add the replaced mistake text with tooltip
        highlightedText.push(
          <Tooltip
            key={`mistake-${index}`}
            title={
              <div style={{ whiteSpace: "pre-line" }}>
                {`Short description: ${mistake.shortDescription}\nDescription: ${mistake.description}`}
              </div>
            }
          >
            <span
              style={{ color: "green", cursor: "pointer", fontWeight: "bold" }}
            >
              {outputParagraph.substring(
                mistakeIndex,
                mistakeIndex + mistake.replacement.length
              )}
            </span>
          </Tooltip>
        );

        currentIndex = mistakeIndex + mistake.replacement.length;
      }
    });

    // Add remaining text after the last mistake
    highlightedText.push(
      <span key="remaining">{outputParagraph.substring(currentIndex)}</span>
    );

    return highlightedText;
  };

  return (
    <Typography variant="body1">{renderHighlightedParagraph()}</Typography>
  );
};

export default MistakeHighlighter;
