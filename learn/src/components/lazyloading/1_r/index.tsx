import React, { useEffect, useRef, useState } from "react";
import cx from "../cx";
import data from "../data";
import useIntersectionObserver from "@/components/hooks/useIntersectionObserver";

const intersectOptions: IntersectionObserverInit = {
  threshold: 0,
};

const LazyLoadingImg = ({ src, width, height }: { src: string; width: number; height: number }) => {
  const [isLazy, setIsLazy] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const { entries, observerRef } = useIntersectionObserver(imageRef, intersectOptions);

  const onLoad = () => {
    setIsLazy(true);
  };
  useEffect(() => {
    if ("loading" in HTMLImageElement.prototype) {
      imageRef.current!.setAttribute("loading", "lazy");
      imageRef.current!.setAttribute("src", src);

      observerRef.current?.disconnect();
      return;
    }

    const isIntersecting = entries[0]?.isIntersecting;
    console.log(src, isIntersecting);
    if (isIntersecting && imageRef.current) {
      imageRef.current.setAttribute("src", src);

      observerRef.current?.disconnect();
    }
  }, [entries, observerRef]);
  return <img alt="" ref={imageRef} width={width} height={height} className={cx({ lazy: !isLazy })} onLoad={onLoad} />;
};

export default function LazyLoading1() {
  return (
    <div className={cx("LazyLoading")}>
      <h3>
        지연 로딩<sub>react</sub>
      </h3>
      {data.map((src, index) => (
        <LazyLoadingImg key={index} src={src} width={640} height={320} />
      ))}
    </div>
  );
}
