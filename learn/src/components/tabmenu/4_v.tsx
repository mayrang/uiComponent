import VanillaWrapper from "../VanillaWrapper";
import cx from "./cx";
import data from "./data";

const tabBuilder = ({ id, title }: { id: string; title: string }) => {
  const $li = document.createElement("li");
  $li.classList.add(cx("tab"));
  $li.textContent = title;
  $li.setAttribute("data-id", id);
  return $li;
};

const descBuilder = ({
  id,
  description,
}: {
  id: string;
  description: string;
}) => {
  const $div = document.createElement("div");
  $div.classList.add(cx("description"));
  $div.textContent = description;
  $div.setAttribute("data-id", id);
  return $div;
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId = data[0].id;
  const $h2 = document.createElement("h2");

  $h2.textContent = "#4. Vanilla javascript";
  const $container = document.createElement("div");

  const $tabUl = document.createElement(cx("ul"));
  $container.classList.add(cx("container"), cx("tab2"));
  $tabUl.classList.add(cx("tabList"));

  const $tabs = data.map(tabBuilder);
  const $descriptions = data.map(descBuilder);
  $tabUl.append(...$tabs);
  $container.append($h2, $tabUl, ...$descriptions);

  const handleTabClick = (e: Event) => {
    const target = e.target as HTMLElement;
    console.log("target", target.dataset.id);
    const targetId = target.dataset.id;
    if (!targetId) return;
    currentId = targetId;
    $tabs.forEach(($item, idx) => {
      $item.classList.toggle(cx("current"), currentId === $item.dataset.id);
      $descriptions[idx].classList.toggle(
        cx("current"),
        currentId === $descriptions[idx].dataset.id
      );
    });
  };

  $tabUl.addEventListener("click", handleTabClick);
  $tabs[0].click();
  wrapper.append($container);
};

export default function TabMenu4() {
  return <VanillaWrapper initiator={initiator} />;
}
