export default function intersectionObserver(
  $elem: HTMLImageElement,
  options: IntersectionObserverInit,
  callback: (entries: IntersectionObserverEntry[]) => void
) {
  if (!$elem) return;
  const observer = new IntersectionObserver(callback, options);
  observer.observe($elem);

  return observer;
}
