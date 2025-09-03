import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import NavbarComponent from "../../components/Navbar";
import LoadingPage from "../../components/LoadingPage";

export default function MainLayout({ toggleTheme }) {
  const [showLoadingPage, setShowLoadingPage] = useState(true);

  let loaderTimer = () => {
    setTimeout(() => {
      setShowLoadingPage(false);
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
      <NavbarComponent toggleTheme={toggleTheme} />
      <div className="container mx-auto min-h-screen py-5">
        <Outlet />
      </div>
    </>
  );
}
