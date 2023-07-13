import { FC, useState } from "react";

interface IAddModalProps {
  handleOpen: (state: boolean) => void;
}

const AddQuestionModal: FC<IAddModalProps> = ({ handleOpen }) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionText, setQuestionText] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");

  const handleAddQuestion = async () => {
    try {
      const response = await fetch(
        "https://64a1641a0079ce56e2db0688.mockapi.io/questions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: questionTitle,
            question: questionText,
            video: videoUrl,
          }),
        }
      );

      if (response.ok) {
        console.log("Вопрос успешно добавлен");
        handleOpen(false);
      } else {
        console.error("Ошибка при добавлении вопроса");
      }
    } catch (error) {
      console.error("Ошибка при добавлении вопроса:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-100">
          <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-300">
            <h3 className="text-xl font-semibold text-gray-90">Add question</h3>
            <button
              onClick={() => handleOpen(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-6 space-y-6">
            <form>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  type="text"
                  onChange={(e) => setQuestionTitle(e.target.value)}
                  name="floating_question_title"
                  id="floating_question_title"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_question_title"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Question title
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  onChange={(e) => setQuestionText(e.target.value)}
                  type="text"
                  name="floating_question_text"
                  id="floating_question_text"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="floating_password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Question text
                </label>
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <input
                  onChange={(e) => setVideoUrl(e.target.value)}
                  type="text"
                  name="question_video"
                  id="question_video"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="question_video"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Video url
                </label>
              </div>
            </form>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t  rounded-b border-gray-300">
            <button
              onClick={handleAddQuestion}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => handleOpen(false)}
              className="text-gray-400 hover:text-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
