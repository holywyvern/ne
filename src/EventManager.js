ne.EventManager = (function () {

  return class EventManager {

    constructor() {
      this._events = {};
    }

    fire(name, event={}) {
      this._ensureEventType(name);
      var result = true;
      for (let callback of this._events[name]) {
        let i = callback(event);
        if ( (typeof i != 'undefined') && (i === false) ) {
          result = false;
        }
      }
      return result;
    }

    on(name, callback) {
      this._ensureEventType(name);
      this._events[name].push(callback);
    }

    off(name, callback=null) {
      if (callback === null) {
        this._events[name] = [];
        return;
      }
      this._ensureEventType(name);
      var index = this._events[name].indexOf(callback);
      if (index !== -1) {
        this._events[name].splice(index, 1);
      }
    }

    _ensureEventType(name) {
      if (typeof this._events[name] == 'undefined') {
        this._events[name] = [];
      }
    }

  };

})();
