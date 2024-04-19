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

export default function TabMenu2() {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const toggle = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      <h3>
        #1. React <sub>다 해놓고 css hidden/block으로 보이게 하기</sub>
      </h3>
      <div className={cx("container", "tabmenu2")}>
        <ul className={cx("tabList")}>
          {data.map(({ id, title, description }) => (
            <TabItem key={id} id={id} title={title} current={currentId === id} toggle={toggle(id)} />
          ))}
        </ul>
        {data.map((item) => (
          <div className={cx("description", { current: item.id === currentId })}>{item.description}</div>
        ))}
      </div>
    </>
  );
}
