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
  } = useGetQuestions();

  return (
    <main className="flex flex-col items-center space-y-10">
      <div className="absolute right-0 p-5">
        <ModeToggle />
      </div>
      {questionsArray.length == 0 ? (
        <div className="space-y-5 flex flex-col justify-center items-center">
          <h1>What would you liked to be quizzed on?</h1>
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
        <Questions questionsArray={questionsArray} choices={choices} />
      )}
    </main>
  );
}
