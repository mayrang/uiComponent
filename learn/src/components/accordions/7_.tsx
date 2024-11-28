import { useEffect, useRef } from "react";
import cx from "./cx";
import data from "./data";

const AccordionItem = ({
  id,
  title,
  description,
  initialOpen,
}: {
  id: string;
  title: string;
  description: string;
  initialOpen: boolean;
}) => {
  const itemRef = useRef<HTMLDetailsElement | null>(null);

  useEffect(() => {
    // open을 반환
    const open = () => itemRef?.current?.open;

    if (itemRef.current) {
      // 이게 결국 그럼 ctrl + F 를 통해서 열어주는 역할은 아래 이벤트 리스너가 하는거네
      itemRef.current.addEventListener("beforematch", open);
    }

    return () => {
      if (itemRef.current) {
        itemRef.current.removeEventListener("beforematch", open);
      }
    };
  }, [initialOpen]);

  return (
    <details
      open={initialOpen}
      ref={itemRef}
      // 하나만 열수 있게 그룹핑해주는것
      NAME={"item"}
      className={cx("item", "item7")}
    >
      <summary className={cx("tab")}>{title}</summary>
      <div className={cx("description")}>{description}</div>
    </details>
  );
};

export default function Accordion7() {
  return (
    <>
      <h2>
        #7. React <sub>details summary</sub>
      </h2>
      <ul className={cx("container")}>
        {data.map((item, idx) => (
          <AccordionItem key={item.id} {...item} initialOpen={idx === 0} />
        ))}
      </ul>
    </>
  );
}
