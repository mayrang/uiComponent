import React, { useEffect, useRef } from "react";
import useInfiniteFetcher from "./useInfiniteFetcher";
import useIntersectionObserver from "@/components/hooks/useIntersectionObserver";

const initOptions = {
  threshold: 0.5,
};

const useInfiniteScroll = () => {
  const moreElem = useRef<HTMLDivElement>(null);
  const { data, fetchNextPage, state } = useInfiniteFetcher();
  const {
    entries: [entry],
  } = useIntersectionObserver(moreElem, initOptions);
  const isInterseting = entry?.isIntersecting;

  useEffect(() => {
    console.log(isInterseting);
    if (isInterseting) {
      fetchNextPage();
    }
  }, [isInterseting]);

  return {
    moreElem,
    state,
    data,
  };
};

export default useInfiniteScroll;
