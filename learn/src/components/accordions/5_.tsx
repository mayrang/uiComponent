import React, { useState } from "react";
import cx from "./cx";
import data from "./data";

const AccordionItem = ({
  id,
  title,
  description,
  initialChecked,
}: {
  id: string;
  title: string;
  description: string;
  initialChecked: boolean;
}) => {
  return (
    <li className={cx("item", "item5")}>
      <input type="radio" name="accordion" id={id} className={cx("input")} defaultChecked={initialChecked} />
      <label htmlFor={id} className={cx("tab")}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

export default function Accordions5() {
  return (
    <>
      <h3>
        #3. React <sub>html input</sub>
      </h3>
      <ul className={cx("container")}>
        {data.map(({ id, title, description }, i) => (
          <AccordionItem key={id} id={id} title={title} description={description} initialChecked={i === 0} />
        ))}
      </ul>
    </>
  );
}
