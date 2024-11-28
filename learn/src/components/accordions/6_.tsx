import { useEffect, useRef, useState } from "react";
import data from "./data";
import cx from "./cx";

const AccordionItem = ({
  id,
  title,
  description,
  toggle,
  current,
}: {
  id: string;
  description: string;
  title: string;
  toggle: () => void;
  current: boolean;
}) => {
  const descRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (descRef.current) {
      descRef.current.addEventListener("beforematch", () => {
        toggle();
      });
    }
    return () => {
      if (descRef.current)
        descRef.current.removeEventListener("beforematch", toggle);
    };
  }, [toggle]);
  return (
    <li className={cx("item", "item3", { current })}>
      <div className={cx("tab")} onClick={toggle}>
        {title}
      </div>
      <div
        className={cx("description")}
        ref={descRef}
        // beforematch 사용하려면 이렇게 해야하나봄
        // 접근성 관련 태그로 요소를 찾을 때까지 숨기는 역할을 한다고 함
        HIDDEN={current ? undefined : "until-found"}
      >
        {description}
      </div>
    </li>
  );
};

export default function Accordion6() {
  const [currentId, setCurrentId] = useState<null | string>(data[0].id);

  const toggleItem = (id: string) => () => {
    setCurrentId((prev) => (prev === id ? null : id));
  };
  return (
    <>
      <h2>
        #6. React<sub>ctrl + f로 검색 가능하게</sub>
      </h2>
      <ul className={cx("container")}>
        {data.map((item) => (
          <AccordionItem
            current={item.id === currentId}
            toggle={toggleItem(item.id)}
            {...item}
            key={item.id}
          />
        ))}
      </ul>
    </>
  );
}
