import React from "react";
import { useQuery } from "react-query";
import { fetchBlogFeeds } from "../utils";

const useFetchBlogData = () => {
  return useQuery("blogs", fetchBlogFeeds, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
};

export default useFetchBlogData;
