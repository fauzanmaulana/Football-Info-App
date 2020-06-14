var serviceWorkerOption = {
  "assets": [
    "/bundle.js",
    "/index.html",
    "/matches.html",
    "/standings.html",
    "/liked.html"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){(function(e){function t(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var n,r=e.serviceWorkerOption.assets,o=[].concat(function(e){if(Array.isArray(e))return t(e)}(n=r)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(n)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(r):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?t(e,n):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),["./","/src/pages/home.html","/src/script/component/competition-list.js","/src/script/component/competition-item.js","/src/script/data/football.js","/src/assets/landing.png","/src/assets/icon.png","/src/manifest.json"]);console.log(o),self.addEventListener("install",(function(e){e.waitUntil(caches.open("tesv4").then((function(e){return console.log("ini install sw"),e.addAll(o)})))})),self.addEventListener("fetch",(function(e){e.request.url.indexOf("https://api.football-data.org/")>-1?e.respondWith(caches.open("tesv4").then((function(t){return fetch(e.request).then((function(n){return t.put(e.request.url,n.clone()),n}))}))):e.respondWith(caches.match(e.request,{ignoreSearch:!0}).then((function(t){return t||fetch(e.request)})))})),self.addEventListener("fetch",(function(e){e.respondWith(caches.match(e.request,{cacheName:"tesv4"}).then((function(t){return t?(console.log("ServiceWorker: Gunakan aset dari cache: ",t.url),t):(console.log("ServiceWorker: Memuat aset dari server: ",e.request.url),fetch(e.request))})))})),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if("tesv4"!=e)return console.log("ServiceWorker: cache "+e+" dihapus"),caches.delete(e)})))})))}))}).call(this,n(1))},function(e,t){function n(e){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var r;r=function(){return this}();try{r=r||new Function("return this")()}catch(e){"object"===("undefined"==typeof window?"undefined":n(window))&&(r=window)}e.exports=r}]);