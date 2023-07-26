import { IQuestion } from "@/components/QuestionsPage";
import { db } from "@/utils/firebase";
import { MultiSelect, MultiSelectProps } from "@uc-react-ui/multiselect";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FC, useEffect, useState } from "react";

interface IEditModalProps {
  handleOpen: (state: boolean) => void;
  isAdmin: boolean;
  id: string;
}

const EditUserModal: FC<IEditModalProps> = ({ handleOpen, isAdmin, id }) => {
  const [userId, setID] = useState<string>(id);
  const [value, setValue] = useState(isAdmin ? "true" : "false");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(event.target.value);
  };

  const handleEditInterview = async () => {
    try {
      const userDocRef = doc(db, `users/${id}`);
      await updateDoc(userDocRef, {
        isAdmin: value,
      });
      handleOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-screen">
      <div className="relative w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <div className="flex items-start justify-between p-4 border-b rounded-t border-gray-300">
            <h3 className="text-xl font-semibold text-gray-90">Edit user</h3>
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
              <select
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={value}
                onChange={handleChange}
              >
                <option value={"true"}>True</option>
                <option value={"false"}>False</option>
              </select>
            </form>
          </div>
          <div className="flex items-center p-6 space-x-2 border-t  rounded-b border-gray-300">
            <button
              onClick={handleEditInterview}
              type="button"
              className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              Edit
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

export default EditUserModal;
