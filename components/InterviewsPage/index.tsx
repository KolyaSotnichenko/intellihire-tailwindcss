"use client";

import InterviewCard, { IInterviewCardProps } from "@/shared/InterviewCard";
import SearchBar from "@/shared/SearchBar";
import { useEffect, useState } from "react";

const InterviewsPage = () => {
  const [interviews, setInterviews] = useState<IInterviewCardProps[] | []>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredInterviews, setFilteredInterviews] = useState<
    IInterviewCardProps[] | []
  >([]);

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await fetch(
          "https://64a1641a0079ce56e2db0688.mockapi.io/interviews"
        );
        setInterviews(await res.json());
      } catch (error) {
        console.error(
          'Error retrieving "Completed" collection for user:',
          error
        );
      }
    };

    getInterviews();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = interviews.filter((interview) =>
        interview.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredInterviews(filtered);
    } else {
      setFilteredInterviews(interviews);
    }
  }, [searchQuery, interviews]);

  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg ">
          <h1 className="text-[24px] font-bold mb-8 capitalize">
            All interviews
          </h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col gap-y-[5px]">
              <SearchBar
                onChangeSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
              />
            </div>
          </div>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 overflow-auto h-[80vh] mb-4 rounded cursor-pointer ">
            {filteredInterviews.length > 0 ? (
              filteredInterviews.map((interview) => (
                <div key={interview.id} className="grid h-[10vh]">
                  <InterviewCard
                    id={interview.id}
                    title={interview.title}
                    description={interview.description}
                    createdAt={interview.createdAt}
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
      </div>
    </>
  );
};

export default InterviewsPage;
