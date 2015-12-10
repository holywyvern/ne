module ne.graphics {

  export declare type PositionValue = (w, h) => number[];

  export module Position {
    export var TOP          : PositionValue = (w, h) => [ w / 2,   0   ];
    export var LEFT         : PositionValue = (w, h) => [   0,   h / 2 ];
    export var RIGHT        : PositionValue = (w, h) => [   w,   h / 2 ];
    export var BOTTOM       : PositionValue = (w, h) => [ w / 2,   h   ];
    export var TOP_LEFT     : PositionValue = (w, h) => [   0,     0   ];
    export var TOP_RIGHT    : PositionValue = (w, h) => [   w,     0   ];
    export var BOTTOM_LEFT  : PositionValue = (w, h) => [   0,     h   ];
    export var BOTTOM_RIGHT : PositionValue = (w, h) => [   w,     h   ];
    export var MIDDLE       : PositionValue = (w, h) => [ w / 2, h / 2 ];

    export function percent(x:number, y:number): PositionValue {
      return (w, h) => [w * x, h * y];
    }

    export function absolute(x:number, y:number): PositionValue {
      return (w, h) => [x, y];
    }

  }

}
