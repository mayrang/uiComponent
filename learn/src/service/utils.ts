export const measureLines = (elem: HTMLElement, val: string) => {
  const canvas = document.createElement("canvas");
  const canvasContext = canvas.getContext("2d") as CanvasRenderingContext2D;
  const compStyles = window.getComputedStyle(elem);
  canvasContext.font = `${compStyles.getPropertyValue("font-size")} ${compStyles.getPropertyValue("font-family")}`;

  const lines = val.split("\n").reduce((r, c) => {
    return r + Math.max(Math.ceil(canvasContext.measureText(val).width / elem.offsetWidth), 1);
  }, 0);
  return lines;
};

export const randomize = ({ min = 0, max = 0, step = 1 }: { min: number; max: number; step: number }) => {
  if (max < min || max - min < step) throw new Error("wrong value");

  const randomValue = Math.random() * (max - min) + min;
  return Math.round(randomValue / step) * step;
};

export const pickRandom = <T>({ data = [], length = 1 }: { data: T[]; length: number }) => {
  const randomData = [...data].sort(() => (Math.random() > 0.5 ? 1 : -1));
  return randomData.slice(0, length);
};

export const waitFor = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
