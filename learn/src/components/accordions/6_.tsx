import React, { useEffect, useRef, useState } from "react";
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
  const divRef = useRef<HTMLDivElement | null>(null);
  console.log(title, current);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.addEventListener("beforematch", toggle);
    }
    return () => {
      divRef.current?.removeEventListener("beforematch", toggle);
    };
  }, [toggle]);
  return (
    <li className={cx("item", "item3", { current })}>
      <div onClick={toggle} className={cx("tab")}>
        {title}
      </div>
      <div
        className={cx("description")}
        ref={divRef}
        HIDDEN={current ? undefined : "until-found"}
      >
        {description}
      </div>
    </li>
  );
};

export default function Accordions6() {
  const [currentId, setCurrentId] = useState<string | null>(null);

  const toggle = (id: string) => () => {
    console.log(id);
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h3>
        #3. React <sub>ctrl + F</sub>
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
