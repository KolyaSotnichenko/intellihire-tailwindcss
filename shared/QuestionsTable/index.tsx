import { IQuestion } from "@/components/QuestionsPage";
import { FC, useState } from "react";
import EditQuestionModal from "../EditQuestionModal";

interface IQuestionTableProps {
  data: IQuestion[];
}

const QuestionsTable: FC<IQuestionTableProps> = ({ data }) => {
  const [openEditModal, setOpenEditModel] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<IQuestion>();

  const handleRemoveQuestion = (id: string) => {
    fetch(`https://64a1641a0079ce56e2db0688.mockapi.io/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Вопрос успешно удален");
        } else {
          console.error("Ошибка при удалении вопроса");
        }
      })
      .catch((error) => {
        console.error("Ошибка при удалении вопроса:", error);
      });
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Question Title
            </th>
            <th scope="col" className="px-6 py-3">
              Question Text
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
                  <td className="px-6 py-4 text-gray-800">{item.question}</td>
                  <td className="px-6 py-4 flex gap-x-5">
                    <button
                      className="text-gray-900 hover:text-gray-500"
                      onClick={handleOpenEditModal}
                    >
                      Edit
                    </button>
                    {openEditModal && selectedItem && (
                      <EditQuestionModal
                        id={selectedItem.id}
                        title={selectedItem.title}
                        text={selectedItem.question}
                        video={selectedItem.video}
                        handleOpen={setOpenEditModel}
                      />
                    )}
                    <button
                      className="text-red-500 hover:text-gray-500"
                      onClick={() => handleRemoveQuestion(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <p>No questions</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionsTable;
