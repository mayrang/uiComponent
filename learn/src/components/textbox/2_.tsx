import { ChangeEvent, useEffect, useRef, useState } from "react";
import { cx } from "./cx";
import { measureLines } from "@/service/utils";

export default function Textbox2() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = () => {
    const elem = textareaRef.current;
    if (!elem) return;
    console.log("check");
    elem.rows = Math.min(Math.max(measureLines(elem, elem.value), 3), 15);
  };

  return (
    <>
      <h3>#2. 비제어 컴포넌트 canvas</h3>
      <div className={cx("container")}>
        <textarea
          className={cx("textbox")}
          onChange={handleChange}
          ref={textareaRef}
          rows={3}
        />
      </div>
    </>
  );
}
