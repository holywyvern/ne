// Ensure the module is loaded
if (typeof window.ne == 'undefined') {
  window.ne = {};
}
ne.Loader = (function () {

  var _cache = {
    audio:    {},
    bitmaps:  {},
    json:     {},
    fonts:    {}
  };

  return class Loader {

    constructor() {

    }

    loadPixmaps(name, url) {

    }

    loadAudio(name, url) {

    }

    loadJson(name, url) {

    }

    loadFont(name, url) {

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
