import { useCallback, useEffect, useRef, useState } from "react";
import cx from "./cx";
import data from "./data";
import useIntersectionObserverV2 from "../hooks/useIntersectionObserverV2";

type BoxItem = {
  id: string;
  imgUrl: string;
  description: string;
};

type Direction = "prev" | "next";

const Box = ({ id, imgUrl, description }: BoxItem) => {
  return (
    <div className={cx("item")}>
      <img src={imgUrl} alt={description} />
      <div>{description}</div>
    </div>
  );
};

const defaultButtonEnalbed = { prev: true, next: true };

const getVisibleEdgeItems = ($list: HTMLUListElement, $items: (HTMLLIElement | null)[]) => {
  const { left: ulLeft, right: ulRight } = $list.getBoundingClientRect();
  console.log($items);
  const isVisible = ($item: HTMLLIElement | null) => {
    const { left, right } = $item?.getBoundingClientRect() || { left: 0, right: 0 };
    console.log(left <= ulRight && right >= ulLeft, left, ulRight, right, ulLeft, $item);
    return left <= ulRight && right >= ulLeft;
  };

  const left = Math.max($items.findIndex(isVisible), 0);
  const right = Math.min($items.findLastIndex(isVisible), $items.length - 1);
  console.log(left, right);
  return { left: $items[left]!, right: $items[right]! };
};

export default function ScrollBox1() {
  const [buttonEnabled, setButtonEnabled] = useState<{ prev: boolean; next: boolean }>(defaultButtonEnalbed);
  const watchRef = useRef<(HTMLLIElement | null)[]>([]);
  const { entries: watcherEntires } = useIntersectionObserverV2(watchRef);
  const listRef = useRef<HTMLUListElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);
  console.log(itemsRef);
  useEffect(() => {
    if (!watcherEntires.length) {
      setButtonEnabled(defaultButtonEnalbed);
      return;
    }

    setButtonEnabled((prev) => {
      const newState = { ...defaultButtonEnalbed };
      watcherEntires.forEach((e) => {
        const direction = (e.target as HTMLLIElement).dataset.direction as Direction;
        newState[direction] = false;
      });
      return newState;
    });
  }, [watcherEntires]);
  const move = useCallback((direction: Direction) => {
    // ul의 scrollleft을 direction에 따라서 prev일때는 -scrollWidth / next일때는 +scrollWidth
    // 위 방식으로는 전부 보여지지 않는 항목들이 중간에 등장할 수 밖에 없음
    // 전부 보여지지 않는 아이템을 찾아서, 걔를 기준으로 스크롤 이동 -> scrollIntoView
    if (!itemsRef.current.length || !listRef.current) return;
    const elems = getVisibleEdgeItems(listRef.current, itemsRef.current);
    const elem = direction === "prev" ? elems.left : elems.right;
    console.log(elem);
    elem.scrollIntoView({
      inline: direction === "prev" ? "end" : "start",
      block: "nearest",
      behavior: "smooth",
    });
  }, []);
  return (
    <div className={cx("scrollbox")}>
      <ul ref={listRef} className={cx("list")}>
        <li
          data-direction="prev"
          className={cx("observer")}
          ref={(r) => {
            watchRef.current[0] = r;
          }}
        />
        {data.map((item, i) => (
          <li
            key={item.id}
            ref={(r) => {
              itemsRef.current[i] = r;
            }}
          >
            <Box {...item} />
          </li>
        ))}
        <li
          data-direction="next"
          className={cx("observer")}
          ref={(r) => {
            watchRef.current[1] = r;
          }}
        />
      </ul>
      <button className={cx("button", "prev", { on: buttonEnabled.prev })} onClick={() => move("prev")} />
      <button className={cx("button", "next", { on: buttonEnabled.next })} onClick={() => move("next")} />
    </div>
  );
}
