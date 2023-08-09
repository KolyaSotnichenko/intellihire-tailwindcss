import { FC, useState } from "react";
import { IInterviewCardProps } from "../InterviewCard";
import EditInterviewModal from "../EditInterviewModal";
import { formatDate } from "@/utils/formatDate";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

interface IInterviewTableProps {
  data: IInterviewCardProps[];
}

const InterviewsTable: FC<IInterviewTableProps> = ({ data }) => {
  const [openEditModal, setOpenEditModel] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IInterviewCardProps>();

  const queryClient = useQueryClient();

  const removeInterview = async (id: string) => {
    const response = await fetch(
      `https://64a1641a0079ce56e2db0688.mockapi.io/interviews/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      toast.success(`Your question has removed!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const mutation = useMutation((id: string) => removeInterview(id), {
    onSuccess: () => queryClient.invalidateQueries(["interviews"]),
  });

  const handleRemoveInterview = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Interview Title
            </th>
            <th scope="col" className="px-6 py-3">
              Interview Descriptions
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 ? (
            data.map((item, index) => {
              const handleOpenEditModal = () => {
                setOpenEditModel(true);
                setSelectedItem(item);
              };

              return (
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
                    {item.id}
                  </th>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                  >
                    {item.title}
                  </th>
                  <td className="px-6 py-4 text-gray-800">
                    {item.description}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {formatDate(parseInt(item.createdAt))}
                  </td>
                  <td className="px-6 py-4 flex gap-x-5">
                    <button
                      className="text-gray-900 hover:text-gray-500"
                      onClick={handleOpenEditModal}
                    >
                      Edit
                    </button>
                    {openEditModal && selectedItem && (
                      <EditInterviewModal
                        id={selectedItem.id}
                        title={selectedItem.title}
                        description={selectedItem.description}
                        interviewQuestions={
                          selectedItem.interviewQuestions || []
                        }
                        handleOpen={setOpenEditModel}
                      />
                    )}
                    <button
                      className="text-red-500 hover:text-gray-500"
                      onClick={() => handleRemoveInterview(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>No interviews</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InterviewsTable;
