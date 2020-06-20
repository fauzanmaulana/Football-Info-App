var serviceWorkerOption = {
  "assets": [
    "/bundle.js",
    "/index.html",
    "/home.html",
    "/matches.html",
    "/standings.html",
    "/liked.html",
    "/likedDetail.html"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(e){function t(e,t,n,r,o,i,a){try{var c=e[i](a),u=c.value}catch(e){return void n(e)}c.done?t(u):Promise.resolve(u).then(r,o)}function n(e){return function(){var n=this,r=arguments;return new Promise((function(o,i){var a=e.apply(n,r);function c(e){t(a,o,i,c,u,"next",e)}function u(e){t(a,o,i,c,u,"throw",e)}c(void 0)}))}}function r(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var o,i=e.serviceWorkerOption.assets,a=[].concat(function(e){if(Array.isArray(e))return r(e)}(o=i)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(o)||function(e,t){if(e){if("string"==typeof e)return r(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(e,t):void 0}}(o)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),["./","/src/pages/home.html","/src/pages/matches.html","/src/pages/standings.html","/src/pages/liked.html","/src/pages/likedDetail.html","/src/assets/landing.png","/src/assets/icon.svg","/src/assets/like.png","/src/assets/trash.png","/src/db.js","/src/manifest.json"]);self.addEventListener("install",(function(e){e.waitUntil(caches.open("tesv4").then((function(e){return e.addAll(a)})))})),self.addEventListener("fetch",(function(e){e.request.url.indexOf("https://api.football-data.org/v2")>-1||e.request.url.indexOf("https://upload.wikimedia.org/wikipedia")>-1?e.respondWith(n(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,caches.open("tesv4");case 2:return n=t.sent,t.next=5,fetch(e.request);case 5:return r=t.sent,n.put(e.request.url,r.clone()),t.abrupt("return",r);case 8:case"end":return t.stop()}}),t)})))()):e.respondWith(n(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,caches.match(e.request.url,{ignoreSearch:!0});case 2:if(t.t0=t.sent,t.t0){t.next=7;break}return t.next=6,fetch(e.request);case 6:t.t0=t.sent;case 7:return t.abrupt("return",t.t0);case 8:case"end":return t.stop()}}),t)})))())})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if("tesv4"!==e)return console.log("cache ".concat(e," dihapus")),caches.delete(e)})))})))}))}).call(this,n(1))},function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"===("undefined"==typeof window?"undefined":n(window))&&(r=window)}e.exports=r}]);