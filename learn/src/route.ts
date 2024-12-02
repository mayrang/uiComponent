import Accordions from "./components/accordions";
import TabMenu from "./components/tabmenu";
import Test1 from "./components/test1";
import React from "./components/test2/React";
import Vanilla from "./components/test2/Vanilla";
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
    children: ["/test1", "/test2", "/accodions", "/tabmenu", "/tooltips"],
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
};

export const isParentRoute = (route: ROUTE): route is ParentRoute => Array.isArray(route.children);

export const gnbRootList = (routes["/"] as ParentRoute).children.map((r) => routes[r]);
