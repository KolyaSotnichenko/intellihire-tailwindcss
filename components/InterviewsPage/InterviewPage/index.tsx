"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import InterviewTable from "./InterviewTable";
import { IQuestion } from "@/components/QuestionsPage";
import QuestionInInterviewCard from "@/shared/QuestionInInterviewCard";

interface IInterviewData {
  id: string;
  title: string;
  description: string;
  interviewQuestions: string[];
}

const InterviewDetail = () => {
  const [interviewData, setInterviewData] = useState<IInterviewData>();
  const [questionsDataIds, setQuestionsDataIds] = useState<string[]>([]);
  const [questionsData, setQuestionsData] = useState<IQuestion[] | []>([]);

  const params = useParams();

  useEffect(() => {
    const getInterview = async () => {
      try {
        const res = await fetch(
          `https://64a1641a0079ce56e2db0688.mockapi.io/interviews/${
            params && params.id
          }`
        );
        setInterviewData(await res.json());
      } catch (error) {}
    };

    getInterview();
  }, []);

  useEffect(() => {
    if (interviewData) setQuestionsDataIds(interviewData.interviewQuestions);
  }, [interviewData]);

  useEffect(() => {
    const getQuestions = async () => {
      const newData = [];
      try {
        for (const id of questionsDataIds) {
          const res = await fetch(
            `https://64a1641a0079ce56e2db0688.mockapi.io/questions/${id}`
          );

          const json = await res.json();
          newData.push(json);
        }

        setQuestionsData(newData);
      } catch (error) {}
    };

    getQuestions();
  }, [questionsDataIds]);

  console.log(questionsData);
  return (
    <AnimatePresence>
      <div className="p-4 sm:ml-64">
        <div className="p-4">
          <h1 className="text-[24px] text-gray-900 font-bold">
            {interviewData?.title}
          </h1>
        </div>
        <div className="p-4">
          <h1 className="text-[18px] text-gray-500 mb-8">
            {interviewData?.description}
          </h1>
        </div>
        <div className=" grid gap-4 m-4 h-[60vh] overflow-y-scroll mb-4 ">
          {questionsData ? (
            questionsData.map((item) => (
              <div key={item.id} className="grid w-full gap-x-4 gap-y-2">
                <QuestionInInterviewCard
                  id={item.id}
                  title={item.title}
                  question={item.question}
                  video={item.video}
                />
              </div>
            ))
          ) : (
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-300 w-48 mb-4"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-300 max-w-[360px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default InterviewDetail;
