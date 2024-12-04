import VanillaWrapper from "../VanillaWrapper";
import { cx } from "./cx";
import data from "./data";

const initiator = (elem: HTMLDivElement) => {
  const $tooltips = data.map(({ id, description, title }) => {
    const $details = document.createElement("details");
    $details.setAttribute("data-id", id);
    $details.classList.add(cx("container"));

    const $summary = document.createElement("summary");
    $summary.textContent = title;

    const $tooltip = document.createElement("div");
    $tooltip.classList.add(cx("tooltip"));
    $tooltip.textContent = description;

    $details.append($summary, $tooltip);
    return $details;
  });

  const handleClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;

    document.querySelectorAll("[data-id").forEach((item) => {
      if (target.parentElement != item) {
        item.removeAttribute("open");
      }
    });
  };

  window.addEventListener("click", handleClick);

  elem.append(...$tooltips);
};

const Tooltip5 = () => <VanillaWrapper initiator={initiator} />;

export default Tooltip5;
