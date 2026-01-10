import React from "react";

function Options({ question, dispatch, answers }) {
  const newAnswer = answers != null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={option}
          className={`btn btn-option ${index === answers ? "answer" : ""} ${
            answers != null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={newAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
