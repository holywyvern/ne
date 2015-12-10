ne.Sprite = (function () {

  class Sprite extends ne.SpriteBase {

    get x() {
      return this.position.x;
    }

    get y() {
      return this.position.y;
    }

    set x(value) {
      this.position.x = value;
    }

    set y(value) {
      this.position.y = value;
    }

    get ox() {
      return this.offset.x;
    }

    get oy() {
      return this.offset.y;
    }

    set ox(value) {
      this.offset.x = value;
    }

    set oy(value) {
      this.offset.y = value;
    }

    get width() {
      return this.frame.width;
    }

    get height() {
      return this.frame.height;
    }

    get toneRed() {
      return this.tone.red;
    }

    get toneGreen() {
      return this.tone.green;
    }

    get toneBlue() {
      return this.tone.blue;
    }

    get toneGray() {
      return this.tone.gray;
    }

    get toneGrey() {
      return this.toneGray;
    }

    set toneRed(value) {
      this.tone.red = value;
    }

    set toneGreen(value) {
      this.tone.green = value;
    }

    set toneBlue(value) {
      this.tone.blue = value;
    }

    set toneGray(value) {
      this.tone.gray = value;
    }

    set toneGrey(value) {
      this.toneGray = value;
    }

    move(x, y, time=0, mode=null) {
      return this.twig({x: x, y: y}, time, mode);
    }

    rotate(angle, time=0, mode=null) {
      return this.twig({angle: angle}, time, mode);
    }

    tonalize(tone, time=0, mode=null) {
      return this.twig({toneRed: tone.red, toneGreen: tone.green, toneBlue: tone.blue, toneGray: tone.gray }, time, mode);
    }

    get mirrorX() {
      return this.scale.x < 0;
    }

    set mirrorX(value) {
      var sign = value ? -1 : 1;
      this.scale.x = sign * Math.abs(this.scale.x);
    }

    get mirrorY() {
      return this.scale.y < 0;
    }

    set mirrorY(value) {
      var sign = value ? -1 : 1;
      this.scale.y = sign * Math.abs(this.scale.y);
    }

  }

  return Sprite;

})();
