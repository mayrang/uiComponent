import { RefObject, useEffect, useRef, useState } from "react";

type Elem = HTMLElement | null;

const DefaultOptions: IntersectionObserverInit = { threshold: 0 };

export default function useIntersectionObserverV2(
  elem: RefObject<Elem | Elem[]>,
  options: IntersectionObserverInit = DefaultOptions
) {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observerRef = useRef<IntersectionObserver>();
  useEffect(() => {
    if (!elem.current) return;

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      // 여러개를 트리거 시키면 처음에 다 entry가 나오고
      // 그 뒤에는 변경되는 elem만 entry 배열이 나옴
      // true인 부분들만 추출하는 방법 필요
      setEntries((prev) => {
        // entries: 새로 변경된 내용
        // prev: 기존 entries
        // 위 둘을 조합해서 새로운 newEntries
        // elem1: entry
        // elem2: entry...
        return Array.from(new Map(prev.concat(entries).map((e) => [e.target, e])).values()).filter(
          (i) => i.isIntersecting
        );
      });
    };
    observerRef.current = new IntersectionObserver(handleIntersect, options);
    if (Array.isArray(elem.current)) elem.current.forEach((n) => observerRef.current?.observe(n!));
    else observerRef.current.observe(elem.current);
    return () => {
      observerRef.current?.disconnect();
    };
  }, [elem.current, options]);

  return {
    entries,
    observerRef,
  };
}
