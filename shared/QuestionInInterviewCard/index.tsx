"use client";

import { IQuestion } from "@/components/QuestionsPage";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

export interface IAnswersData {
  questionId: string;
  answer: string;
  feedback: string;
}

const QuestionInInterviewCard: FC<IQuestion> = ({
  id,
  title,
  question,
  video,
}) => {
  const [completedQuestions, setCompletedQuestions] = useState<string[]>();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<IAnswersData[]>();
  const [answer, setAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    const getCompletedCollectionByUserId = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const completedCollectionRef = doc(db, "users", user.uid);
          const docSnapshot = await getDoc(completedCollectionRef);

          if (docSnapshot.exists()) {
            setCompletedQuestions(docSnapshot.data().Completed);
          } else {
            console.log("User not found");
          }
        } else {
          console.log("No authenticated user");
        }
      } catch (error) {
        console.error(
          'Error retrieving "Completed" collection for user:',
          error
        );
      }
    };

    getCompletedCollectionByUserId();
  }, []);

  useEffect(() => {
    const getAnswers = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const answersCollectionRef = doc(db, "users", user.uid);
          const docSnapshot = await getDoc(answersCollectionRef);

          if (docSnapshot.exists()) {
            setAnswers(docSnapshot.data().Answers);
          } else {
            console.log("User not found");
          }
        } else {
          console.log("No authenticated user");
        }
      } catch (error) {}
    };

    getAnswers();
  }, []);

  useEffect(() => {
    if (completedQuestions && completedQuestions.includes(id)) {
      setIsCompleted(true);
    }
  }, [completedQuestions]);

  useEffect(() => {
    if (answers) {
      const foundAnswer = answers.find((item) => item.questionId === id);
      setAnswer(foundAnswer ? foundAnswer.answer : "No answer yet");
      setFeedback(foundAnswer ? foundAnswer.feedback : "No feedback yet");
    }
  }, answers);

  return (
    <Link
      href={`/dashboard/questions/${id}`}
      className={`flex flex-row justify-between  p-4 w-full  h-full rounded-[20px] border ${
        isCompleted ? "border-green-400" : "border-gray-400"
      } relative`}
    >
      <div className="flex flex-col gap-y-[5px]">
        <p className="text-[18px] font-bold text-gray-400 dark:text-black capitalize">
          {title}
        </p>
        <p className="text-[14px] font-bold text-gray-400 dark:text-gray-400">
          {question}
        </p>
        <p className="text-[18px] font-bold text-gray-400 dark:text-black capitalize">
          Answer:
        </p>
        <p className="text-[14px] font-bold text-gray-400 dark:text-gray-400">
          {answer}
        </p>
      </div>
      <div className="flex flex-col gap-y-[5px] w-[50%]">
        <p className="text-[18px] font-bold text-gray-400 dark:text-black capitalize">
          Feedback:
        </p>
        <p className="text-[14px] font-bold text-gray-400 dark:text-gray-400">
          {feedback}
        </p>
      </div>
      {isCompleted && (
        <div className="absolute top-3 right-3 text-green-500">
          <p className=" text-green-500">Completed</p>
        </div>
      )}
    </Link>
  );
};

export default QuestionInInterviewCard;
