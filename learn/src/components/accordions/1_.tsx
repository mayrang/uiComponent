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
    <li className={cx("item")}>
      <div onClick={toggle} className={cx("tab")}>
        {title}
      </div>
      {current && <div className={cx("description")}>{description}</div>}
    </li>
  );
};

const Accordion = () => {
  const [currentId, setCurrentId] = useState<null | string>(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h2>#1. React</h2>
      <div className={cx("Accordions")}>
        <ul className={cx("container")}>
          {data.map((item) => (
            <AccordionItem
              current={item.id === currentId}
              {...item}
              toggle={toggleItem(item.id)}
              key={item.id}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Accordion;
