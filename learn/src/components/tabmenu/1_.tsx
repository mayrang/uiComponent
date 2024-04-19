import React, { useState } from "react";
import cx from "./cx";
import data from "./data";

const TabItem = ({
  id,
  title,

  toggle,
  current,
}: {
  id: string;
  title: string;

  toggle: () => void;
  current: boolean;
}) => {
  return (
    <li className={cx("tab", { current })} onClick={toggle}>
      {title}
    </li>
  );
};

export default function TabMenu1() {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const toggle = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  const currentData = data.find((item) => item.id === currentId)?.description;
  return (
    <>
      <h3>
        #1. React <sub>html로 DESCRIPTION 보이게하기</sub>
      </h3>
      <div className={cx("container")}>
        <ul className={cx("tabList")}>
          {data.map(({ id, title, description }) => (
            <TabItem key={id} id={id} title={title} current={currentId === id} toggle={toggle(id)} />
          ))}
        </ul>
        <div className={cx("description")}>{currentData ?? ""}</div>
      </div>
    </>
  );
}
