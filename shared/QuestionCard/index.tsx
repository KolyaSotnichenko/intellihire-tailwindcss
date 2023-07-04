"use client";

import { IQuestion } from "@/components/QuestionsPage";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const QuestionCard: FC<IQuestion> = ({
  id,
  title,
  question,
  video,
  isComplete,
}) => {
  const [completedQuestions, setCompletedQuestions] = useState<string[]>();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    const getCompletedCollectionByUserId = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const completedCollectionRef = doc(db, "users", user.uid); // Reference to the "Completed" collection within the user document
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
    if (completedQuestions && completedQuestions.includes(id)) {
      setIsCompleted(true);
    }
  }, [completedQuestions]);

  return (
    <Link
      href={`/dashboard/questions/${id}`}
      className="flex flex-col gap-y-[5px]  p-4  h-full rounded-[20px] border  border-gray-400"
    >
      <p className="text-[18px] font-bold text-gray-400 dark:text-black capitalize">
        {title}
      </p>
      <p className="text-[18px] font-bold text-gray-400 dark:text-gray-400">
        {question}
      </p>
      {isCompleted && (
        <div className="flex justify-end w-full items-end">
          <p className=" text-green-500">Completed</p>
        </div>
      )}
    </Link>
  );
};

export default QuestionCard;
