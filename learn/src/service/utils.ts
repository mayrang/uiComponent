export const measureLines = (elem: HTMLTextAreaElement, val: string) => {
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
  const compStyles = window.getComputedStyle(elem);
  canvasContext.font = `${compStyles.getPropertyValue(
    "font-size"
  )} ${compStyles.getPropertyValue("font-family")}`;

  const lines = val.split("\n").reduce((r, c) => {
    return (
      r +
      Math.max(
        Math.ceil(canvasContext.measureText(val).width / elem.offsetWidth),
        1
      )
    );
  }, 0);
  return lines;
};
