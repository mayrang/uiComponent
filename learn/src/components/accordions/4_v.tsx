import VanillaWrapper from "../VanillaWrapper";
import cx from "./cx";
import data from "./data";

const itemBuilder = ({
  id,
  title,
  description,
}: {
  id: string;
  title: string;
  description: string;
}) => {
  const $li = document.createElement("li");
  $li.setAttribute("data-id", id);
  $li.classList.add(cx("item"), cx("item3"));

  const $tab = document.createElement("div");
  $tab.classList.add(cx("tab"));
  $tab.textContent = title;

  const $description = document.createElement("div");
  $description.classList.add(cx("description"));
  $description.textContent = description;

  $li.append($tab, $description);

  return $li;
};

const initiator = (ref: HTMLDivElement) => {
  let currentId: string | null = null;
  const $ul = document.createElement("ul");
  const $div = document.createElement("div");
  const $h2 = document.createElement("h2");
  const $sub = document.createElement("sub");
  $h2.textContent = "#4 React";
  $sub.textContent = "vanilla javascript";
  $h2.appendChild($sub);
  $div.append($h2, $ul);
  $ul.classList.add(cx("container"));

  const $items = data.map(itemBuilder) as HTMLLIElement[];

  $ul.addEventListener("click", (e: Event) => {
    const $target = e.target as HTMLElement;
    const id = $target.parentElement?.dataset.id;
    if (!id) return;

    currentId = currentId === id ? null : id;

    $items.forEach((item) => {
      item.classList.toggle(cx("current"), currentId === item.dataset.id);
    });
  });

  $ul.append(...$items);
  ($items[0].children[0] as HTMLDivElement).click();
  ref.append($div);
};

export default function Accordion4() {
  return <VanillaWrapper initiator={initiator} />;
}
