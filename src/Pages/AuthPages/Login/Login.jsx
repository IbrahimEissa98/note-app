import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../../assets/images/note-logo.png";

import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../../../lib/schema/authSchemas";
import { Button, Form, Input } from "@heroui/react";
import PassToggle from "../../../components/PassToggle";
import ToggleTheme from "../../../components/ToggleTheme";
import { isLoginContext } from "../../../contexts/LoginContext";
import { useMutation } from "@tanstack/react-query";
import { apiServices } from "../../../services/ApisClass";

export default function Login() {
  const [errMsg, setErrMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const { setIsLogin } = useContext(isLoginContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const { mutate: handleLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: (formData) => {
      setErrMsg("");
      setSuccMsg("");
      return apiServices.login(formData);
    },
    onSuccess: (res) => {
      localStorage.setItem("token", "3b8ny__" + res.data.token);
      setSuccMsg("Welcome Back");
      reset();
      setIsLogin(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    },
    onError: () => {
      setErrMsg("Invalid email or password");
    },
  });

  return (
    <>
      <div className="flex items-center max-w-[400px] w-full shadow-xl p-5 rounded-2xl bg-[#F9FFFB] dark:bg-slate-900">
        <div className="py-10 px-5 w-full border-2 border-black/10 dark:border-white/30 rounded-lg relative">
          {/* <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <ToggleTheme toggleTheme={toggleTheme} />
          </div> */}
          <div className="flex justify-center items-center gap-3">
            <img src={logo} className="w-[50px]" alt="note logo" />
            <h2 className="font-jost font-medium text-2xl">
              Note
              <span className="bg-black text-white dark:bg-white dark:text-black px-1 rounded-xl translate-y-2 inline-block">
                Plus
              </span>
            </h2>
          </div>
          <h1 className="font-semibold font-jost text-4xl text-shadow-lg text-center mt-5">
            Login
          </h1>
          <p className="font-roboto text-center mt-2 text-gray-500">
            Login to stay connected
          </p>

          <Form className="w-full mt-7" onSubmit={handleSubmit(handleLogin)}>
            <div className="w-full grid gap-6">
              <div className="w-full relative">
                <Input
                  isRequired={true}
                  classNames={{
                    inputWrapper:
                      "border-1 border-black/20 hover:border-black/50 dark:hover:border-white/50 group-data-[focus=true]:border-2 group-data-[focus=true]:border-black dark:group-data-[focus=true]:border-white group-data-[focus=true]:hover:border-black dark:group-data-[focus=true]:hover:border-white group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                    label:
                      "text-md group-data-[filled-within=true]:text-black group-data-[filled-within=true]:bg-gray-200 rounded-2xl py-1 px-2 group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_0px)]",
                  }}
                  label="Email"
                  type="email"
                  {...register("email")}
                  isInvalid={Boolean(errors.email?.message)}
                  errorMessage={errors.email?.message}
                />
              </div>
              <div className="w-full relative ">
                <div className="absolute z-20 right-5 top-7 -translate-y-1/2">
                  <PassToggle
                    isVisible={isVisible}
                    setIsVisible={setIsVisible}
                  />
                </div>
                <Input
                  isRequired={true}
                  classNames={{
                    inputWrapper:
                      "border-1 border-black/20 hover:border-black/50 dark:hover:border-white/50 group-data-[focus=true]:border-2 group-data-[focus=true]:border-black dark:group-data-[focus=true]:border-white group-data-[focus=true]:hover:border-black dark:group-data-[focus=true]:hover:border-white group-data-[focus=true]:dark:bg-gray-600 bg-gray-50 dark:bg-gray-700",
                    label:
                      "text-md group-data-[filled-within=true]:text-black group-data-[filled-within=true]:bg-gray-200 rounded-2xl py-1 px-2 group-data-[filled-within=true]:-translate-y-[calc(50%_+_var(--heroui-font-size-small)/2_-_0px)]",
                  }}
                  label="Password"
                  type={`${!isVisible ? "password" : "text"}`}
                  {...register("password")}
                  isInvalid={Boolean(errors.password?.message)}
                  errorMessage={errors.password?.message}
                />
              </div>
            </div>
            <div className="mt-4 mx-auto">
              <Button
                type="submit"
                variant="solid"
                className="mx-auto w-full bg-black dark:bg-white text-medium hover:text-xl transition-all duration-300 text-white dark:text-black font-bold tracking-wider flex justify-center items-center"
                isLoading={isPendingLogin}
              >
                Login
              </Button>
              {errMsg && (
                <p className="text-center text-sm bg-red-400 text-red-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                  {errMsg}
                </p>
              )}
              {succMsg && (
                <p className="text-center text-sm bg-green-400 text-green-800 rounded-2xl w-fit mx-auto px-4 py-1 mt-2 first-letter:capitalize">
                  {succMsg}
                </p>
              )}
              <p className="text-gray-400 font-medium mt-4 text-center">
                Create an Account?
                <Link
                  className="text-black dark:text-white ms-2 w-fit capitalize italic font-semibold "
                  to={"/register"}
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
