ne.SpriteSheet = (function () {


  class SpriteSheet extends ne.Sprite {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this.columns = 1;
      this.rows    = 1;
      this._currentFrame = 0;
      this._currentMotion = null;
      this._motionSpeed = 0;
      this._motionIndex = 0;
      this._motionTime  = 0;
      this._loops  = 0;
      this.motions = {};
    }

    act(delta) {
      super.act(delta);
      this.updateFrameAnimation(delta);
      this.updateFrame();
    }

    updateFrameAnimation(delta) {
      if (!this._currentMotion) return;
      var i = 0;
      this._motionTime -= delta;
      while (this._motionTime <= 0) {
        this._motionTime += this._motionSpeed;
        this.updateMotionFrame();
      }
    }

    updateMotionFrame() {
      this._motionIndex += 1;
      if (this.isMotionOver()) {
        if (this._loops > 0) {
          --this._loops;
        }
        this._motionIndex = this.isFrameLooping() ? 0 : this._motionIndex - 1;
      }
      this._currentFrame = this._currentMotion[this._motionIndex];
    }

    isMotionOver() {
      return this._motionIndex >= this._currentMotion.length;
    }

    isFrameLooping() {
      return this._loops != 0;
    }

    updateFrame() {
      if (!this.texture) return;
      var w = this.texture.width / this.columns;
      var h = this.texture.height / this.rows;
      var x = w * (this._currentFrame % this.columns);
      var y = h * Math.floor(this._currentFrame / this.columns);
      this.frame.set(x, y, w, h);
    }

    startMotion(name, speed=100, loops=-1) {
      this._motionIndex = 0;
      this._currentMotion = this.motions[name] || null;
      this._motionSpeed = speed;
      this._loops = loops;
      this._motionTime = speed;
      if (this._currentMotion) {
        this._currentFrame = this._currentMotion[this._motionIndex];
      }
    }

    afterLoad(loader) {
      this.calculateDelta();
      super.afterLoad(loader);
    }

  }

  return SpriteSheet;

})();
