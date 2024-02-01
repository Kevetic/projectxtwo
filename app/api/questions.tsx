import { useState } from "react";
import axios from "axios";

export const useGetQuestions = () => {
  const [questionsArray, setQuestionsArray] = useState<string[]>([]);
  const [choices, setChoices] = useState([]);
  const [quizzTopic, setQuizzTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const parseOpenAIResponse = (response: any) => {
    const lines = response.split("\n");
    const question = lines[0].replace("Question: ", "");

    const choices = lines
      .slice(2, 6)
      .map((line: any) => line.replace(/^\d\. /, ""));

    const answerMatch = lines[6]?.match(/Answer: (\d+)/);
    const answer = answerMatch ? parseInt(answerMatch[1]) : null;

    return {
      question,
      choices,
      answer,
    };
  };

  const getQuestions = async (message: string) => {
    try {
      const requestQuestion = `send me an intermediate question on ${message} following this template with the answer having an '*' after it:
      
      Question: [Your question goes here]

        1. [Option 1]
        2. [Option 2]
        3. [Option 3]
        4. [Option 4]`;

      const url = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_KEY}`,
      };
      const data = {
        model: "gpt-3.5-turbo-0301",
        messages: [{ role: "user", content: requestQuestion }],
      };

      setIsLoading(true);

      const response = await axios.post(url, data, { headers: headers });
      const res = response.data.choices[0].message.content;

      const parsedData = parseOpenAIResponse(res);

      setChoices(parsedData.choices);
      setQuestionsArray(parsedData.question);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    questionsArray,
    quizzTopic,
    isLoading,
    getQuestions,
    setQuizzTopic,
    choices,
    setIsLoading,
    setQuestionsArray,
  };
};
