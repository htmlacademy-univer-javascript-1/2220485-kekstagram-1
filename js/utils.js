import { TIMEOUT_DELAY } from './consts.js';

const isEscapeKey = (evt) => evt.key === 'Escape';

const checkStringLength = (string, length) => string.length <= length;

const shuffleArray = (arr) => arr.map((a) => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);

function debounce (callback, timeoutDelay = TIMEOUT_DELAY) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

function throttle (callback, delayBetweenFrames) {
  let lastTime = 0;

  return (...rest) => {
    const now = new Date();

    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
}

export { isEscapeKey, checkStringLength, shuffleArray, debounce, throttle};
