import { useState } from "react";
import data from "./data";
import cx from "./cx";

const AccordionItem = ({
  id,
  title,
  description,
  current,
  onClick,
}: {
  id: string;
  title: string;
  description: string;
  current: boolean;
  onClick: () => void;
}) => {
  return (
    <li className={cx("item3", "item", { current })}>
      <div className={cx("tab")} onClick={onClick}>
        {title}
      </div>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

export default function Accordion3() {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId(id);
  };
  return (
    <div>
      <h1>
        #3. React <sub>css transition</sub>
      </h1>
      <ul className={cx("container")}>
        {data.map((item) => (
          <AccordionItem
            key={item.id}
            current={currentId === item.id}
            onClick={toggleItem(item.id)}
            {...item}
          />
        ))}
      </ul>
    </div>
  );
}
