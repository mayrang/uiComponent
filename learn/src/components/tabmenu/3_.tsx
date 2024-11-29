import { useState } from "react";
import data from "./data";
import cx from "./cx";

const TabItem = ({
  id,
  title,
  description,
  current,
  toggle,
}: {
  id: string;
  title: string;
  description: string;
  current: boolean;
  toggle: () => void;
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

export default function TabMenu3() {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId(id);
  };

  return (
    <>
      <h2>
        #3. React <sub> 하나의 트리 안에서 관리</sub>
      </h2>
      <div className={cx("container")}>
        <ul className={cx("tabList", "tabMenu3")}>
          {data.map((item) => (
            <TabItem
              toggle={toggleItem(item.id)}
              key={item.id}
              current={currentId === item.id}
              {...item}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
