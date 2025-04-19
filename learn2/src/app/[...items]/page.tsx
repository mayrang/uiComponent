"use client";

import { isParentRoute, ROUTE_PATH, routes } from "@/routes";

export default function ItemPage({ params: { items } }: { params: { items: string[] } }) {
  const path = ["", ...items].join("/") as ROUTE_PATH;
  const route = routes[path];
  if (!route || isParentRoute(route)) return null;
  const { children: Component } = route;

  return Component ? <Component /> : null;
}
