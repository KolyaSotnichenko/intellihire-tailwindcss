import Link from "next/link";
import { FC } from "react";

export interface IInterviewCardProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  interviewQuestions?: string[];
}

const InterviewCard: FC<IInterviewCardProps> = ({
  id,
  title,
  description,
  createdAt,
  interviewQuestions,
}) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow ">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          {title}
        </h5>
      </a>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {description}
      </p>
      <Link
        href={`/dashboard/interviews/${id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        Read more
      </Link>
    </div>
  );
};

export default InterviewCard;
