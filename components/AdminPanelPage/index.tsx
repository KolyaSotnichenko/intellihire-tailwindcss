"use client";

import AddQuestionModal from "@/shared/AddQuestionModal";
import QuestionsTable from "@/shared/QuestionsTable";
import { useEffect, useState } from "react";

const AdminPanelPage = () => {
  const [NumberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [questions, setQuestions] = useState<[]>([]);
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await fetch(
          "https://64a1641a0079ce56e2db0688.mockapi.io/questions"
        );
        const questions: any = await res.json();

        setNumberOfQuestions(questions.length);
        setQuestions(questions);
      } catch (error) {
        console.error(
          'Error retrieving "Completed" collection for user:',
          error
        );
      }
    };

    getQuestions();
  }, []);
  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg ">
          <h1 className="text-[24px] font-bold mb-8 capitalize">Admin Panel</h1>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400">
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Number of questions
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                {NumberOfQuestions}
              </p>
            </div>
            <button
              onClick={() => setOpenAddModal(true)}
              className="p-2 hover:bg-slate-400 hover:text-white  rounded-[20px] border  border-gray-400"
            >
              Add question
            </button>
            {openAddModal && <AddQuestionModal handleOpen={setOpenAddModal} />}
            {/* <div className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400">
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Current streak✨
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                0 days
              </p>
            </div> */}
          </div>
          <div className="h-[50vh] mb-4 rounded bg-gray-50 cursor-pointer ">
            <QuestionsTable data={questions} />
          </div>
          {/*<div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">+</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminPanelPage;
