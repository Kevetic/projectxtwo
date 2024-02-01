import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ReloadIcon, CrossCircledIcon } from "@radix-ui/react-icons";

interface QuestionsProps {
  questionsArray: any[];
  choices: any[];
  setQuestionsArray: React.Dispatch<React.SetStateAction<string[]>>;
  setIsLoading: any;
  quizzTopic: any;
  getQuestions: any;
  isLoading: any;
}

function Questions({
  questionsArray,
  choices,
  setQuestionsArray,
  setIsLoading,
  quizzTopic,
  getQuestions,
  isLoading,
}: QuestionsProps) {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );
  const [correctChoice, setCorrectChoice] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  console.log("selected index:", selectedItemIndex);
  const handleSelection = (index: number) => {
    if (choices[index].includes("*")) {
      setCorrectChoice(true);
      setSelectedItemIndex(index);
    } else {
      setIncorrect(true);
      setSelectedItemIndex(index);
      setTimeout(() => {
        setIncorrect(false);
      }, 1500);
    }
  };

  const handleNextQuestion = () => {
    setIsLoading(true);
    setCorrectChoice(false);
    setIsLoading(true);
    getQuestions(quizzTopic);
  };

  return (
    <div className="space-y-5 md:space-y-24 md:h-3/5 flex flex-col justify-center items-center md:border w-11/12 md:w-3/5 rounded-2xl relative">
      <>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {" "}
            <h1 className="text-center text-lg md:text-3xl w-4/5">
              {questionsArray}
            </h1>
            <ul className="md:space-y-5 md:gap-20 text-md lg:text-2xl text-center w-11/12 md:w-4/5">
              {choices.map((choice, i) => (
                <li key={i}>
                  <Button
                    disabled={correctChoice || incorrect}
                    className={` cursor-pointer border p-5 rounded-xl w-full hover:bg-muted-foreground`}
                    onClick={() => handleSelection(i)}
                  >
                    {choice.replace(/\*/g, "")}
                  </Button>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
      {correctChoice ? (
        <div className="justify-center items-center text-center space-y-5">
          <span className="text-green-500 text-3xl animate-pulse">BINGO</span>
          <div className="flex gap-5">
            <Button variant="destructive" onClick={() => setQuestionsArray([])}>
              New Subject
            </Button>
            <Button variant="destructive" onClick={() => handleNextQuestion()}>
              Next Question
            </Button>
          </div>
        </div>
      ) : null}
      {incorrect ? (
        <span className="absolute -bottom-20 md:bottom-10 animate-bounce text-red-500">
          Try Again
        </span>
      ) : null}
    </div>
  );
}

export default Questions;
