import { useState } from "react";
import data from "./data";
import cx from "./cx";

const TabItem = ({
  id,
  title,
  current,
  toggle,
}: {
  id: string;
  title: string;
  current: boolean;
  toggle: () => void;
}) => {
  return (
    <li onClick={toggle} className={cx("tab", { current })}>
      {title}
    </li>
  );
};

export default function TabMenu1() {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId(id);
  };

  const descriptioin =
    data.find((item) => item.id === currentId)?.description || "";
  return (
    <>
      <h2>
        #1. React <sub>렌더링</sub>
      </h2>
      <div className={cx("container")}>
        <ul className={cx("tabList")}>
          {data.map((item) => (
            <TabItem
              toggle={toggleItem(item.id)}
              current={item.id === currentId}
              key={item.id}
              {...item}
            />
          ))}
        </ul>
        <div className={cx("description")}>{descriptioin}</div>
      </div>
    </>
  );
}
