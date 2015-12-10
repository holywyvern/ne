module ne.math {

  function permutator(inputArr: String[]): String[][] {
    var results = [];

    function permute(arr, memo=[]) {
      var cur;
      for (var i = 0; i < arr.length; i++) {
        cur = arr.splice(i, 1);
        if (arr.length === 0) {
          results.push(memo.concat(cur));
        }
        permute(arr.slice(), memo.concat(cur));
        arr.splice(i, 0, cur[0]);
      }

      return results;
    }

    return permute(inputArr);
  }

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
    var permutations = permutator(properties);
    for (var length = 1; length <= properties.length; ++length) {
      makePropertiesOfSize(result, permutations, length);
    }
    return result;
  }

  export function vectorFields(object: any, ...properties) {
    Object.defineProperties(object, makeProperties(<String[]>properties));
  }

}
