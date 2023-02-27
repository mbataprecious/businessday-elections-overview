import { useQuery } from "react-query";
import { fetchTotalFromSheet } from "../utils";

export const useFetchTotal = () => {
  return useQuery("total-my", fetchTotalFromSheet, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
