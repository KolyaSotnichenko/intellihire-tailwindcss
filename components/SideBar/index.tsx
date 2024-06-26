"use client";

import { logout } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import adminIcon from "../../shared/assets/admin.svg";
import logoutIcon from "../../shared/assets/logout.svg";
import questionsIcon from "../../shared/assets/questions.svg";
import interviewsIcon from "../../shared/assets/interviews.svg";
import dashboardIcon from "../../shared/assets/dashboard.svg";
import { getAuth } from "firebase/auth";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
//@ts-ignore
import { LiqPaySubscribe } from "react-liqpay";
import crypto from "crypto";
import { getCurrentDateTime } from "@/utils/getDate";
import { generateOrderId } from "@/utils/geterateOrderId";

const SideBar = () => {
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(!isDesktop);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isPro, setIsPro] = useState<boolean>(false);
  const [userOrderID, setUserOrderID] = useState<string>("");

  const user = getAuth().currentUser;

  useEffect(() => {
    const getRole = async () => {
      try {
        if (user) {
          const role = doc(db, "users", user.uid);
          onSnapshot(role, (doc) => {
            if (doc.exists()) {
              setIsAdmin(doc.data().isAdmin);
              setIsPro(doc.data()?.isPro);
            } else {
              console.log("User not found");
            }
          });
        } else {
          console.log("No authenticated user");
        }
      } catch (error) {
        console.error(
          'Error retrieving "Completed" collection for user:',
          error
        );
      }
    };

    getRole();
  }, []);

  useEffect(() => {
    const getUserOrderID = async () => {
      try {
        if (user) {
          const orderId = doc(db, "users", user.uid);
          const docSnapshot = await getDoc(orderId);

          if (docSnapshot.exists()) {
            setUserOrderID(docSnapshot.data().orderId);
          } else {
            console.log("User not found");
          }
        } else {
          console.log("No authenticated user");
        }
      } catch (error) {
        console.error(
          'Error retrieving "Completed" collection for user:',
          error
        );
      }
    };

    getUserOrderID();
  }, []);

  useEffect(() => {
    const checkSubscription = async () => {
      if (userOrderID) {
        try {
          await fetch("/api/check-subscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userOrderID, userID: user?.uid }),
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    checkSubscription();
  }, []);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
  }, []);

  const generatedOrderId = generateOrderId();

  const json = {
    public_key: `${process.env.NEXT_PUBLIC_LIQPAY_PUBLIC_KEY}`,
    version: "3",
    action: "subscribe",
    subscribe_date_start: getCurrentDateTime(),
    subscribe_periodicity: "month",
    amount: "1",
    currency: "USD",
    description: "test",
    language: "en",
    order_id: generatedOrderId,
    result_url: "https://intellihire-beta.vercel.app/dashboard",
  };
  const jsonString = JSON.stringify(json);
  const encodedString = btoa(jsonString);

  const sign_string =
    process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY +
    encodedString +
    process.env.NEXT_PUBLIC_LIQPAY_PRIVATE_KEY;

  const sha1 = crypto.createHash("sha1");
  sha1.update(sign_string);
  const signature = sha1.digest("base64");

  const handleOrderID = async (orderID: string) => {
    const userDocRef = doc(db, `users/${user?.uid}`);
    await updateDoc(userDocRef, {
      orderId: orderID,
      isPro: true,
    });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userOrderID, userID: user?.uid }),
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpen(false)}
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          isOpen ? "-translate-x-full" : ""
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="flex flex-col justify-between h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <div>
            <div className="flex flex-row justify-between items-center mb-8">
              <Link href="/dashboard" className="text-xl font-semibold">
                IntelliHire
              </Link>
              <button
                className="sm:block md:hidden"
                onClick={() => setIsOpen(true)}
              >
                X
              </button>
            </div>
            <ul className="space-y-2 font-medium flex flex-col">
              <li>
                <Link
                  href="/dashboard"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center p-2 text-black hover:text-white rounded-lg  hover:bg-gray-200"
                >
                  <Image src={dashboardIcon} width={25} alt="Dashboard" />
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href={isPro ? "/dashboard/interviews" : "/dashboard/get-pro"}
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center p-2 text-black hover:text-white rounded-lg hover:bg-gray-200"
                >
                  <Image src={interviewsIcon} width={25} alt="All interviews" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    All interviews
                  </span>
                  {!isPro && (
                    <span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
                      Pro
                    </span>
                  )}
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/questions"
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center p-2 text-black hover:text-white rounded-lg hover:bg-gray-200"
                >
                  <Image src={questionsIcon} width={25} alt="Questions bank" />
                  <span className="flex-1 ml-3 whitespace-nowrap">
                    Questions Bank
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="p-4 mt-6 rounded-lg bg-gray-200">
            <div className="flex items-center mb-3">
              <span className="bg-gray-900 text-white text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                Beta
              </span>
            </div>
            <p className="mb-3 text-sm text-gray-900">
              Be among the first to try out our revolutionary IntelliHire Beta!
            </p>
          </div>
          <div>
            {user && !isPro ? (
              <form
                method="POST"
                acceptCharset="utf-8"
                target="_blank"
                action="https://www.liqpay.ua/api/3/checkout"
              >
                <input type="hidden" name="data" value={encodedString} />
                <input type="hidden" name="signature" value={signature} />
                <button
                  onClick={() => handleOrderID(generatedOrderId)}
                  className="w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  <span className="inline-block align-middle ml-2">
                    Get Pro
                  </span>
                </button>
              </form>
            ) : (
              <button
                onClick={handleSubmit}
                className="w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Cancel subscription
              </button>
            )}
            {isAdmin && (
              <Link
                href="/dashboard/god"
                className="flex items-center p-2 text-black hover:text-white rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <Image src={adminIcon} width={25} alt="admin" />
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Admin panel
                </span>
              </Link>
            )}
            <div
              onClick={logout}
              className="flex items-center p-2 text-black hover:text-white rounded-lg hover:bg-gray-200 cursor-pointer"
            >
              <Image src={logoutIcon} width={25} alt="log out" />
              <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
