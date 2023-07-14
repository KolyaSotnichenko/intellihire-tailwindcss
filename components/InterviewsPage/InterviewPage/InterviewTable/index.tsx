import { IQuestion } from "@/components/QuestionsPage";
import Link from "next/link";
import { FC } from "react";

interface IInterviewTableProps {
  data: IQuestion[];
}

const InterviewTable: FC<IInterviewTableProps> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Question
            </th>
            <th scope="col" className="px-6 py-3">
              Your answer
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr
                key={index}
                className={`bg-white border-b ${
                  parseInt(item.id) % 2 ? "bg-gray-300" : "bg-gray-100"
                } dark:border-gray-200`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {item.title}
                </th>
                <td className="px-6 py-4 text-gray-800">{item.question}</td>
                <td className="px-6 py-4 text-gray-800">{item.answer}</td>
                <td className="px-6 py-4 flex gap-x-5">
                  <Link
                    className="hover:text-gray-800"
                    href={`/dashboard/questions/${item.id}`}
                  >
                    Open
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <p>No questions</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewTable;
