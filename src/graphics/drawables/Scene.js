ne.Scene = (function () {

  return class Scene extends ne.Container {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this.shader = ne.SceneShader.INSTANCE;
      this._glBuffer = null;
      this._glData = new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0,  1.0,
        -1.0,  1.0, 1.0, -1.0, 1.0,  1.0
      ]);
    }

    load(game, loader) {

    }

    start(game, loader) {
      this.startGlData(game);
    }

    startGlData(game) {
      var data = this._glData;
      data[0] = data[4] = data[6] = 0; // x
      data[1] = data[3] = data[9] = 0; // x
      data[2] = data[8] = data[10] = game.width; // width
      data[5] = data[7] = data[11] = game.height; // height
      this.shader.uniformValues.u_matrix = ne.Mat3.projection(game.width, game.height);
    }

    get bgColor() {
      return this.shader.uniformValues.u_bgColor;
    }

    render(gl) {
      if (this.visible) {
        this.glClear(gl);
        this.useShader(gl);
        this.useBuffer(gl);
        this.updateShader(gl);
        ne.tools.gl.draw(gl);
        super.render(gl);
      }
    }

    glClear(gl) {
      gl.clearColor(1, 1, 1, 1);
      gl.colorMask(true, true, true, true);
      gl.clear(gl.COLOR_BUFFER_BIT);
    }

    destroy(gl) {
      super.destroy(gl);
      this.destroyBuffer(gl);
      this.shader.destroy(gl);
    }

    useShader(gl) {
      this.shader.generate(gl);
      this.shader.use(gl);
    }

    useBuffer(gl) {
      this.generateBuffer(gl);
      ne.tools.gl.bindBuffer(gl, this._glBuffer, this._glData);
    }

    updateShader(gl) {
      this.shader.updateAttribute(gl, 'a_position');
      this.shader.update(gl);
    }

    destroyBuffer(gl) {
      if (this._glBuffer) {
        gl.deleteBuffer(this._glBuffer);
      }
    }

    generateBuffer(gl) {
      if (!this._glBuffer) {
        this._glBuffer = gl.createBuffer();
      }
    }

    get parentWidth() {
      return this.parent ? this.parent.width : this._glData[2];
    }

    get parentHeight() {
      return this.parent ? this.parent.height : this._glData[5];
    }

  };

})();
