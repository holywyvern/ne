// Ensure the module is loaded
if (typeof window.ne == 'undefined') {
  window.ne = {};
}
ne.Loader = (function () {

  var _cache = {
    audio:    {},
    bitmaps:  {},
    json:     {}
  };

  return class Loader {

    constructor() {

    }

    loadPixmaps(url) {

    }

    loadAudio(url) {

    }

    loadJson(url) {

    }

    pixmap(url) {

    }

    audio(url) {

    }

    json(url) {

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
