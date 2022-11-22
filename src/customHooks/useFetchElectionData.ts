import React from "react";
import { useQuery } from "react-query";
import { fetchElectionData } from "../utils";

export const useFetchElectionData = () => {
  return useQuery("data", fetchElectionData, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};
