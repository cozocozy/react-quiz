import Options from "./Options";

function Question({ question, dispatch, answers }) {
  return (
    <div className="question">
      <h2>{question.question}</h2>
      <Options question={question} dispatch={dispatch} answers={answers} />
    </div>
  );
}

export default Question;
