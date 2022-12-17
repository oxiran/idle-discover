import { Options } from './interface';

export const defaultOptions: Options = {
  element: document,
  events: [
    'mousemove',
    'mousewheel',
    'mousedown',
    'wheel',
    'keydown',
    'DOMMouseScroll',
  ],
  timeout: 30 * 60 * 1000,
  delay: 200,
  loop: false,
};
