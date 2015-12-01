
ne.Loader = (function () {

  var _cache = {
    audio:    {},
    pixmaps:  {},
    json:     {},
    fonts:    {}
  };

  return class Loader {

    constructor() {

    }

    loadPixmaps(name, url) {
      if (typeof _cache.pixmaps[name] == 'undefined') {

      }
      return this;
    }

    loadAudio(name, url) {
      if (typeof _cache.audio[name] == 'undefined') {

      }
      return this;
    }

    loadJson(name, url) {
      if (typeof _cache.json[name] == 'undefined') {

      }
      return this;
    }

    loadFont(name, url) {
      if (typeof _cache.fonts[name] == 'undefined') {

      }
      return this;
    }

    pixmap(name) {

    }

    audio(name) {

    }

    json(name) {

    }

    font(name) {

    }

    static clear() {
      this.clearPixmaps();
      this.clearAudio();
      this.clearJson();
    }

    static clearPixmaps() {

    }

    static clearAudio() {

    }

    static clearJson() {

    }

  };

})();
