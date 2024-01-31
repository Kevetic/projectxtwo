import { useState } from "react";

interface QuestionsProps {
  questionsArray: any[];
  choices: any[];
  setCorrectAnswer: any;
  correctAnswer: any;
}

function Questions({
  questionsArray,
  choices,
  correctAnswer,
  setCorrectAnswer,
}: QuestionsProps) {
  console.log(choices);
  console.log(correctAnswer);
  return (
    <div className="space-y-24 h-full flex flex-col justify-center items-center">
      <h1 className="text-center text-5xl">{questionsArray}?</h1>
      <ul className="grid grid-cols-2 gap-20 text-2xl text-center cursor-pointer">
        {choices.map((choice, i) => {
          if (choice.includes("*")) {
            setCorrectAnswer(choice);
          }
          return <li key={i}>{choice}</li>;
        })}
      </ul>
    </div>
  );
}

export default Questions;
