import Options from "./Options";

function Question({ question }) {
  return (
    <div className="question">
      <h2>{question.question}</h2>
      <Options question={question} />
    </div>
  );
}

export default Question;
