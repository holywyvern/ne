ne.Scene = (function () {

  return class Scene extends ne.Container {

    constructor() {
      super();
      this.shader = new ne.SceneShader();
    }

    get bgColor() {
      return this.shader.uniformValues.u_bgColor;
    }

  };

})();
