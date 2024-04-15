import React, { useState } from "react";
import cx from "./cx";
import data from "./data";
import VanillaWrapper from "../VanillaWrapper";

const itemBuilder = ({ id, title, description }: { id: string; title: string; description: string }) => {
  const $li = document.createElement("li");
  $li.classList.add(cx("item"), cx("item3"));
  const $tab = document.createElement("div");
  $tab.classList.add(cx("tab"));
  $tab.textContent = title;
  const $description = document.createElement("div");
  $description.classList.add(cx("description"));
  $description.textContent = description;

  $li.setAttribute("data-id", id);

  $li.append($tab, $description);

  return $li;

  // return (
  //   <li className={cx("item", "item3", { current })}>
  //     <div onClick={toggle} className={cx("tab")}>
  //       {title}
  //     </div>
  //     <div className={cx("description")}>{description}</div>
  //   </li>
  // );
};

const initiator = (wrapper: HTMLDivElement) => {
  let currentId = null as null | string;
  const $ul = document.createElement("ul");
  $ul.classList.add(cx("container"));
  const $items = data.map(itemBuilder);
  $ul.append(...$items);

  const clickToggle = (e: Event) => {
    const $el = e.target as HTMLDivElement;

    if (!$el.classList.contains(cx("tab"))) return;
    const targetId = $el.parentElement!.dataset.id;

    if (!targetId) return;
    currentId = targetId === currentId ? null : targetId;

    $items.forEach(($item) => {
      const id = $item.dataset.id;
      $item.classList.toggle(cx("current"), currentId === id);
    });
  };

  $ul.addEventListener("click", clickToggle);

  ($items[0].children[0] as HTMLDivElement).click();
  wrapper.append($ul);
};

export default function Accordions4() {
  return (
    <>
      <h3>#3. Vanilla</h3>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
