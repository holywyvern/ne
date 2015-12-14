/// <reference path="./Buffer.ts" />

module ne.audio {



  export class WebAudioBuffer extends Buffer {

    private _context  : AudioContext;
    private _buffer   : AudioBuffer;

    constructor(context: AudioContext, buffer : AudioBuffer) {
      super();
      this._context = context;
      this._buffer  = buffer;
    }

    get src() {
      return this._buffer;
    }

    stream() {
      return new WebAudioStream(this._context, this);
    }

    get length() {
      return this._buffer.length;
    }

  }

}
