ne.Rect = (function () {

  return class Rect {

    constructor(x=0, y=0, width=0, height=0) {
      this.set(x, y, width, height);
    }

    get topLeft() {
      var self = this;
      return {
        get x() {
          return self.x;
        },
        get y() {
          return self.y;
        }
      };
    }

    get topRight() {
      var self = this;
      return {
        get x() {
          return self.x + self.width;
        },
        get y() {
          return self.y;
        }
      };
    }

    get bottomLeft() {
      var self = this;
      return {
        get x() {
          return self.x;
        },
        get y() {
          return self.y + self.height;
        }
      };
    }

    get bottomRight() {
      var self = this;
      return {
        get x() {
          return self.x + self.width;
        },
        get y() {
          return self.y + self.height;
        }
      };
    }

    set(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    clone() {
      return new Rect(this.x, this.y, this.width, this.height);
    }

  };

})();
