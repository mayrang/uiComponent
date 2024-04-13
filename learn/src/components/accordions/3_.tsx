import React, { useState } from "react";
import cx from "./cx";
import data from "./data";

const AccordionItem = ({
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
    <li className={cx("item", "item3", { current })}>
      <div onClick={toggle} className={cx("tab")}>
        {title}
      </div>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

export default function Accordions3() {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const toggle = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #3. React <sub>css animation</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }) => (
          <AccordionItem
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
