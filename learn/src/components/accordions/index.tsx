import React from "react";
import cx from "./cx";
import Accordions1 from "./1_";
import Accordions2 from "./2_";
import Accordions3 from "./3_";

export default function Accordions() {
  return (
    <div className={cx("Accordions")}>
      <h2>아코디언</h2>
      <Accordions1 />
      <Accordions2 />
      <Accordions3 />
    </div>
  );
}