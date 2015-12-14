module ne.math {

  // n -> [a] -> [[a]]
   export function combinator(n: number, lst : String[]): String[][] {
     return n ? (
       lst.length ? combinator(n - 1, lst).map(function (t) {
         return [lst[0]].concat(t);
       }).concat(combinator(n, lst.slice(1))) : []
     ) : [[]];
   };

   // If needed, we can derive a significantly faster version of
   // the simple recursive function above by memoizing it

   // f -> f
   function memoized(fn) {
     var m = {};
     return function (x) {
       var args = [].slice.call(arguments),
         strKey = args.join('-');

       var v = m[strKey];
       if ('u' === (typeof v)[0])
         m[strKey] = v = fn.apply(null, args);
       return v;
     }
   }

   // [m..n]
   function range(m, n) {
     return Array.apply(null, Array(n - m + 1)).map(function (x, i) {
       return m + i;
     });
   }

}
