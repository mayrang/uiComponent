import Accordions from "./components/accordions";
import InfiniteScroll2 from "./components/infinitescroll/1_j";
import InfiniteScroll1 from "./components/infinitescroll/1_r";
import LazyLoading1 from "./components/lazyloading/1_r";
import LazyLoading2 from "./components/lazyloading/1_v";
import LineClamp from "./components/lineclamp";
import ScrollBox from "./components/scrollbox";
import ScrollBox1 from "./components/scrollbox/1_r";
import TabMenu from "./components/tabmenu";
import Test1 from "./components/test1";
import React from "./components/test2/React";
import Vanilla from "./components/test2/Vanilla";
import TextBox from "./components/textbox";
import Tooltips from "./components/tooltip";

export const routePaths = [
  "/",
  "/test1",
  "/test2",
  "/test2/vanilla",
  "/test2/react",
  "/accodions",
  "/tabmenu",
  "/tooltips",
  "/lineclamps",
  "/textbox",
  "/lazyloading",
  "/lazyloading/react",
  "/lazyloading/vanilla",
  "/infinitescroll/react",
  "/infinitescroll",
  "/infinitescroll/vanilla",
  "/scrollbox",
] as const;

export type ROUTE_PATH = (typeof routePaths)[number];

type BaseRoute = {
  key: ROUTE_PATH;
  link: ROUTE_PATH;
  name: string;
};

export type ParentRoute = BaseRoute & {
  children: ROUTE_PATH[];
};

export type ChildRoute = BaseRoute & {
  children: ((props: unknown) => JSX.Element) | null;
};

export type ROUTE = ParentRoute | ChildRoute;

export const routes: Record<ROUTE_PATH, ROUTE> = {
  "/": {
    key: "/",
    link: "/",
    name: "root",
    children: [
      "/test1",
      "/test2",
      "/accodions",
      "/tabmenu",
      "/tooltips",
      "/lineclamps",
      "/textbox",
      "/lazyloading",
      "/infinitescroll",
      "/scrollbox",
    ],
  },
  "/test1": {
    key: "/test1",
    link: "/test1",
    name: "test1",
    children: Test1,
  },
  "/test2": {
    key: "/test2",
    link: "/test2/vanilla",
    name: "test2",
    children: ["/test2/vanilla", "/test2/react"],
  },
  "/test2/vanilla": {
    key: "/test2/vanilla",
    link: "/test2/vanilla",
    name: "vanilla",
    children: Vanilla,
  },
  "/test2/react": {
    key: "/test2/react",
    link: "/test2/react",
    name: "react",
    children: React,
  },
  "/accodions": {
    key: "/accodions",
    link: "/accodions",
    name: "accodions",
    children: Accordions,
  },
  "/tabmenu": {
    key: "/tabmenu",
    link: "/tabmenu",
    name: "tabmenu",
    children: TabMenu,
  },
  "/tooltips": {
    key: "/tooltips",
    link: "/tooltips",
    name: "tooltips",
    children: Tooltips,
  },
  "/lineclamps": {
    key: "/lineclamps",
    link: "/lineclamps",
    name: "lineclamps",
    children: LineClamp,
  },
  "/lazyloading": {
    key: "/lazyloading",
    link: "/lazyloading/react",
    name: "lazyloading",
    children: ["/lazyloading/react", "/lazyloading/vanilla"],
  },
  "/lazyloading/react": {
    key: "/lazyloading/react",
    link: "/lazyloading/react",
    name: "lazyloading/react",
    children: LazyLoading1,
  },
  "/lazyloading/vanilla": {
    key: "/lazyloading/vanilla",
    link: "/lazyloading/vanilla",
    name: "lazyloading/vanilla",
    children: LazyLoading2,
  },
  "/textbox": {
    key: "/textbox",
    link: "/textbox",
    name: "textbox",
    children: TextBox,
  },
  "/scrollbox": {
    key: "/scrollbox",
    link: "/scrollbox",
    name: "scrollbox",
    children: ScrollBox,
  },
  "/infinitescroll": {
    key: "/infinitescroll",
    link: "/infinitescroll/react",
    name: "infinitescroll",
    children: ["/infinitescroll/react", "/infinitescroll/vanilla"],
  },
  "/infinitescroll/react": {
    key: "/infinitescroll/react",
    link: "/infinitescroll/react",
    name: "infinitescroll/react",
    children: InfiniteScroll1,
  },
  "/infinitescroll/vanilla": {
    key: "/infinitescroll/vanilla",
    link: "/infinitescroll/vanilla",
    name: "infinitescroll/vanilla",
    children: InfiniteScroll2,
  },
};

export const isParentRoute = (route: ROUTE): route is ParentRoute => Array.isArray(route.children);

export const gnbRootList = (routes["/"] as ParentRoute).children.map((r) => routes[r]);
