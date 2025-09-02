import loadingImg from "../assets/images/loader.gif";
import logo from "../assets/images/note-logo.png";
import { Spinner } from "@heroui/react";

export default function LoadingPage() {
  return (
    <>
      <div className="loader fixed inset-0 bg-[#F3F6FD] z-50 flex justify-center items-center flex-col ">
        <img
          className="block -mt-20 w-72 h-56"
          src={loadingImg}
          alt="Note logo"
        />
        <div className="flex justify-center items-center gap-3">
          <img src={logo} className="w-[50px]" alt="note logo" />
          <h1 className="font-jost text-black font-medium text-2xl">
            Note
            <span className="bg-black text-white px-1 rounded-xl translate-y-2 inline-block">
              Plus
            </span>
          </h1>
        </div>

        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-black font-semibold">
          Copyrights © Ibrahim Eissa
        </p>
      </div>
    </>
  );
}
