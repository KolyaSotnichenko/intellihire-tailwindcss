"use client";

import Image from "next/image";
import diamondIcon from "../../shared/assets/diamond.svg";
import { motion } from "framer-motion";
import { initGA, logPageView } from "@/utils/ga";
import { useEffect } from "react";

const GetProPage = () => {
  useEffect(() => {
    if (!window.GA_INITIALIZED) {
      initGA();
      window.GA_INITIALIZED = true;
    }
    logPageView();
  }, []);

  return (
    <div className="sm:ml-64">
      <div className="rounded-lg ">
        <div className="h-screen flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center gap-y-5 bg-white p-6  md:mx-auto"
          >
            <Image
              src={diamondIcon}
              height={100}
              width={100}
              draggable={false}
              alt="Diamond"
            />
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                To access this page, you must have a PRO subscription!
              </h3>
              {/* <div className="py-10 text-center">
                <Link
                  href="/dashboard"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  GO TO DASHBOARD
                </Link>
              </div> */}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GetProPage;
