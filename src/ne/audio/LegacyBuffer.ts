module ne.audio {

  export class LegacyBuffer extends Buffer {

    private _tag : HTMLAudioElement;

    constructor(tag: HTMLAudioElement) {
      super();
      this._tag = tag;
    }

    stream(): Stream {
      return new LegacyStream(this);
    }

    get length() {
      return this._tag.duration;
    }

    get src() {
      return this._tag;
    }

  }

}
