ne.Rect = (function () {

  class Rect extends ne.RectBase {

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

    clone() {
      return new Rect(this.x, this.y, this.width, this.height);
    }

  };


  return Rect;

})();
