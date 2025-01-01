import VanillaWrapper from "@/components/VanillaWrapper";
import React from "react";
import { cx } from "../cs";
import { Data } from "../1_r/useInfiniteFetcher";
import infiniteFetcher, { State } from "./infiniteFetcher";
import intersectionObserver from "@/components/hooks/vanilla/intersectionObserver";

const generateListItem = ({ id, index, title, description }: Data) => {
  const $li = document.createElement("li");
  $li.insertAdjacentHTML(
    "beforeend",
    `
    <p><stroing>${index}. ${title}</strong></p>
    <div>${description}</div>

  `
  );
  return $li;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $more = document.createElement("div");
  $more.style.height = "60px";
  const $list = document.createElement("ul");
  const $loading = document.createElement("div");
  $loading.classList.add(cx("loading"));

  let prevState: State = "idle";

  const handleFetch = (state: State, data?: Data[]) => {
    if (prevState === state) return;
    if (state === "loading") {
      prevState = "loading";
      wrapper.append($loading);
    }
    if (state === "fetched" && data) {
      const list = data.map((item) => generateListItem(item));
      console.log("list", list);
      $list.append(...list);
      prevState = "fetched";
      $loading.remove();
    }
  };

  const handleIntersect = ([entry]: IntersectionObserverEntry[] = []) => {
    const isIntersecting = entry?.isIntersecting;
    if (isIntersecting && prevState !== "loading") {
      infiniteFetcher(handleFetch);
    }
  };
  intersectionObserver($more, { threshold: 0.5 }, handleIntersect);
  wrapper.append($list, $more);
};

const InfiniteScroll2 = () => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <h2>무한스크롤</h2>
      <VanillaWrapper initiator={initiator} />
    </div>
  );
};

export default InfiniteScroll2;
