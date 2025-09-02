import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";

export default function AuthLayout() {
  const [showLoadingPage, setShowLoadingPage] = useState(true);

  let loaderTimer = () => {
    setTimeout(() => {
      setShowLoadingPage(false);
      // document.querySelector(".loader").classList.add("hidden!");
    }, 2000);
  };

  useEffect(() => {
    loaderTimer();

    return () => {
      clearTimeout(loaderTimer);
    };
  }, []);
  return (
    <>
      {showLoadingPage && <LoadingPage />}
      <div className="min-h-screen py-8 flex justify-center">
        <Outlet />
      </div>
    </>
  );
}
