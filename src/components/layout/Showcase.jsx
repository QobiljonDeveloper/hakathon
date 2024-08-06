import React from "react";
import { FiArrowRight } from "react-icons/fi"; // React Icons
import { Link } from "react-router-dom"; // React Router Link
import "../../config/i18"; // Import the i18n configuration
import { useTranslation } from "react-i18next"; // Use the hook

const Showcase = () => {
  const { t } = useTranslation(); // Use the hook to get the t function

  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{
        backgroundImage: "linear-gradient(to bottom, #0F172A , #353d44)",
      }}
    >
      <div className="flex flex-col items-center justify-center h-full space-y-6 bg-gradient-to-b from-transparent to-[#353d44]">
        <h1 className="text-white text-4xl mb-2">
          {t("We love digital solutions")}
        </h1>

        <div className="flex space-x-4">
          <Link
            to="/login"
            className="animated-button flex items-center justify-center bg-[#2a737e] border-2  border-[#2a737e] text-white text-base font-bold w-[180px] py-2   rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-white hover:text-[#2a737e]"
          >
            <span className="icon mr-1 ">
              <FiArrowRight />
            </span>
            <span className="text">{t("Login")}</span>
          </Link>
          <Link
            to="/register"
            className="animated-button flex items-center justify-center bg-transparent border-2 border-white text-white text-base font-bold w-[180px] py-2 rounded-md cursor-pointer transition duration-300 ease-in-out hover:bg-white hover:text-[#0F172A]"
          >
            <span className="icon mr-2">
              <FiArrowRight />
            </span>
            <span className="text">{t("Register")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
