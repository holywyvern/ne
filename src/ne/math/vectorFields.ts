/// <reference path="./combinator.ts" />

module ne.math {

  function makePropertyAccessor(slice: String[]) {
    var length = slice.length;
    return {

      get: function () {
        var map: Array<number> = slice.map( (i) => this[<string>i] );
        return new ne.math.Vector4(map[0], map[1], map[2] || 0, map[3] || 0 );
      },

      set: function (value) {
        for (var index = 0; index < length; ++index) {
          let p = slice[index];
          this[<string>p] = value[index];
        }
      },

      configurable: true
    };
  }

  function makePropertiesOfSize(result: PropertyDescriptorMap, permutations: String[][], length) {
    permutations.forEach((i) => {
      var slice = i.slice(0, length + 1);
      var name = slice.join('');
      if (typeof result[name] == 'undefined') {
        result[name] = makePropertyAccessor(slice);
      }
    });
  }

  function makeProperties(properties: String[]): PropertyDescriptorMap {
    var result: PropertyDescriptorMap = {};
    //var permutations = permutator(properties);
    var permutations = combinator(properties.length, properties);
    for (var length = 1; length <= properties.length; ++length) {
      makePropertiesOfSize(result, permutations, length);
    }
    return result;
  }


  export function vectorFields(object: any, ...properties: String[]) {
    Object.defineProperties(object, makeProperties(properties));
  }

}
