declare var opentype: any;

module ne.utils {

  var _pixmapCache : { [ s: string ]: graphics.Pixmap } = {};
  var _fontCache   : { [ s: string ]: any }             = {};
  var _audioCache  : { [ s: string]: audio.AudioFile  } = {};

  var cls = AudioContext || (<any>window).AudioContext || (<any>window).webkitAudioContext;
  var AC : AudioContext = new cls();

  export class LoaderView {

    pixmap(url:string) {
      return _pixmapCache[url];
    }

    font(url:string) {
      return _fontCache[url];
    }

  }

  export class Loader {

    private _loadStart: boolean;
    private _toLoad: number;

    constructor() {
      this._loadStart = false;
      this._toLoad    = 0;
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
        this._checkLoad();
        _pixmapCache[url] = graphics.Pixmap.fromImage(img);
      }
      img.onerror = () => {
        this._checkLoad();
        _pixmapCache[url] = null;
        console.error(`Could not load image: '${url}'`);
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
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.responseType = 'arraybuffer';
      this._prepareAudioRequest(url, request);
    }

    _prepareAudioRequest(url, request) {
      request.onload = () => {
        AC.decodeAudioData(request.response, function(buffer) {
          _audioCache[url] = new audio.AudioFile(AC, buffer);
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

    get view() {
      return new LoaderView();
    }

    _checkLoad() {
      --this._toLoad;
      if (this.isDone()) {
        this.callDone();
      }
    }

  }

}
