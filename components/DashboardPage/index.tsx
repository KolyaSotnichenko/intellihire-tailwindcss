"use client";

import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const DashBoardPage = () => {
  const [countCompletedQuestions, setCountCompletedQuestions] = useState<any>();
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const getCompletedCollectionByUserId = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const completedCollectionRef = doc(db, "users", user.uid); // Reference to the "Completed" collection within the user document
          const docSnapshot = await getDoc(completedCollectionRef);

          if (docSnapshot.exists()) {
            console.log(docSnapshot.data());
            setCountCompletedQuestions(docSnapshot.data().Completed.length);
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
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg">
          <h1 className="text-[24px] font-bold mb-8 capitalize">Home</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400">
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Completed questions
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                {countCompletedQuestions ? countCompletedQuestions : 0}
              </p>
            </div>
            <div className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400">
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Total interview time
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                00:00
              </p>
            </div>
            <div className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400">
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Current streak✨
              </p>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-gray-400 dark:text-black">
                  0 days
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center h-[50vh] mb-4 rounded bg-gray-50 cursor-pointer ">
            <p className="text-2xl text-gray-400 dark:text-gray-500">
              💎Get Pro version
            </p>
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.75 6.75L19.25 12L13.75 17.25"
                stroke="#1E2B3A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 12H4.75"
                stroke="#1E2B3A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {/*<div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DashBoardPage;
