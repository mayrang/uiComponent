import React, { useState } from "react";
import cx from "./cx";
import data from "./data";

const TabItem = ({
  id,
  title,
  description,
  toggle,
  current,
}: {
  id: string;
  title: string;
  description: string;
  toggle: () => void;
  current: boolean;
}) => {
  return (
    <li className={cx("item", { current })}>
      <div onClick={toggle} className={cx("tab")}>
        {title}
      </div>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

export default function Tabmenu3() {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const toggle = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #3. React <sub>css animation</sub>
      </h3>
      <ul className={cx("container", "tabmenu3")}>
        {data.map(({ id, title, description }) => (
          <TabItem
            key={id}
            id={id}
            title={title}
            current={currentId === id}
            description={description}
            toggle={toggle(id)}
          />
        ))}
      </ul>
    </>
  );
}
