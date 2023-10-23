"use client";

import GoogleAnalytics from "@/shared/GoogleAnalytics";
import { initGA, logPageView } from "@/utils/ga";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useGetCompletedCollection } from "./hooks/useGetCompletedCollection";

const DashBoardPage = () => {
  const { countCompletedQuestions, totalSeconds } = useGetCompletedCollection();

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <>
      <GoogleAnalytics />
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg">
          <h1 className="text-[24px] font-bold mb-8 capitalize">Home</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400"
            >
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Completed questions
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                {countCompletedQuestions}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400"
            >
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Total interview time
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                {`${String(Math.floor(totalSeconds / 60)).padStart(
                  2,
                  "0"
                )}:${String(totalSeconds % 60).padStart(2, "0")}`}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400"
            >
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Current streak✨
              </p>
              <div className="flex justify-between items-center">
                <p className="text-2xl font-bold text-gray-400 dark:text-black">
                  In development
                </p>
              </div>
            </motion.div>
          </div>
          <div className="hidden md:flex w-full items-center justify-center h-[70vh] mb-4 rounded  cursor-pointer ">
            <motion.section
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="rounded-[20px] bg-gray-900"
            >
              <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                  <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Introducing IntelliHire with Chat GPT
                  </h2>
                  <p className="mb-4">
                    The IntelliHire is a revolutionary tool that provides users
                    with the ability to simulate job interviews and receive
                    valuable feedback from Chat GPT, our advanced language
                    model. Whether you are a job seeker looking to enhance your
                    interview skills or a hiring manager seeking to train your
                    team, our Interview Simulator is designed to meet your
                    needs.
                  </p>
                  <p className="mb-4">
                    With the IntelliHire, you can engage in realistic interview
                    scenarios tailored to various industries and job roles. The
                    Chat GPT algorithm mimics human conversation, allowing you
                    to interact with a virtual interviewer who asks relevant
                    questions and evaluates your responses in real-time.
                  </p>
                  <p className="mb-4">
                    After each simulated interview, Chat GPT provides
                    comprehensive feedback and suggestions to help you improve
                    your performance. Whether it's highlighting areas where you
                    excelled or offering suggestions for areas of improvement,
                    our Interview Simulator aims to enhance your interview
                    skills and increase your chances of success.
                  </p>
                  <p>
                    Experience the power of our interview simulator with Chat
                    GPT today. Let us assist you in honing your interview
                    skills, gaining confidence, and achieving your professional
                    goals.
                  </p>
                </div>
              </div>
            </motion.section>
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
