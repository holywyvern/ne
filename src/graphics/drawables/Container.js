
ne.Container = (function () {

  return class Container extends ne.Actor {

    constructor() {
      super();
    }

    initMembers() {
      super.initMembers();
      this._children = [];
      this._zRefresh = false;
    }

    get children() {
      return this._children;
    }

    get length() {
      return this._children.length;
    }

    act(delta) {
      super.act(delta);
      this._refreshZ();
      this._makeChildrenAct(delta);
    }

    render(gl) {
      this._renderChildren(gl);
    }

    destroy(gl) {
      super.destroy(gl);
      this.destroyChildren(gl);
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

    destroyChildren(gl) {
      this.children.forEach( (child) => child.destroy(gl) );
    }

    _makeChildrenAct(delta) {
      this.children.forEach( (child) => child.act(delta) );
    }

    _renderChildren(gl) {
      this.children.forEach( (child) => child.render(gl) );
    }

    add(child) {
      if ( !this.contains(child) ) {
        child._parent = this;
        this.children.push(child);
        this.zUpdate();
      }
    }

    remove(child) {
      var index = this.indexOf(child);
      this.removeAt(index);
    }

    removeAt(index) {
      if ( index >= 0 && index <= this.length ) {
        var deleted = this.children.splice(index, 1);
        deleted.forEach( (c) => c._parent = null );
      }
    }

    indexOf(child) {
      return this.children.indexOf(child);
    }

    clear() {
      this.children.forEach( (child) => child._parent = null );
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
