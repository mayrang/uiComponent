import data from "./data";
import cx from "./cx";

const TabItem = ({
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
    <li className={cx("item")}>
      <input
        defaultChecked={initialChecked}
        type="radio"
        name="tabItem"
        className={cx("input")}
        id={id}
      />
      <label htmlFor={id} className={cx("tab")}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

export default function TabMenu5() {
  return (
    <>
      <h2>
        #3. React <sub> 하나의 트리 안에서 관리</sub>
      </h2>
      <div className={cx("container")}>
        <ul className={cx("tabList", "tabMenu5")}>
          {data.map((item, idx) => (
            <TabItem initialChecked={idx === 0} key={item.id} {...item} />
          ))}
        </ul>
      </div>
    </>
  );
}
