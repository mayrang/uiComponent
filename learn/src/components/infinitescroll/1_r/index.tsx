import React, { useEffect, useRef } from "react";
import { cx } from "../cs";
import useInfiniteFetcher, { Data } from "./useInfiniteFetcher";
import useIntersectionObserver from "@/components/hooks/useIntersectionObserver";
import useInfiniteScroll from "./useInfiniteScroll";

const DataComponent = ({ id, description, index, title }: Data) => {
  return (
    <div>
      <h4>
        {index}. {title}
      </h4>
      <div>{description}</div>
    </div>
  );
};

const InfiniteScroll1 = () => {
  const { data, moreElem, state } = useInfiniteScroll();
  return (
    <div>
      <h2>무한 스크롤</h2>
      <h3>#1. React</h3>
      {data.map((items, i) => items.map((item, j) => <DataComponent {...item} />))}
      <div ref={moreElem} style={{ height: 100 }} />
      {state === "loading" && <div className={cx("loading")} />}
    </div>
  );
};

export default InfiniteScroll1;
