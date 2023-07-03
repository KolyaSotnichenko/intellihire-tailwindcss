"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface IQuestion {
  id: string;
  title: string;
  question: string;
  video: string;
  isComplete: boolean;
}

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<IQuestion[] | []>([]);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch(
          "https://64a1641a0079ce56e2db0688.mockapi.io/questions"
        );
        return setQuestions(await res.json());
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    };

    getQuestions();
  }, []);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg ">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {questions.map((question) => (
              <Link
                href={`/dashboard/questions/${question.id}`}
                className="flex flex-col gap-y-[5px]  p-4  h-full rounded-[20px] border  border-gray-400"
              >
                <p className="text-[18px] font-bold text-gray-400 dark:text-black capitalize">
                  {question.title}
                </p>
                <p className="text-[18px] font-bold text-gray-400 dark:text-gray-400">
                  {question.question}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
