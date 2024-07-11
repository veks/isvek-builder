(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
})((function () { 'use strict';

  var ymaps$1 = {
    load: function load() {
      var src = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '//api-maps.yandex.ru/2.1/?lang=en_RU';

      var getNsParamValue = function getNsParamValue() {
        var results = src.match(/[\\?&]ns=([^&#]*)/);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
      };

      if (!this.promise) {
        this.promise = new Promise(function (resolve, reject) {
          var scriptElement = document.createElement('script');
          scriptElement.onload = resolve;
          scriptElement.onerror = reject;
          scriptElement.type = 'text/javascript';
          scriptElement.src = src;
          document.body.appendChild(scriptElement);
        }).then(function () {
          var ns = getNsParamValue();

          if (ns && ns !== 'ymaps') {
            (0, eval)("var ymaps = ".concat(ns, ";"));
          }

          return new Promise(function (resolve) {
            return ymaps.ready(resolve);
          });
        });
      }

      return this.promise;
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    var yandexMapsSelector = document.querySelectorAll('.yandex-maps');
    if (yandexMapsSelector) {
      setTimeout(function () {
        yandexMapsSelector.forEach(function (element) {
          ymaps$1.load("https://api-maps.yandex.ru/2.1/?apikey=".concat(isvekPluginYandexMapsArgs.key, "&lang=ru_RU")).then(function (maps) {
            var coords = element.getAttribute('data-yandex-maps-coords').split(',');
            var zoom = element.getAttribute('data-yandex-maps-zoom');
            var address = element.getAttribute('data-yandex-maps-address');
            var placemarkColor = element.getAttribute('data-yandex-maps-placemarkColor');
            var map = new maps.Map(element, {
              center: [coords[0], coords[1]],
              zoom: zoom
            });
            if (map) {
              document.querySelectorAll('.yandex-maps-placeholder').forEach(function (el) {
                return el.remove();
              });
              element.childNodes[0].style.pointerEvents = 'none';
              element.addEventListener('click', function () {
                element.childNodes[0].style.pointerEvents = 'auto';
              });
              element.addEventListener('mouseleave', function () {
                element.childNodes[0].style.pointerEvents = 'none';
              });
              map.controls.remove('trafficControl');
              map.controls.remove('searchControl');
              map.controls.remove('geolocationControl');
              map.controls.remove('typeSelector');
              map.controls.remove('fullscreenControl');
              map.controls.remove('storage)');
              var placeMark = new maps.Placemark([coords[0], coords[1]], {
                balloonContent: address,
                iconCaption: address
              }, {
                preset: 'islands#greenDotIconWithCaption',
                iconColor: placemarkColor,
                iconCaptionMaxWidth: '500'
              });
              map.geoObjects.add(placeMark);
            }
          })["catch"](function (error) {
            return console.log('Failed to load Yandex Maps', error);
          });
        });
      }, 2500);
    }
  });

}));
//# sourceMappingURL=yandex-maps.js.map
