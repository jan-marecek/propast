export const formatDuration = (s: number) => {
  if (s < 0) s = -s;
  const time = {
    day: Math.floor(s / 86400),
    hour: Math.floor(s / 3600) % 24,
    minute: Math.floor(s / 60) % 60,
    second: Math.floor(s) % 60,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val]) => `${val} ${key}${val !== 1 ? "s" : ""}`)
    .join(", ");
};

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat(navigator.language || "en-gb").format(date);
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function checkOverflowX(el: HTMLElement) {
  return el.clientWidth < el.scrollWidth;
}

export function debounce(func: () => void, delay: number) {
  let timer: NodeJS.Timeout;

  return function (...args: []) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

export function throttle(func: () => void, delay: number) {
  let timer: NodeJS.Timeout | null = null;

  return function (...args: []) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    if (timer == null) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, delay);
    }
  };
}

export function clickOutside(
  node: HTMLElement,
  handler: (event: MouseEvent) => void,
): { destroy: () => void } {
  const onClick = (event: MouseEvent) =>
    node &&
    !node.contains(event.target as HTMLElement) &&
    !event.defaultPrevented &&
    handler(event);

  document.addEventListener("click", onClick, true);

  return {
    destroy() {
      document.removeEventListener("click", onClick, true);
    },
  };
}
