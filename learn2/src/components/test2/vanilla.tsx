import React from "react";
import VanillaWrapper from "../VanillaWrapper";

// wrpper div 받아서 안에서 로직 알아서 실행하고 최종적으로 wrapper에 랜더링
const initiator = (wrapper: HTMLDivElement) => {
  console.log(wrapper);
};

const Test2Vanilla = () => <VanillaWrapper initiator={initiator} />;

export default Test2Vanilla;
