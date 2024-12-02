import { useEffect } from "react";
import { cx } from "./cx";
import data from "./data";

const Tooltip = ({ id, description, title }: { id: string; title: string; description: string }) => {
  return (
    <details data-id={id} className={cx("container")}>
      <summary>{title}</summary>
      <div className={cx("tooltip")}>{description}</div>
    </details>
  );
};

export default function Tooltip3() {
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
      <h3>#3. html 만으로</h3>
      {data.map((item) => (
        <Tooltip {...item} key={item.id} />
      ))}
    </>
  );
}
