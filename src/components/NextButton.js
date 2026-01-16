import React from "react";

function NextButton({ dispatch, answers }) {
  if (answers === null) {
    return null;
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      NEXT
    </button>
  );
}

export default NextButton;
