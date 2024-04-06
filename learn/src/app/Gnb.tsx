"use client";
import { ChildRoute, ParentRoute, ROUTE, ROUTE_PATH, gnbRootList, isParentRoute, routes } from "@/route";
import classNames from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const ParentGnbItem = ({
  route: { children, link, name },
  currentPath,
}: {
  route: ParentRoute;
  currentPath: ROUTE_PATH;
}) => {
  const isOpen = children.includes(currentPath);
  return (
    <li className={classNames("parent", `items-${children.length}`, { open: isOpen })}>
      <Link href={link}>{name}</Link>
      <ul className="subRoutes">
        {children.map((r) => {
          const route = routes[r];
          return <GnbItem route={route} currentPath={currentPath} key={route.key} />;
        })}
      </ul>
    </li>
  );
};
const ChildGnbItem = ({ route: { children, link, name }, currentPath }: { route: ChildRoute; currentPath: string }) => {
  console.log(currentPath);
  return (
    <li className={classNames({ active: currentPath === link })}>
      <Link href={link}>{name}</Link>
    </li>
  );
};

const GnbItem = ({ route, currentPath }: { route: ROUTE; currentPath: ROUTE_PATH }) => {
  if (isParentRoute(route)) return <ParentGnbItem route={route} currentPath={currentPath} />;
  return <ChildGnbItem route={route} currentPath={currentPath} />;
};

export default function Gnb() {
  const { item = [] } = useParams();
  console.log(item);
  const currentPath = ["", ...item].join("/") as ROUTE_PATH;
  return (
    <aside>
      <h1>
        <Link href="/">
          UI 요소 모음 <sub>mayrang</sub>
        </Link>
      </h1>
      <ul className="mainRoutes">
        {gnbRootList.map((r) => (
          <GnbItem route={r} currentPath={currentPath} key={r.key} />
        ))}
      </ul>
    </aside>
  );
}
