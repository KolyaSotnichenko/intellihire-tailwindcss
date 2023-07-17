"use client";

import { IQuestion } from "@/components/QuestionsPage";
import { motion } from "framer-motion";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const QuestionCard: FC<IQuestion> = ({ id, title, question, video }) => {
  const [completedQuestions, setCompletedQuestions] = useState<string[]>();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

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
    if (completedQuestions && completedQuestions.includes(id)) {
      setIsCompleted(true);
    }
  }, [completedQuestions]);

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Link
        href={`/dashboard/questions/${id}`}
        className="flex flex-col gap-y-[5px]  p-4  h-full rounded-[20px] border  border-gray-400 relative"
      >
        <p className="text-[18px] font-bold text-gray-400 dark:text-black capitalize">
          {title}
        </p>
        <p className="text-[18px] font-bold text-gray-400 dark:text-gray-400">
          {question}
        </p>
        {isCompleted && (
          <div className="absolute top-3 right-3 text-green-500">
            <p className=" text-green-500">Completed</p>
          </div>
        )}
      </Link>
    </motion.div>
  );
};

export default QuestionCard;
