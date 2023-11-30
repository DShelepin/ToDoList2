export function removeElementAfterAnimationPromise(element, cb) {
  return new Promise((res) => {
    const onAnimationEnd = () => {
      element.removeEventListener('animationend', onAnimationEnd);

      if (typeof cb === 'function') {
        cb();
      }

      element.remove();

      res();
    };

    element.addEventListener('animationend', onAnimationEnd);
  });
}
