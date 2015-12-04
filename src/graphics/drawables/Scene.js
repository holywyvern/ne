ne.Scene = (function () {

  return class Scene extends ne.Container {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this.shader = new ne.SceneShader();
      this._glBuffer = null;
      this._glData = new Float32Array([
        -1.0, -1.0, 1.0, -1.0, -1.0,  1.0,
        -1.0,  1.0, 1.0, -1.0, 1.0,  1.0
      ]);
    }

    load(loader) {

    }

    start(loader) {

    }

    get bgColor() {
      return this.shader.uniformValues.u_bgColor;
    }

    render(gl) {
      this.shader.generate(gl);
      this.shader.use(gl);
      this.useBuffer(gl);
      this.updateShader(gl);
      ne.tools.gl.draw(gl);
    }

    destroy(gl) {
      super.destroy(gl);
      this.destroyBuffer(gl);
      this.shader.destroy(gl);
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

  };

})();
