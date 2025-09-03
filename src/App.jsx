import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./Pages/AuthPages/AuthLayout";
import Login from "./Pages/AuthPages/Login/Login";
import Register from "./Pages/AuthPages/Register/Register";
import MainLayout from "./Pages/MainPages/MainLayout";
import Home from "./Pages/MainPages/Home/Home";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import NotFound from "./Pages/MainPages/NotFound/NotFound";
import MainProtect from "./protectRoutes/MainProtect";
import AuthProtect from "./protectRoutes/AuthProtect";
import { queryClient } from "./services/constants";

function App() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    if (!("theme" in localStorage)) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
        setTheme("light");
      }
    }
    if ("theme" in localStorage) {
      if (localStorage.theme === "dark") {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      } else if (localStorage.theme === "light") {
        setTheme("light");
      }
    }
  }, []);

  function toggleTheme() {
    document.documentElement.classList.toggle("dark");
    if (theme == "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    } else if (theme == "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  const route = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: (
            <AuthProtect>
              <Login />
            </AuthProtect>
          ),
        },
        {
          path: "register",
          element: (
            <AuthProtect>
              <Register />
            </AuthProtect>
          ),
        },
      ],
    },
    {
      path: "",
      element: <MainLayout toggleTheme={toggleTheme} />,
      children: [
        {
          index: true,
          element: (
            <MainProtect>
              <Home />
            </MainProtect>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={route}></RouterProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
