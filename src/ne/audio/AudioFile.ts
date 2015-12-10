module ne.audio {



  export class AudioFile {

    private _context  : AudioContext;
    private _buffer   : AudioBuffer;
    private _source   : AudioBufferSourceNode;
    private _position : number;

    constructor(context: AudioContext, buffer : AudioBuffer) {
      this._context = context;
      this._buffer  = buffer;
      this._source  = null;
      this._position = 0;
    }

    play(loop=false) {
      this.stop();
      var source = this._context.createBufferSource(); // creates a sound source
      source.buffer = this._buffer;                    // tell the source which sound to play
      source.connect(this._context.destination);       // connect the source to the context's destination (the speakers)
      source.start(0);
      this._source = source;
    }

    stop() {
      this._source.stop();
    }

    pause() {
    }

  }

}
