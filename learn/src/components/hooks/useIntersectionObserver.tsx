import { RefObject, useEffect, useRef, useState } from "react";

type Elem = HTMLElement | null;

export default function useIntersectionObserver(elem: RefObject<Elem>, options: IntersectionObserverInit) {
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([]);
  const observerRef = useRef<IntersectionObserver>();
  useEffect(() => {
    if (!elem.current) return;
    observerRef.current = new IntersectionObserver(setEntries, options);
    observerRef.current.observe(elem.current);
    return () => {
      observerRef.current?.disconnect();
    };
  }, [elem.current, options]);

  return {
    entries,
    observerRef,
  };
}
