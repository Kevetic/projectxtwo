"use client";
import { ModeToggle } from "@/components/modeToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetQuestions } from "./api/questions";
import Questions from "@/components/questions/Questions";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function Home() {
  const {
    quizzTopic,
    getQuestions,
    setQuizzTopic,
    questionsArray,
    choices,
    setIsLoading,
    isLoading,
    setQuestionsArray,
  } = useGetQuestions();

  return (
    <main className="flex flex-col items-center space-y-10 justify-around h-screen">
      <div className="absolute right-0 p-5 top-0">
        <ModeToggle />
      </div>
      {questionsArray.length == 0 ? (
        <div className="space-y-5 flex flex-col justify-center items-center border p-10 rounded-xl w-11/12 md:w-1/2 h-1/2">
          <h1 className="text-center">What would you like to test on?</h1>
          <Input
            className="text-center"
            onChange={(e) => setQuizzTopic(e.target.value)}
          />
          {isLoading ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              className="w-3/2 border rounded-lg p-2 bg-primary"
              onClick={() => {
                setIsLoading(true);
                getQuestions(quizzTopic);
              }}
            >
              SUBMIT
            </Button>
          )}
        </div>
      ) : (
        <Questions
          questionsArray={questionsArray}
          choices={choices}
          setQuestionsArray={setQuestionsArray}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          quizzTopic={quizzTopic}
          getQuestions={getQuestions}
        />
      )}
    </main>
  );
}
