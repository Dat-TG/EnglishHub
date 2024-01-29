import React from 'react';
import { diffChars } from 'diff';

interface TextDiffProps {
  text1: string;
  text2: string;
}

const TextDiff: React.FC<TextDiffProps> = ({ text1, text2 }) => {
  const differences = diffChars(text1, text2);

  const renderDifference = (part: { value: string; added?: boolean; removed?: boolean }, index: number) => {
    const style: React.CSSProperties = {
      color: part.added ? 'red' : part.removed ? 'red' : 'black',
    };

    return (
      <span key={index} style={style}>
        {part.value}
      </span>
    );
  };

  return <div>{differences.map(renderDifference)}</div>;
};

export default TextDiff;
