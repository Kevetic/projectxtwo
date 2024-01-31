import { useState } from "react";
import axios from "axios";

export const useGetQuestions = () => {
  const [questionsArray, setQuestionsArray] = useState([]);
  const [choices, setChoices] = useState([]);
  const [quizzTopic, setQuizzTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const getQuestions = async (message: string) => {
    try {
      let requestQuestion = `send me an intermediate question on ${message} following these patters: Multiple choice question, Only 4 options. give me another option as the answer`;
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
      let res = response.data.choices[0].message.content;
      let splitData = res.split("?");
      let cleanedData = splitData.map((data: any) => {
        return data.replace(/[\n\\]/g, "");
      });

      const choicesArray = cleanedData[1].split(/(?=[A-Z]\))/);
      const filteredChoicesArray = choicesArray.filter(
        (choice: any) => choice.trim() !== ""
      );

      setChoices(filteredChoicesArray);
      setQuestionsArray(cleanedData[0]);
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
    setCorrectAnswer,
    correctAnswer,
  };
};
