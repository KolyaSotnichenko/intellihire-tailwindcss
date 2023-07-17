"use client";

import QuestionCard from "@/shared/QuestionCard";
import SearchBar from "@/shared/SearchBar";
import { useEffect, useState } from "react";

export interface IQuestion {
  id: string;
  title: string;
  question: string;
  video: string;
}

const QuestionsPage = () => {
  const [questions, setQuestions] = useState<IQuestion[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredQuestions, setFilteredQuestions] = useState<IQuestion[] | []>(
    []
  );

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

  useEffect(() => {
    if (searchQuery) {
      const filtered = questions.filter((question) =>
        question.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions(questions);
    }
  }, [searchQuery, questions]);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg ">
          <h1 className="text-[24px] font-bold mb-8">Questions bank</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col gap-y-[5px]">
              <SearchBar
                onChangeSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
                placeholder="Enter question title..."
              />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((question) => (
                <QuestionCard
                  key={question.id}
                  id={question.id}
                  title={question.title}
                  question={question.question}
                  video={question.video}
                />
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
      </div>
    </>
  );
};

export default QuestionsPage;
