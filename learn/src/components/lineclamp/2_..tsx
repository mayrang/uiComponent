import { useEffect, useRef, useState } from "react";
import cx from "./cx";
import { data } from "./data";
import { measureLines } from "@/service/utils";

const LineClampedText = ({ text }: { text: string }) => {
  const [isClamped, setIsClamped] = useState(true);
  const textRef = useRef<HTMLDivElement>(null);
  const cloneRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (textRef.current && cloneRef.current) {
      console.log(Math.floor(cloneRef.current.offsetHeight / parseInt(getComputedStyle(textRef.current).lineHeight)));
      setIsClamped(
        Math.floor(cloneRef.current.offsetHeight / parseInt(getComputedStyle(textRef.current).lineHeight)) > 3
      );
    }
  }, []);

  return (
    <div className={cx("content")}>
      <div ref={cloneRef} className={cx("text-clone")}>
        {text}
      </div>
      <div ref={textRef} className={cx("text", { clamped: isClamped })} style={{ WebkitLineClamp: 3 }}>
        {text}
      </div>
      {isClamped && <button className={cx("buttonMore")} onClick={() => setIsClamped(false)}></button>}
    </div>
  );
};

const LineClamp2 = () => {
  return (
    <>
      <h3>#1. clone 활용</h3>
      {data.map((text, idx) => (
        <LineClampedText text={text} key={idx} />
      ))}
    </>
  );
};
export default LineClamp2;
