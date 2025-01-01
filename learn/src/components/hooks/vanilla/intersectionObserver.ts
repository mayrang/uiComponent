export default function intersectionObserver(
  $elem: HTMLElement,
  options: IntersectionObserverInit,
  callback: (entries: IntersectionObserverEntry[]) => void
) {
  if (!$elem) return;
  console.log(123);
  const observer = new IntersectionObserver(callback, options);
  observer.observe($elem);

  return observer;
}
