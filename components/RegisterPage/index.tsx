"use client";

import { signUp } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";
import backIcon from "../../shared/assets/back.svg";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { getAuth } from "firebase/auth";
import { useEffect } from "react";

const RegisterPage = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email"));
    const password = String(data.get("password"));

    const { result, error } = await signUp(email, password);

    if (error) {
      console.log(error);
      return toast.error(`${error}`, {
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

  const router = useRouter();

  const auth = getAuth();

  useEffect(() => {
    // Function to redirect to the dashboard
    const redirectToDashboard = () => {
      router.push("/dashboard");
    };

    // Check if there is a currently logged-in user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // Redirect the user to the dashboard if logged in
        redirectToDashboard();
      }
    });

    // Unsubscribe from the auth state changes when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section>
        <div className="flex flex-col items-center justify-center gap-y-5 px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/login">
            <Image
              className="cursor-pointer"
              src={backIcon}
              width={30}
              alt="Back"
            />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2x">
                Sign up your account
              </h1>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium "
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required={false}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium "
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={false}
                  />
                </div>
                {/* <div className="flex items-center justify-between">
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div> */}
                <button
                  type="submit"
                  className="w-full bg-gray-700 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign up
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
