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

const DescriptionItem = ({
  id,
  description,
  current,
}: {
  id: string;
  description: string;
  current: boolean;
}) => {
  return <div className={cx("description", { current })}>{description}</div>;
};

export default function TabMenu2() {
  const [currentId, setCurrentId] = useState(data[0].id);

  const toggleItem = (id: string) => () => [setCurrentId(id)];

  return (
    <>
      <h2>
        #2. React <sub>css로 show/hide</sub>
      </h2>
      <div className={cx("container", "tab2")}>
        <ul className={cx("tabList")}>
          {data.map((item) => (
            <TabItem
              key={item.id}
              {...item}
              current={currentId === item.id}
              toggle={toggleItem(item.id)}
            />
          ))}
        </ul>
        {data.map((item) => (
          <DescriptionItem
            key={item.id}
            {...item}
            current={item.id === currentId}
          />
        ))}
      </div>
    </>
  );
}
