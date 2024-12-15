import { ChangeEvent, useState } from "react";
import { cx } from "./cx";
import { measureLines } from "@/service/utils";

export default function Textbox1() {
  const [value, setValue] = useState("");
  const [lines, setLines] = useState(3);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const elem = e.target as HTMLTextAreaElement;
    const lines = Math.min(Math.max(measureLines(elem, e.target.value), 3), 15);
    setLines(lines);
    setValue(e.target.value);
  };

  return (
    <>
      <h3>#1. 제어 컴포넌트 canvas</h3>
      <div className={cx("container")}>
        <textarea
          className={cx("textbox")}
          onChange={handleChange}
          rows={lines}
          value={value}
        />
      </div>
    </>
  );
}
