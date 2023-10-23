import { IInterviewCardProps } from "@/shared/InterviewCard";
import { useEffect, useState } from "react";

export const useGetInterviews = (searchQuery: string) => {

    const [interviews, setInterviews]= useState<IInterviewCardProps[] | []>([])
    const [filteredInterviews, setFilteredInterviews] = useState<
    IInterviewCardProps[] | []
  >([]);

    useEffect(() => {
        const getInterviews = async () => {
          try {
            const res = await fetch(
              "https://64a1641a0079ce56e2db0688.mockapi.io/interviews"
            );
    
            const data = await res.json();
    
            setInterviews(data.reverse());
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

    return {interviews, filteredInterviews}
}