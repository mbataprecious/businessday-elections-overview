import { useQuery } from "react-query";
import { fetchDataFromSheet } from "../utils";

export const useFetchFutureElectionData = () => {
  return useQuery("live", fetchDataFromSheet, {
    refetchIntervalInBackground: true,
    refetchInterval: 6000,
  });
};
