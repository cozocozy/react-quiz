import React from "react";

function NextButton({ dispatch, answers, index, numQuestions }) {
  if (answers === null) {
    return null;
  }
  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        NEXT
      </button>
    );
  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        FINISH
      </button>
    );
}

export default NextButton;
