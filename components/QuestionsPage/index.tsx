"use client";

import QuestionCard from "@/shared/QuestionCard";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface IQuestion {
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
          <h1 className="text-[24px] font-bold mb-8">Questions bank</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                id={question.id}
                title={question.title}
                question={question.question}
                video={question.video}
                isComplete={question.isComplete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
