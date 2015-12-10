ne.tools.defineEscalarPorperties = (function () {

  function permutator(inputArr) {
    var results = [];

    function permute(arr, memo) {
      var cur, memo = memo || [];

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

  function makePropertyAccessor(slice) {
    var length = slice.length;
    return {

      get: function () {
        var map = slice.map( (i) => this[i] );
        return new ne.Vec4(...map);
      },

      set: function (value) {
        for (var index = 0; index < length; ++index) {
          let p = slice[index];
          this[p] = value[index];
        }
      },

      configurable: true
    };
  }

  function makePropertiesOfSize(result, permutations, length) {
    permutations.forEach((i) => {
      var slice = i.slice(0, length + 1);
      var name = slice.join('');
      if (typeof result[name] == 'undefined') {
        result[name] = makePropertyAccessor(slice);
      }
    });
  }

  function makeProperties(properties) {
    var result = {};
    var permutations = permutator(properties);
    for (var length = 1; length <= properties.length; ++length) {
      makePropertiesOfSize(result, permutations, length);
    }
    return result;
  }

  return function (object, ...properties) {
    Object.defineProperties(object, makeProperties(properties));
  };

})();
