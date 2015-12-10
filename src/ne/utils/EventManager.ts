module ne.utils {

  export interface EventHandler {
    defaultEvent(name: string, event: Event): any;
  }

  export declare type EventCallback = (target: EventHandler, event: Event) => any;

  export class EventManager {

    private _target : EventHandler;
    private _events : { [ s: string ]: EventCallback[] };

    constructor(target: EventHandler) {
      this._target = target;
      this._events = {};
    }

    on(type:string, callback:EventCallback) {
      this._events[type] = this._events[type] || [];
      this._events[type].push(callback);
    }

    off(type:string, callback:EventCallback) {
      this._events[type] = this._events[type] || [];
    }

    fire(type:string, event:Event) {
      this._events[type] = this._events[type] || [];
      this._events[type].forEach(function (callback) {
        callback(this._target, event);
      });
      if (!event.defaultPrevented) {
        this._target.defaultEvent(type, event);
      }
    }

  }

}
