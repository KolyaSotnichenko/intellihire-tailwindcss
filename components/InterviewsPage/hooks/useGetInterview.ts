import { useState, useEffect } from "react";

interface IInterviewData {
    id: string;
    title: string;
    description: string;
    interviewQuestions: string[];
  }

export const useGetInterview = (params: any) => {

    const [interviewData, setInterviewData] = useState<IInterviewData>();

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

    return {interviewData}
}