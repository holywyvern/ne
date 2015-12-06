
ne.Loader = (function () {

  var _cache = {
    audio:    {},
    pixmaps:  {},
    json:     {},
    fonts:    {},
    textures: {}
  };

  return class Loader {

    constructor() {
      this._whenDone = [];
      this._toLoad = 0;
      this._started = false;
    }

    start() {
      this._started = true;
      this._callDone();
    }

    _callDone() {
      if (this._started && this._toLoad == 0) {
        this._whenDone.forEach((i) => {
          i(this)
        });
      }
    }

    _endSingleLoad() {
      this._toLoad -= 1;
      this._callDone();
    }

    loadPixmap(name, url) {
      if (typeof _cache.pixmaps[name] == 'undefined') {
        this._toLoad += 1;
        img = new Image();
        img.onload = () => {
          _cache.pixmaps[name] = ne.Pixmap.fromImage(img);
          this._endSingleLoad();
        }
        img.onerror = () => {
          this._endSingleLoad();
        }
        img.src = url;
      }
      return this;
    }

    loadTexture(name, url) {
      this.loadPixmap(name, url);
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
      return _cache.pixmaps[name] || null;
    }

    texture(name) {
      if (typeof _cache.textures[name] == 'undefined') {
        if (typeof _cache.pixmaps[name] != 'undefined') {
          _cache.textures[name] = new ne.Texture(_cache.pixmaps[name]);
        }
      }
      return _cache.textures[name] || null;
    }

    audio(name) {

    }

    json(name) {

    }

    font(name) {

    }

    done(callback) {
      this._whenDone.push(callback);
      return this;
    }

    static clear() {
      this.clearPixmaps();
      this.clearAudio();
      this.clearJson();
      this.clearTextures();
    }

    static clearPixmaps() {

    }

    static clearAudio() {

    }

    static clearJson() {

    }

    static clearTextures() {

    }

  };

})();
