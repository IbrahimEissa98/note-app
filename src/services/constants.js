import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function createdAt(time) {
  const date = new Date(time);
  return (
    date.getDate() +
    "-" +
    (date.getMonth() + 1) +
    "-" +
    date.getFullYear() +
    ", " +
    date.getHours() +
    ":" +
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
  );
}
