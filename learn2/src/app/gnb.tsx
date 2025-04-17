"use client";
import {
  ChildRoute,
  gnbRootList,
  isParentRoute,
  ParentRoute,
  ROUTE,
  ROUTE_PATH,
  routes,
} from "@/routes";
import classNames from "classnames";
import Link from "next/link";
import { useParams } from "next/navigation";

// 자식요소는 스트링배열이니까 접근가능하도록 처리
// item- 이건 애니메이션을 처리할 때 높이를 지정해줘야 애니메이션이 덜컹거리지 않음
const ParentGnbItem = ({
  route: { name, link, children },
  currentPath,
}: {
  route: ParentRoute;
  currentPath: ROUTE_PATH;
}) => {
  const open = children.includes(currentPath);
  return (
    <li className={classNames("parent", `item-${children.length}`, { open })}>
      <Link href={link}>{name}</Link>
      <ul className="subRoutes">
        {children.map((r) => {
          const route = routes[r];
          return (
            <GnbItem
              currentPath={currentPath}
              route={route}
              key={route.key}
            ></GnbItem>
          );
        })}
      </ul>
    </li>
  );
};

const ChildGnbItem = ({
  route: { name, link },
  currentPath,
}: {
  route: ChildRoute;
  currentPath: ROUTE_PATH;
}) => {
  return (
    <li className={classNames({ active: currentPath === link })}>
      <Link href={link}>{name}</Link>
    </li>
  );
};

// is 타입 때문에 route의 타입 단언이 가능해지는 것
const GnbItem = ({
  route,
  currentPath,
}: {
  route: ROUTE;
  currentPath: ROUTE_PATH;
}) => {
  if (isParentRoute(route))
    return <ParentGnbItem route={route} currentPath={currentPath} />;
  return <ChildGnbItem route={route} currentPath={currentPath} />;
};

const Gnb = () => {
  const { items = [] } = useParams();
  const currentpath = ["", ...items].join("/") as ROUTE_PATH;
  return (
    <aside>
      <h1>
        UI 요소 모음 <sub>mayang</sub>
      </h1>
      <ul className="mainRoutes">
        {gnbRootList.map((r) => (
          <GnbItem route={r} currentPath={currentpath} key={r.key} />
        ))}
      </ul>
    </aside>
  );
};

export default Gnb;
