
ne.Container = (function () {

  return class Container extends ne.Drawable {

    constructor() {
      super();
      this._children = [];
      this._zRefresh = false;
    }

    get children() {
      return this._children;
    }

    act(delta) {
      this._refreshZ();
      this._makeChildrenAct(delta);
    }

    render(gl) {
      this._renderChildren(gl);
    }

    zUpdate() {
      this._zRefresh = true;
    }

    _refreshZ() {
      if (this._zRefresh) {
        this.children.sort( (a, b) => a.z - b.z );
        this._zRefresh = false;
      }
    }

    _makeChildrenAct(delta) {
      this.children.forEach( (child) => child.act(delta) );
    }

    _renderChildren(gl) {
      this.children.forEach( (child) => child.render(gl) );
    }

    add(child) {
      if ( !this.contains(child) ) {
        this.children.push(child);
        this.zUpdate();
      }
    }

    remove(child) {
      var index = this.indexOf(child);
      if ( index !== -1 ) {
        this.children.splice(index, 1);
      }
    }

    indexOf(child) {
      return this.children.indexOf(child);
    }

    clear() {
      this.children = [];
    }

    swap(a, b) {
      var i = this.indexOf(a);
      var j = this.indexOf(b);
      if (i !== -1 && j !== -1) {
        let z = a.z;
        a.z = b.z;
        b.z = z;
      }
    }

    contains(child) {
      return (this.indexOf(child) !== -1);
    }

  }
})();
