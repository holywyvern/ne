ne.Actor = (function () {

  class Actor extends ne.Drawable {

    initMembers() {
      super.initMembers();
      this._twigs = [];
    }

    act(delta) {

    }

    twig(props, time, type=null) {
      if (!type) {
        type = this.defaultTwigMode();
      }
      if (time <= 0) {
        this._setProperties(props);
        return;
      }
      this._twigs.push(new Twig(this, props, time, type));
    }

    defaultTwigMode() {
      return Twig.LINEAR;
    }

    act(delta) {
      this.updateTwigs(delta);
    }

    updateTwigs(delta) {
      var toRemove = this._twigs.filter((twig) => twig.update(delta));
      this.removeTwigs(toRemove);
    }

    removeTwigs(toRemove) {
      toRemove.forEach((twig) => {
        var index = this._twigs.indexOf(twig);
        this._setProperties(twig.properties);
        this._twigs.splice(index, 1);
      });
    }

    _setProperties(props) {
      Object.keys(props).forEach((i) => {
        this[i] = props[i];
      });
    }

  }

  class Twig {

    constructor(subject, props, time, type) {
      this.initMembers(subject, props, time, type);
    }

    get properties() {
      return this._properties;
    }

    initMembers(subject, props, time, type) {
      this._properties    = props;
      this._time          = time;
      this._totalTime     = time;
      this._type          = type;
      this._subject       = subject;
      this._initialValues = this.createInitialValues(subject, props);
    }

    createInitialValues(subject, props) {
      var result = {};
      for (var k of Object.keys(props)) {
        result[k] = subject[k];
      }
      return result;
    }

    update(delta) {
      this._time = this._time - delta;
      if (this._time > 0) {
        this.updateFunctions();
        return false;
      }
      return true;
    }

    updateFunctions() {
      for (var k of Object.keys(this._properties)) {
        var init = this._initialValues[k];
        var final = this._properties[k];
        var current = this._subject[k];
        var v = this._type(init, final, current, this._totalTime, this._time);
        this._subject[k] = v;
      }
    }

  }

  Actor.Twig = Twig;

  Twig.LINEAR = function (originalValue, finalValue, currentValue, totalTime, timeLeft) {
    return (currentValue * (timeLeft - 1) + finalValue) / timeLeft;
  };

  return Actor;

})();
