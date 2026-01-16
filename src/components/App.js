import React, { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";
const initialState = {
  questions: [],

  //loading | success | error | active | finished
  status: "loading",
  index: 0,
  answers: null,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived": {
      return { ...state, questions: action.payload, status: "ready" };
    }
    case "dataFailed": {
      return { ...state, status: "error" };
    }
    case "start": {
      return { ...state, status: "active" };
    }
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answers: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answers: null,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    }
    default: {
      throw new Error("Unsupported action type: " + action.type);
    }
  }
}

export default function App() {
  const [{ questions, status, index, answers, points, highScore }, dispatch] =
    useReducer(reducer, initialState);
  const totalQuestions = questions.length;
  const maxPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={totalQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              NumQuestions={totalQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
              answers={answers}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answers={answers}
            />
            <NextButton
              dispatch={dispatch}
              answers={answers}
              index={index}
              numQuestions={totalQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPoints={maxPoints}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}
