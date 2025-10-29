export const debounce = (func, delay = 200) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

export const throttle = (func, limit = 1000) => {
  let inThrottle;
  let lastFn;

  return function throttled(...args) {
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastFn) {
          lastFn.apply(context, args);
          lastFn = null;
        }
      }, limit);
    } else {
      lastFn = function () {
        func.apply(context, args);
      };
    }
  };
};

export function isAndroid() {
  return (
    (!!navigator.userAgent && /android/i.test(navigator.userAgent)) ||
    /android/i.test(navigator.platform)
  );
}

/** Determines whether the device is in portrait mode */
export function isPortrait() {
  return (
    window.matchMedia("(orientation: portrait)").matches ||
    // Additional check since it's considered as the landscape on keyboard openning (on Android)
    (isAndroid() && window.screen.width < window.screen.height)
  );
}
