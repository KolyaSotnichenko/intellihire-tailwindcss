"use client";

import DataLoader from "@/shared/DataLoader";
import QuestionCard from "@/shared/QuestionCard";
import SearchBar from "@/shared/SearchBar";
import { db } from "@/utils/firebase";
import { initGA, logPageView } from "@/utils/ga";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
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
  const [isPro, setIsPro] = useState<string>("false");

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  useEffect(() => {
    const getRole = async () => {
      const user = getAuth().currentUser;

      try {
        if (user) {
          const role = doc(db, "users", user.uid);
          const docSnapshot = await getDoc(role);

          if (docSnapshot.exists()) {
            setIsPro(docSnapshot.data()?.isPro);
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

    getRole();
  }, []);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch(
          "https://64a1641a0079ce56e2db0688.mockapi.io/questions"
        );

        const data = await res.json();

        if (isPro === "false") {
          const filtered = data.filter(
            (question: { title: string }) => question.title === "Primary"
          );

          setQuestions(filtered.reverse());
        } else {
          setQuestions(data.reverse());
        }
      } catch (error) {
        throw new Error("Failed to fetch data");
      }
    };

    getQuestions();
  }, [isPro]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = questions.filter(
        (question) =>
          question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          question.question.toLowerCase().includes(searchQuery.toLowerCase())
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
            <div className="flex flex-col gap-y-[5px]"></div>
            <div className="flex justify-end gap-y-[5px]">
              <p className="text-gray-500">Questions: {questions.length}</p>
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
              <DataLoader />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionsPage;
