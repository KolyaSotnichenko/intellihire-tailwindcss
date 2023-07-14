"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import InterviewTable from "./InterviewTable";
import { IQuestion } from "@/components/QuestionsPage";

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
        <div className=" m-4 h-[40vh] overflow-y-scroll mb-4 rounded bg-gray-50 ">
          <InterviewTable data={questionsData} />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default InterviewDetail;
