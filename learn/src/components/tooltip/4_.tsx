import { useEffect, useRef } from "react";
import { cx } from "./cx";
import data from "./data";
import useStyleInView from "./useStyleInview";

const tooltipPosition = {
  top: "100%",
  bottom: 20,
  left: 0,
  right: 0,
};

const Tooltip = ({
  id,
  description,
  title,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const wrapperRef = useRef<HTMLDetailsElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const style = useStyleInView(wrapperRef, targetRef, tooltipPosition);

  return (
    <details ref={wrapperRef} data-id={id} className={cx("container")}>
      <summary>{title}</summary>
      <div ref={targetRef} style={style} className={cx("tooltip")}>
        {description}
      </div>
    </details>
  );
};

export default function Tooltip4() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      document.querySelectorAll("[data-id]").forEach((item) => {
        if (target.parentElement !== item) {
          item.removeAttribute("open");
        }
      });
    };
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <>
      <h3>#4. React viewport</h3>
      {data.map((item) => (
        <Tooltip {...item} key={item.id} />
      ))}
    </>
  );
}
