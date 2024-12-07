import { ChangeEvent, useEffect, useRef, useState } from "react";
import { cx } from "./cx";
import { measureLines } from "@/service/utils";

export default function Textbox3() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cloneRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = () => {
    const elem = textareaRef.current;
    const cloneElem = cloneRef.current;
    if (!elem || !cloneElem) return;
    cloneElem.value = elem.value;

    elem.rows = Math.min(
      Math.max(Math.floor(cloneElem.scrollHeight / cloneElem.clientHeight), 3),
      15
    );
  };

  return (
    <>
      <h3>#3. 비제어 컴포넌트 none canvas</h3>
      <div className={cx("container")}>
        <textarea className={cx("clone")} readOnly ref={cloneRef} rows={1} />
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
