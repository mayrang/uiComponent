import { useEffect, useState } from "react";
import { cx } from "./cx";
import data from "./data";
import React from "react";
import SingleOpenContextProvider, { useSingleOpen } from "./SingleOpenContext";

const Tooltip = ({ id, title, description }: { id: string; title: string; description: string }) => {
  const [isOpen, setCurrentId] = useSingleOpen(id);
  console.log(isOpen);
  const handleClick = (e: React.MouseEvent) => {
    // 상위 엘리먼트로 이벤트 전파 방지
    e.stopPropagation();
    console.log(id);
    setCurrentId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const close = () => setCurrentId(null);
    if (isOpen) {
      window.addEventListener("click", close);
    }

    return () => window.removeEventListener("click", close);
  }, [isOpen, setCurrentId]);
  return (
    <div className={cx("container")}>
      <div onClick={handleClick} className={cx("trigger")}>
        {title}
      </div>
      {isOpen && (
        <div onClick={(e) => e.stopPropagation()} className={cx("tooltip")}>
          {description}
        </div>
      )}
    </div>
  );
};

export default function Tooltip2() {
  return (
    <>
      <h3>
        #2. React<sub>context</sub>
      </h3>
      <SingleOpenContextProvider>
        {data.map((item) => (
          <Tooltip key={item.id} {...item} />
        ))}
      </SingleOpenContextProvider>
    </>
  );
}
