import { measureLines } from "@/service/utils";
import VanillaWrapper from "../VanillaWrapper";
import { cx } from "./cx";

const initiator = (elem: HTMLDivElement) => {
  const $h2 = document.createElement("h2");

  $h2.textContent = "#4. Vanilla javascript";
  const $container = document.createElement("div");
  $container.classList.add(cx("container"));

  const $textarea = document.createElement("textarea");
  $textarea.classList.add(cx("textbox"));
  $textarea.rows = 3;
  const handleChange = () => {
    const rows = Math.min(
      Math.max(measureLines($textarea, $textarea.value), 3),
      15
    );
    console.log(rows);
    $textarea.rows = rows;
  };
  $textarea.addEventListener("input", handleChange);
  $container.append($textarea);
  elem.append($h2, $container);
};

export default function Textbox4() {
  return <VanillaWrapper initiator={initiator} />;
}
