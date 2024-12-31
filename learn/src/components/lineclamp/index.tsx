import React from "react";
import cx from "./cx";
import LineClamp1 from "./1_";
import LineClamp2 from "./2_.";
import LineClamp3 from "./3_";

export default function LineClamp() {
  return (
    <div className={cx("LineClamps")}>
      <h2>여러 줄 말줄임</h2>
      <LineClamp1 />
      <LineClamp2 />
      <LineClamp3 />
    </div>
  );
}
