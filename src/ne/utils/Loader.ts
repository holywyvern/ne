declare var opentype: any;

module ne.utils {

  var _pixmapCache : { [ s: string ]: graphics.Pixmap } = {};
  var _fontCache   : { [ s: string ]: any }             = {};
  var _audioCache  : { [ s: string]: audio.Buffer  }    = {};
  var _jsonCache   : { [ s: string]: any }              = {};

  var cls = AudioContext || (<any>window).AudioContext || (<any>window).webkitAudioContext;

  var AC : AudioContext = null;

  if (cls) {
    AC = new cls();
  }

  export class CacheFinder {

    constructor(loader:Loader) {

    }

    pixmap(url:string) {
      return _pixmapCache[url];
    }

    font(url:string) {
      return _fontCache[url];
    }

    audio(url) {
      return _audioCache[url];
    }

    json(url) {
      return _jsonCache[url];
    }

  }

  export declare type LoaderCallback = (loader: Loader) => any;

  export class Loader {

    private _loadStart: boolean;
    private _toLoad: number;
    private _callbacks : LoaderCallback[];

    constructor() {
      this._loadStart = false;
      this._toLoad    = 0;
      this._callbacks = [];
    }

    done(callback) {
      this._callbacks.push(callback);
    }

    start() {
      this._loadStart = true;
      if (this.isDone()) {
        this.callDone();
      }
      return this;
    }

    isDone() {
      return this._loadStart && this._toLoad <= 0;
    }

    callDone() {
      this._callbacks.forEach((callback) => callback(this));
      return this;
    }

    pixmap(url) {
      if (_pixmapCache[url]) {
        return;
      }
      ++this._toLoad;
      this._prepareImage(url);
    }

    _prepareImage(url) {
      var img = new Image();
      img.onload = () => {
        _pixmapCache[url] = graphics.Pixmap.fromImage(img);
        this._checkLoad();
      }
      img.onerror = () => {
        _pixmapCache[url] = null;
        console.error(`Could not load image: '${url}'`);
        this._checkLoad();
      }
      img.src = url;
    }

    font(url) {
      if (_fontCache[url]) {
        return;
      }
      ++this._toLoad;
      this._prepareFont(url);
    }

    _prepareFont(url) {
      opentype.load(url, (err, font) => {
        if (err) {
          console.error(`Could not load font: '${url}'.\n${err}`);
           _fontCache[url] = null;
        } else {
         _fontCache[url] = font;
        }
        this._checkLoad();
      });
    }

    audio(url) {
      if (_audioCache[url]) {
        return;
      }
      ++this._toLoad;
      if (AC) {
        this._prepareWebAudioRequest(url);
      } else {
        this._prepareLegacyAudioRequest(url);
      }

    }

    json(url) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = () => {
        _jsonCache[url] =  JSON.parse(request.responseText);
        this._checkLoad();
      }
      request.onerror = () => {
        console.error(`Could not load json file: '${url}'.\n`);
        _jsonCache[url] = null;
        this._checkLoad();
      }
      request.send();
    }

    _prepareLegacyAudioRequest(url) {
      var audioTag = document.createElement('audio');
      audioTag.onload = function () {
        _audioCache[url] = new audio.LegacyBuffer(audioTag);
        this._checkLoad();
      }
      audioTag.onerror = function () {
        console.error(`Could not load audio file: '${url}'.\n`);
        _audioCache[url] = null;
        this._checkLoad();
      }
      audioTag.src = url;
    }

    _prepareWebAudioRequest(url) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      request.onload = () => {
        AC.decodeAudioData(request.response, function(buffer) {
          _audioCache[url] = new audio.WebAudioBuffer(AC, buffer);
          this._checkLoad();
        });
      }
      request.onerror = () => {
        console.error(`Could not load audio file: '${url}'.\n`);
        _audioCache[url] = null;
        this._checkLoad();
      }
      request.send();
    }

    get cache() {
      return new CacheFinder(this);
    }

    _checkLoad() {
      --this._toLoad;
      if (this.isDone()) {
        this.callDone();
      }
    }

    static clear() {
      this.clearPixmaps();
      this.clearFonts();
      this.clearAudio();
      this.clearJson();
    }

    static clearPixmaps() {
      _pixmapCache = {};
    }

    static clearFonts() {
      _fontCache = {};
    }

    static clearAudio() {
      _audioCache = {};
    }

    static clearJson() {
      _jsonCache = {};
    }

  }

}
