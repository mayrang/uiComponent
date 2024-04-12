import React from "react";
import VanillaWrapper from "../VanillaWrapper";

const initiator = (wrapper: HTMLDivElement) => {
  let state = false;

  const pElem = document.createElement("p");
  pElem.textContent = "꺼짐";

  const btnElement = document.createElement("button");
  btnElement.addEventListener("click", () => {
    state = !state;
    pElem.textContent = state ? "켜짐" : "꺼짐";
  });
  btnElement.textContent = "토글";

  const divElem = document.createElement("div");
  divElem.textContent = "테스트2 - 바닐라";
  divElem.append(btnElement, pElem);

  wrapper.insertAdjacentElement("beforeend", divElem);
};

export default function Vanilla() {
  return <VanillaWrapper initiator={initiator} />;
}
