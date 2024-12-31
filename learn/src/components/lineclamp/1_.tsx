import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import { data } from "./data";
import { measureLines } from "@/service/utils";

const LineClampedText = ({ text }: { text: string }) => {
  const [isClamped, setIsClamped] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (text && textRef.current) {
      const lines = measureLines(textRef.current, text);

      setIsClamped(lines > 3);
    }
  }, [text]);

  return (
    <div className={cx("content")}>
      <div ref={textRef} className={cx("text", { clamped: isClamped })} style={{ WebkitLineClamp: 3 }}>
        {text}
      </div>
      {isClamped && <button className={cx("buttonMore")} onClick={() => setIsClamped(false)}></button>}
    </div>
  );
};

const LineClamp1 = () => {
  return (
    <>
      <h3>#1. canvas 활용</h3>
      {data.map((text, idx) => (
        <LineClampedText text={text} key={idx} />
      ))}
    </>
  );
};
export default LineClamp1;
