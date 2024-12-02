import { useEffect, useState } from "react";
import { cx } from "./cx";
import data from "./data";
import React from "react";

const Tooltip = ({ id, title, description }: { id: string; title: string; description: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    // 상위 엘리먼트로 이벤트 전파 방지
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const close = () => setIsOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  });
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

export default function Tooltip1() {
  return (
    <>
      <h3>#1. React</h3>
      {data.map((item) => (
        <Tooltip key={item.id} {...item} />
      ))}
    </>
  );
}
