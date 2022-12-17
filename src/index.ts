
import { getDataType, throttle } from '@oxiran/utils';
import { Options } from './interface';
import { defaultOptions } from './options';

class IdleDiscover {
  protected element: HTMLElement | Document;

  protected events: string[];

  protected timeout: number;

  protected delay: number;

  protected timeouted = false;

  protected timer: number | null = null;

  protected loop: boolean;

  protected eventHandler: () => void;

  protected callback: () => void;

  protected constructor(options: Options) {
    const finalOptions = defaultOptions;

    if (options && getDataType(options) === 'Object') {
      Object.assign(finalOptions, options);
    }

    this.element = finalOptions.element;
    this.timeout = finalOptions.timeout;
    this.events = finalOptions.events;
    this.delay = finalOptions.delay;
    this.loop = finalOptions.loop;

    this.eventHandler = throttle(() => {
      if (this.timeouted && !this.loop) {
        return;
      }

      this.resetTimeout();
    }, this.delay);
  }

  protected resetTimeout(): void {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(() => {
      this.callback();
      this.timeouted = true;
    }, this.timeout);
  }


  public listen(callback: () => void) {
    if (!callback) {
      throw new TypeError('Failed to execute "listen": 1 argument required, but only 0 present.');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('Expected a function.');
    }

    this.callback = callback;

    this.events.forEach((event: string) => {
      this.element.addEventListener(event, this.eventHandler);
    });
  }


  public destory() {
    this.events.forEach((event: string): void => {
      this.element.removeEventListener(event, this.eventHandler);
    });

    if (this.timer) {
      window.clearTimeout(this.timer);
    }

    return this;
  }
}

export default IdleDiscover;
