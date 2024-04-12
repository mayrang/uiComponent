"use client";
import { ROUTE_PATH, isParentRoute, routes } from "@/route";
import React from "react";

export default function ItemPage({ params: { item } }: { params: { item: string[] } }) {
  const path = ["", ...item].join("/") as ROUTE_PATH;
  const route = routes[path];
  console.log(path, route, "component");
  if (!route?.children || !!isParentRoute(route)) {
    return null;
  }
  const { children: Component } = route;

  return <Component />;
}
