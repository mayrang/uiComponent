"use client";
import { ROUTE_PATH, isParentRoute, routes } from "@/route";
import React from "react";

export default function ItemPage({ param: { item } }: { param: { item: string[] } }) {
  const path = ["", item].join("/") as ROUTE_PATH;
  const route = routes[path];
  if (!route?.children || !!isParentRoute(route)) {
    return null;
  }
  const { children: Component } = route;
  return <Component />;
}
