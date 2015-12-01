"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _slicedToArray=function(){function e(e,t){var n=[],r=!0,a=!1,i=void 0;try{for(var u,s=e[Symbol.iterator]();!(r=(u=s.next()).done)&&(n.push(u.value),!t||n.length!==t);r=!0);}catch(o){a=!0,i=o}finally{try{!r&&s["return"]&&s["return"]()}finally{if(a)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();"undefined"==typeof window.ne&&(window.ne={}),ne.Color=function(){return function(){function e(t,n,r){var a=arguments.length<=3||void 0===arguments[3]?255:arguments[3];_classCallCheck(this,e),this.set(t,n,r,a)}return _createClass(e,[{key:"set",value:function(e,t,n){var r=arguments.length<=3||void 0===arguments[3]?void 0:arguments[3];return"undefined"==typeof r&&(r=this.alpha),this.red=e,this.green=t,this.blue=n,this.alpha=r,this}},{key:"clone",value:function(){return new e(this.red,this.green,this.blue,this.alpha)}},{key:"toCss",value:function(){var e=this.alpha/255;return"rgba("+this.red+", "+this.green+", "+this.blue+", "+e+")"}},{key:"toArgb",value:function(){return this.alpha<<24+this.red<<16+this.green<<8+this.blue}},{key:"toRgba",value:function(){return this.red<<24+this.green<<16+this.blue<<8+this.alpha}},{key:"toRgb",value:function(){return this.red<<16+this.green<<8+this.blue}},{key:"toHsla",value:function(){var e,t,n=this.red/255,r=this.green/255,a=this.blue/255,i=Math.max(n,r,a),u=Math.min(n,r,a),s=(i+u)/2;if(i==u)e=t=0;else{var o=i-u;switch(t=s>.5?o/(2-i-u):o/(i+u),i){case n:e=(r-a)/o+(a>r?6:0);break;case r:e=(a-n)/o+2;break;case a:e=(n-r)/o+4}e/=6}return[e,t,s,this.alpha]}},{key:"toHsl",value:function(){var e,t,n=this.red/255,r=this.green/255,a=this.blue/255,i=Math.max(n,r,a),u=Math.min(n,r,a),s=(i+u)/2;if(i==u)e=t=0;else{var o=i-u;switch(t=s>.5?o/(2-i-u):o/(i+u),i){case n:e=(r-a)/o+(a>r?6:0);break;case r:e=(a-n)/o+2;break;case a:e=(n-r)/o+4}e/=6}return[e,t,s]}},{key:"grayscale",value:function(){var e=.21*this.red+.72*this.green+.07*this.blue;return this.set(e,e,e)}},{key:"average",value:function(){var e=(this.red+this.green+this.blue)/3;return this.set(e,e,e)}},{key:"lightnessAverage",value:function(){var e,t,n=[this.red,this.green,this.blue],r=((e=Math).max.apply(e,n)+(t=Math).min.apply(t,n))/2;return this.set(r,r,r)}},{key:"invert",value:function(){var e=arguments.length<=0||void 0===arguments[0]?!1:arguments[0],t=e?255-this.alpha:this.alpha;return this.set(255-this.red,255-this.green,255-this.blue,t)}},{key:"red",get:function(){return this._r},set:function(e){this._r=Math.max(0,Math.min(255,e))}},{key:"green",get:function(){return this._g},set:function(e){this._g=Math.max(0,Math.min(255,e))}},{key:"blue",get:function(){return this._b},set:function(e){this._b=Math.max(0,Math.min(255,e))}},{key:"alpha",get:function(){return this._a},set:function(e){this._a=Math.max(0,Math.min(255,e))}},{key:"r",get:function(){return this.red},set:function(e){this.red=e}},{key:"g",get:function(){return this.green},set:function(e){this.green=e}},{key:"b",get:function(){return this.blue},set:function(e){this.blue=e}},{key:"a",get:function(){this.alpha},set:function(e){this.alpha=e}},{key:"hue",get:function(){return this.toHsl()[0]},set:function(t){var n=this.toHsla();n[0]=t;var r=e.fromHsla(n);this.set(r.red,r.green,r.blue,r.alpha)}},{key:"saturation",get:function(){return this.toHsl()[1]},set:function(t){var n=this.toHsla();n[1]=t;var r=e.fromHsla(n);this.set(r.red,r.green,r.blue,r.alpha)}},{key:"luminance",get:function(){return this.toHsl()[2]},set:function(t){var n=this.toHsla();n[2]=t;var r=e.fromHsla(n);this.set(r.red,r.green,r.blue,r.alpha)}},{key:"h",get:function(){return this.hue},set:function(e){this.hue=e}},{key:"s",get:function(){return this.saturation},set:function(e){this.saturation=e}},{key:"l",get:function(){return this.luminance},set:function(e){this.luminance=e}}],[{key:"_hue2rgb",value:function(e,t,n){return 0>n&&(n+=1),n>1&&(n-=1),1/6>n?e+6*(t-e)*n:.5>n?t:2/3>n?e+(t-e)*(2/3-n)*6:e}},{key:"_hslToRgb",value:function(t,n,r,a){var i,u,s;if(0==n)i=u=s=r;else{var o=.5>r?r*(1+n):r+n-r*n,l=2*r-o;i=this._hue2rgb(l,o,t+1/3),u=this._hue2rgb(l,o,t),s=this._hue2rgb(l,o,t-1/3)}return new e(Math.round(255*i),Math.round(255*u),Math.round(255*s),a)}},{key:"fromRgba",value:function(t){var n=t>>24&&255,r=t>>16&&255,a=t>>8&&255,i=t>>0&&255;return new e(n,r,a,i)}},{key:"fromRgb",value:function(t){var n=rgba>>16&&255,r=rgba>>8&&255,a=rgba>>0&&255;return new e(n,r,a)}},{key:"fromArgb",value:function(t){var n=rgba>>24&&255,r=rgba>>16&&255,a=rgba>>8&&255,i=rgba>>0&&255;return new e(r,a,i,n)}},{key:"fromHsla",value:function(e){var t=_slicedToArray(e,4),n=t[0],r=t[1],a=t[2],i=t[3];return this._hslToRgb(n,r,a,i)}},{key:"fromHsl",value:function(e){var t=_slicedToArray(e,3),n=t[0],r=t[1],a=t[2];return this._hslToRgb(n,r,a,255)}}]),e}()}();var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();"undefined"==typeof window.ne&&(window.ne={}),ne.Pixmap=function(){return function(){function e(){arguments.length<=0||void 0===arguments[0]?1:arguments[0],arguments.length<=1||void 0===arguments[1]?1:arguments[1];_classCallCheck(this,e),this._canvas=document.createElement("canvas"),this._context=this._canvas.getContext("2d")}return _createClass(e,[{key:"_bltImage",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=arguments.length<=2||void 0===arguments[2]?0:arguments[2],r=arguments.length<=3||void 0===arguments[3]?void 0:arguments[3],a=arguments.length<=4||void 0===arguments[4]?void 0:arguments[4],i=arguments.length<=5||void 0===arguments[5]?0:arguments[5],u=arguments.length<=6||void 0===arguments[6]?0:arguments[6],s=arguments.length<=7||void 0===arguments[7]?void 0:arguments[7],o=arguments.length<=8||void 0===arguments[8]?void 0:arguments[8];return"undefined"==typeof r&&(r=e.width),"undefined"==typeof a&&(a=e.height),"undefined"==typeof s&&(s=r),"undefined"==typeof o&&(o=a),this._context.drawImage(e,t,n,r,a,i,u,s,o),this}},{key:"blt",value:function(e){var t=arguments.length<=1||void 0===arguments[1]?0:arguments[1],n=arguments.length<=2||void 0===arguments[2]?0:arguments[2],r=arguments.length<=3||void 0===arguments[3]?void 0:arguments[3],a=arguments.length<=4||void 0===arguments[4]?void 0:arguments[4],i=arguments.length<=5||void 0===arguments[5]?0:arguments[5],u=arguments.length<=6||void 0===arguments[6]?0:arguments[6],s=arguments.length<=7||void 0===arguments[7]?void 0:arguments[7],o=arguments.length<=8||void 0===arguments[8]?void 0:arguments[8];return this._bltImage(e._canvas,t,n,r,a,i,u,s,o),this}},{key:"drawLine",value:function(e,t,n){}}],[{key:"fromImage",value:function(e){var t=new Pixmap(e.width,e.height);return t._bltImage(e,0,0,e.width,e.height),t}}]),e}()}();var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();"undefined"==typeof window.ne&&(window.ne={}),ne.Loader=function(){return function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"loadPixmaps",value:function(e){}},{key:"loadAudio",value:function(e){}},{key:"loadJson",value:function(e){}},{key:"pixmap",value:function(e){}},{key:"audio",value:function(e){}},{key:"json",value:function(e){}}],[{key:"clear",value:function(){this.clearPixmaps(),this.clearAudio(),this.clearJson()}},{key:"clearPixmaps",value:function(){}},{key:"clearAudio",value:function(){}},{key:"clearJson",value:function(){}}]),e}()}();