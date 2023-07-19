"use client";

import AddQuestionModal from "@/shared/AddQuestionModal";
import QuestionsTable from "@/shared/QuestionsTable";
import Image from "next/image";
import { useEffect, useState } from "react";
import addIcon from "../../shared/assets/add.svg";
import { db } from "@/utils/firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import InterviewsTable from "@/shared/InterviewsTable";
import AddInterviewModal from "@/shared/AddInterviewModal";
import UsersTable from "@/shared/UsersTable";

const AdminPanelPage = () => {
  const [numberOfQuestions, setNumberOfQuestions] = useState<number>(0);
  const [numberOfInterviews, setNumberOfInterviews] = useState<number>(0);
  const [numberOfUsers, setNumberOfUsers] = useState<number>(0);
  const [questions, setQuestions] = useState<[]>([]);
  const [interviews, setInterviews] = useState<[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [openAddInterviewModal, setOpenAddInterviewModal] =
    useState<boolean>(false);

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

  useEffect(() => {
    const getInterviews = async () => {
      try {
        const res = await fetch(
          "https://64a1641a0079ce56e2db0688.mockapi.io/interviews"
        );

        const interviews: any = await res.json();
        setNumberOfInterviews(interviews.length);
        setInterviews(interviews);
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
    const getUsers = async () => {
      try {
        const usersCollectionRef = collection(db, "users");
        const docSnapshot = await getDocs(usersCollectionRef);

        const users: any[] = [];
        docSnapshot.docs.forEach((doc) => {
          users.push(doc.data());
        });

        setNumberOfUsers(users.length);
        setUsers(users);
      } catch (error) {
        console.error(
          'Error retrieving "Completed" collection for user:',
          error
        );
      }
    };

    getUsers();
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
                {numberOfQuestions}
              </p>
            </div>
            <div className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400">
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Number of interviews
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                {numberOfInterviews}
              </p>
            </div>
            <div className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400">
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Number of users
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                {numberOfUsers}
              </p>
            </div>
            {openAddModal && <AddQuestionModal handleOpen={setOpenAddModal} />}
            {openAddInterviewModal && (
              <AddInterviewModal handleOpen={setOpenAddInterviewModal} />
            )}
            {/* <div className="flex flex-col gap-y-[5px]  p-4  h-24 rounded-[20px] border  border-gray-400">
              <p className="text-[15px] text-gray-400 dark:text-gray-400 capitalize">
                Current streak✨
              </p>
              <p className="text-2xl font-bold text-gray-400 dark:text-black">
                0 days
              </p>
            </div> */}
          </div>
          <div className="h-[40vh] flex flex-col gap-y-4 overflow-y-scroll mb-4 rounded ">
            <UsersTable data={users} />
          </div>
          <div className="h-[40vh] flex flex-col gap-y-4 overflow-y-scroll mb-4 rounded ">
            <Image
              className="cursor-pointer self-end"
              onClick={() => setOpenAddModal(true)}
              src={addIcon}
              width={40}
              height={40}
              alt="Add question"
            />
            <QuestionsTable data={questions} />
          </div>
          <div className="h-[40vh] flex flex-col gap-y-4 overflow-y-scroll mb-4 rounded ">
            <Image
              className="cursor-pointer self-end"
              onClick={() => setOpenAddInterviewModal(true)}
              src={addIcon}
              width={40}
              height={40}
              alt="Add interview"
            />
            <InterviewsTable data={interviews} />
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
