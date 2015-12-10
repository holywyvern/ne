module ne.audio {

  export class WebAudioStream extends Stream {

    private _context      : AudioContext;
    private _source       : AudioBufferSourceNode;
    private _position     : number;
    private _playPosition : number;
    private _playTime     : number;
    private _buffer       : WebAudioBuffer;
    private _playbackRate : number;

    constructor(context:AudioContext, buffer : WebAudioBuffer) {
      super();
      this._context      = context;
      this._source       = null;
      this._position     = 0;
      this._playTime     = 0;
      this._buffer       = buffer;
      this._playPosition = null;
      this._playbackRate = 1;
    }

    play(loop=false) {
      this.pause();
      this._createSource(loop);
      this._playTime     = Date.now();
      this._playPosition = this._position;
      this._source.start(0, this._position);
    }

    private _createSource(loop:boolean) {
      this._source = this._context.createBufferSource();
      this._source.buffer = this._buffer.src;
      this._source.loop = loop;
      this._source.playbackRate.value = this._playbackRate;
      this._source.connect(this._context.destination);
    }

    stop() {
      if (this._playPosition === null) return;
      this._source.stop();
      this._source.disconnect();
      this._position = 0;
      this._playPosition = null;
      this._source = null;
    }

    pause() {
      if (this._playPosition === null) return;
      this._source.stop();
      this._setCurrentPosition();
      this._source.disconnect();
      this._playPosition = null;
      this._source = null;
    }

    private _setCurrentPosition() {
      var pbr = this._source.playbackRate.value / this._source.playbackRate.defaultValue;
      var d = (Date.now() - this._playTime) * pbr + this._playPosition;
      var t = Math.max(1, this.loopEnd - this.loopStart);
      this._position = this.loopStart + d % t;
    }

    get context() {
      return this._context;
    }

    get position() {
      if (this._playPosition !== null) {
        this._setCurrentPosition();
      }
      return this._position;
    }

    set position(value) {
      this._position = value;
      if (this._playPosition !== null) {
        var loop = this._source.loop;
        this._source.stop();
        this._source.disconnect();
        this.play(loop);
      }
    }

    get loopStart() {
      return this._source.loopStart;
    }

    set loopStart(value) {
      this._source.loopStart = value;
    }

    get loopEnd() {
      return this._source.loopEnd;
    }

    set loopEnd(value) {
      this._source.loopEnd = value;
    }

    get playbackRate() {
      return this._playbackRate;
    }

    set playbackRate(value) {
      if (this._source) {
        this._source.playbackRate.value = value;
      }
      this._playbackRate = value;
    }

  }

}
