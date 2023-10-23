"use client";

import DataLoader from "@/shared/DataLoader";
import InterviewCard, { IInterviewCardProps } from "@/shared/InterviewCard";
import SearchBar from "@/shared/SearchBar";
import { initGA, logPageView } from "@/utils/ga";
import { useEffect, useState } from "react";
import { useGetInterviews } from "./hooks/useGetInterviews";

const InterviewsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { interviews, filteredInterviews } = useGetInterviews(searchQuery);

  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

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
                placeholder="Enter interview title..."
              />
            </div>
            <div className="flex flex-col gap-y-[5px]"></div>
            <div className="flex justify-end gap-y-[5px]">
              <p className="text-gray-500">Interviews: {interviews.length}</p>
            </div>
          </div>
          <div className="relative grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 overflow-auto h-[70vh] mb-4 rounded cursor-pointer ">
            {filteredInterviews.length > 0 ? (
              filteredInterviews.map((interview) => (
                <div key={interview.id} className="grid h-[10vh]">
                  <InterviewCard
                    id={interview.id}
                    title={interview.title}
                    description={interview.description}
                    createdAt={interview.createdAt}
                    interviewQuestions={interview.interviewQuestions}
                  />
                </div>
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

export default InterviewsPage;
