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
    <li className={cx("item5", "item")}>
      <input
        className={cx("input")}
        type="radio"
        name="radioCheck"
        id={id}
        defaultChecked={initialChecked}
      />
      <label htmlFor={id} className={cx("tab")}>
        {title}
      </label>
      <div className={cx("description")}>{description}</div>
    </li>
  );
};

export default function Accordion5() {
  return (
    <div>
      <h2>
        #5. React<sub>html input radio</sub>
      </h2>
      <ul className={cx("container")}>
        {data.map((item, idx) => (
          <AccordionItem key={item.id} initialChecked={idx === 0} {...item} />
        ))}
      </ul>
    </div>
  );
}
