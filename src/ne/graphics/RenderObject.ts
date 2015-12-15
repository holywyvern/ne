module ne.graphics {

  export interface RenderObject {
    render(render : WebGLRender);
    render2d?(ctx : CanvasRenderingContext2D);
  }

}
