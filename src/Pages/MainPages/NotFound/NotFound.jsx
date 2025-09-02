import React from "react";
import notFoundImg from "../../../assets/images/404.png";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <div className="max-w-[600px] py-10 mx-auto min-h-screen flex flex-col justify-center items-center">
        <img
          className="w-full inline-block"
          src={notFoundImg}
          alt="not font image"
        />
        <div className="font-jost text-center mt-4">
          <h3 className="text-2xl">Look like you're lost</h3>
          <p className="text-2xl">The page you are looking for not avaible!</p>
          <Link
            to={"/"}
            className="bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 mt-5 inline-block rounded-xl"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </>
  );
}
