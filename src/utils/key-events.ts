type keyEventFn = () => void;

export const listenKeyUp = (key: string, fn: keyEventFn) => {
  window.addEventListener('keyup', (event) => {
    if (event.key === key) {
      fn();
      event.preventDefault();
    }
  });
  return () => window.removeEventListener('keyup', fn);
};
export const listenKeyDown = (key: string, fn: keyEventFn) => {
  window.addEventListener('keydown', (event) => {
    if (event.key === key) {
      fn();
      event.preventDefault();
    }
  });
  return () => window.removeEventListener('keydown', fn);
};
