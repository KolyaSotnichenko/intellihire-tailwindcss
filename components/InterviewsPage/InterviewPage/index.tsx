"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import InterviewTable from "./InterviewTable";
import { IQuestion } from "@/components/QuestionsPage";
import QuestionInInterviewCard, {
  IAnswersData,
} from "@/shared/QuestionInInterviewCard";
import { db } from "@/utils/firebase";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

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
  const [completedQuestions, setCompletedQuestions] = useState<string[]>();
  const [answers, setAnswers] = useState<IAnswersData[]>();
  const [generatedFeedback, setGeneratedFeedback] = useState<string>("");

  const params = useParams();

  const completedInterview = questionsDataIds.every((item) =>
    completedQuestions?.includes(item)
  );

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

  const handleGetFeedback = async () => {
    const questions: string[] = questionsData.map((item) => item.question);
    const transcripts: string[] = answers
      ? answers.map((item) => item.answer)
      : [];

    const prompt = `Please provide feedback on the following answers: ${transcripts} to interview questions: ${questions.map(
      (item) => `${item},`
    )}.`;

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedFeedback((prev: any) => prev + chunkValue);
    }
  };

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
        {completedInterview && generatedFeedback === "" && (
          <div className="p-4 w-full flex justify-center">
            <button
              onClick={handleGetFeedback}
              type="button"
              className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Get feedback
            </button>
          </div>
        )}
        {generatedFeedback !== "" && (
          <>
            <h2 className="m-4 text-xl font-semibold text-left text-[#1D2B3A]">
              Feedback
            </h2>
            <div className=" m-4 text-sm flex gap-2.5 rounded-lg border border-[#EEEEEE] bg-[#FAFAFA] p-4 leading-6 text-gray-900 min-h-[100px]">
              <p className="prose prose-sm max-w-none">{generatedFeedback}</p>
            </div>
          </>
        )}
      </div>
    </AnimatePresence>
  );
};

export default InterviewDetail;
