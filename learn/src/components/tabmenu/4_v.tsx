import React from "react";
import VanillaWrapper from "../VanillaWrapper";
import cx from "./cx";
import data from "./data";

const itemBuilder = ({ id, title }: { id: string; title: string }) => {
  const $li = document.createElement("li");
  $li.classList.add(cx("tab"));
  $li.textContent = title;
  $li.setAttribute("data-id", id);

  return $li;
  // return (
  //   <li className={cx("tab", { current })} onClick={toggle}>
  //     {title}
  //   </li>
  // );
};

const descriptionBuilder = ({ id, description }: { id: string; description: string }) => {
  const $div = document.createElement("div");
  $div.classList.add(cx("description"));
  $div.textContent = description;
  $div.setAttribute("data-id", id);

  return $div;
};
const initiator = (wrapper: HTMLDivElement) => {
  let currentId = data[0].id;
  const $container = document.createElement("div");
  $container.classList.add(cx("container"), cx("tabmenu2"));
  console.log($container);
  const $ul = document.createElement("ul");
  $ul.classList.add(cx("tabList"));
  const $data = data.map(itemBuilder);
  const $description = data.map(descriptionBuilder);

  $ul.append(...$data);
  $container.append($ul, ...$description);
  const clickToggle = (e: Event) => {
    const $el = e.target as HTMLDivElement;

    if (!$el.classList.contains(cx("tab"))) return;
    const targetId = $el.dataset.id;

    if (!targetId) return;
    currentId = targetId;

    $data.forEach(($item, i) => {
      const id = $item.dataset.id;
      $item.classList.toggle(cx("current"), currentId === id);
      $description[i].classList.toggle(cx("current"), currentId === id);
    });
  };

  $ul.addEventListener("click", clickToggle);
  $data[3].click();
  wrapper.append($container);
};

export default function TabMenu4() {
  return (
    <>
      <h3>#3. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
