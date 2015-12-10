module ne.audio {

  export class LegacyStream extends Stream {

    private _buffer : LegacyBuffer;
    private _tag    : HTMLAudioElement;

    constructor(buffer : LegacyBuffer) {
      super();
      this._buffer  = buffer;
      this._tag     = <HTMLAudioElement>buffer.src.cloneNode();
    }

    play(loop=false) {
      this._tag.loop = loop;
      this._tag.play();
    }

    stop() {
      this._tag.pause();
      this._tag.currentTime = 0;
    }

    pause() {
      this._tag.pause();
    }

    get position() {
      return this._tag.currentTime;
    }

    set position(value) {
      this._tag.currentTime = value;
    }

    get playbackRate() {
      return this._tag.playbackRate;
    }

    set playbackRate(value) {
      this._tag.playbackRate = value;
    }

  }

}
