import intersectionObserver from "@/components/hooks/vanilla/intersectionObserver";

export default function lazyLoad($elem: HTMLImageElement, src: string) {
  const handleCallback = (entires: IntersectionObserverEntry[]) => {
    entires.forEach((entry) => {
      if (entry?.isIntersecting) {
        $elem.setAttribute("src", src);
        observer?.disconnect();
      }
    });
  };
  const observer = intersectionObserver($elem, { threshold: 0 }, handleCallback);
}
