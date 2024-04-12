import React from "react";
import VanillaWrapper from "../VanillaWrapper";

const initiator = (wrapper: HTMLDivElement) => {};

export default function vanilla() {
  return <VanillaWrapper initiator={initiator} />;
}
