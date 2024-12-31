import VanillaWrapper from "@/components/VanillaWrapper";
import data from "../data";
import lazyLoad from "./lazyLoad";

const lazyImgBuilder = (src: string, width: number, height: number) => {
  const $img = document.createElement("img");
  $img.setAttribute("width", `${width}px`);
  $img.setAttribute("height", `${height}px`);

  lazyLoad($img, src);
  return $img;
};

const initiator = ($wrapper: HTMLDivElement) => {
  const $elems = data.map((src) => lazyImgBuilder(src, 600, 320));
  $wrapper.append(...$elems);
};

export default function LazyLoading2() {
  return (
    <>
      <h2>#2. javascript</h2>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
