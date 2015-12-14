
var requestAnimFrame: (callback: () => void) => void = (function(){
  return window.requestAnimationFrame ||
  (<any>window).webkitRequestAnimationFrame ||
  (<any>window).mozRequestAnimationFrame ||
  (<any>window).oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  function(callback){
      window.setTimeout(callback, 1000 / 60, new Date().getTime());
  };
})();
