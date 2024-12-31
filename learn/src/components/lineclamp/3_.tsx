import VanillaWrapper from "../VanillaWrapper";
import cx from "./cx";
import { data } from "./data";

const lineClmapedTextBuilder = (text: string, wrapper: HTMLDivElement) => {
  let isClamped = true;

  const toggleClamped = (e: Event | null, force?: boolean) => {
    isClamped = typeof force === "boolean" ? force : !isClamped;

    if (isClamped) $content.append($btn);
    else $btn.remove();
  };

  const $content = document.createElement("div");
  $content.classList.add(cx("content"));

  const $text = document.createElement("div");
  $text.classList.add(cx("text"));
  $text.textContent = text;
  $text.classList.toggle(cx("clamped"), isClamped);
  $text.style.webkitLineClamp = "3";

  const $clone = document.createElement("div");
  $clone.classList.add(cx("text-clone"));
  $clone.textContent = text;

  const $btn = document.createElement("button");
  $btn.addEventListener("click", toggleClamped, { once: true });
  $btn.classList.add(cx("buttonMore"));

  function handleMutate() {
    const isClampLine = Math.floor($clone.offsetHeight / parseInt(getComputedStyle($text).lineHeight)) > 3;
    toggleClamped(null, isClampLine);
  }

  const mutation = new MutationObserver(() => {
    if (wrapper.contains($content)) {
      handleMutate();
      mutation.disconnect();
    }
  });

  mutation.observe(wrapper, {
    subtree: true,
    childList: true,
  });

  $content.append($text, $clone);
  return $content;
};

const initiator = (wrapper: HTMLDivElement) => {
  const $elems = data.map((text) => lineClmapedTextBuilder(text, wrapper));
  console.log($elems);
  wrapper.append(...$elems);
};

export default function LineClamp3() {
  return (
    <>
      <h2>#3. javascript</h2>
      <VanillaWrapper initiator={initiator} />
    </>
  );
}
