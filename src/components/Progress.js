import React from "react";
function Progress({ NumQuestions, index, points, maxPoints, answers }) {
  return (
    <header className="progress">
      <progress
        value={index + Number(answers != null)}
        max={NumQuestions}
      ></progress>
      <p>
        Question <strong>{index + 1}</strong>/ {NumQuestions}
      </p>
      <p>
        {points} / {maxPoints} points
      </p>
    </header>
  );
}

export default Progress;
