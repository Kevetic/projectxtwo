import { useState } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

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

  const handleSelection = (index: number) => {
    if (choices[index].includes("*")) {
      setCorrectChoice(true);
      setSelectedItemIndex(index);
    } else {
      setSelectedItemIndex(index);
    }
  };

  const handleNextQuestion = () => {
    setIsLoading(true);
    setSelectedItemIndex(null);
    setCorrectChoice(false);
    setIsLoading(true);
    getQuestions(quizzTopic);
  };

  return (
    <div className="space-y-24 h-3/5 flex flex-col justify-center items-center border w-11/12 md:w-3/5 rounded-2xl relative">
      <>
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {" "}
            <h1 className="text-center text-lg md:text-3xl w-4/5">
              {questionsArray}
            </h1>
            <ul className="space-y-5 md:gap-20 text-md lg:text-2xl text-center w-11/12 md:w-4f/5">
              {choices.map((choice, i) => (
                <li key={i}>
                  <Button
                    disabled={correctChoice}
                    className={`${
                      selectedItemIndex === i && !correctChoice
                        ? "bg-red-500 text-secondary"
                        : ""
                    } ${
                      correctChoice && selectedItemIndex === i
                        ? "bg-green-500"
                        : ""
                    } cursor-pointer border p-5 rounded-xl w-full`}
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
        <div className="absolute bottom-10 justify-center items-center text-center space-y-4">
          <span>BINGO</span>
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
    </div>
  );
}

export default Questions;
