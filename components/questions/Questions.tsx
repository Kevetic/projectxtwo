import { useState } from "react";

interface QuestionsProps {
  questionsArray: any[];
  choices: any[];
}

function Questions({ questionsArray, choices }: QuestionsProps) {
  const correctSelection = () => {
    alert("YOU GOT IT!");
  };
  const handleSelection = (e: any) => {
    if (e.includes("*")) {
      correctSelection();
    } else {
      alert("try agin");
    }
  };

  return (
    <div className="space-y-24 h-full flex flex-col justify-center items-center">
      <h1 className="text-center text-5xl">{questionsArray}?</h1>
      <ul className="grid grid-cols-2 gap-20 text-2xl text-center cursor-pointer">
        {choices.map((choice, i) => {
          return (
            <li onClick={() => handleSelection(choice)} key={i}>
              {choice.replace(/\*/g, "")}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Questions;
