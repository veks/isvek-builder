/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/yandex-maps/components/inspector.js":
/*!********************************************************!*\
  !*** ./src/blocks/yandex-maps/components/inspector.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Inspector)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);




class Inspector extends _wordpress_element__WEBPACK_IMPORTED_MODULE_1__.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      attributes: {
        zoom,
        width,
        height,
        placemarkColor,
        address,
        substituteAddress
      },
      setAttributes
    } = this.props;
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, null, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.PanelBody, {
      title: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
      initialOpen: true
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: "\u0428\u0438\u0440\u0438\u043D\u0430 \u043A\u0430\u0440\u0442\u044B",
      help: "\u0428\u0438\u0440\u0438\u043D\u0430 \u0432 \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u0430\u0445",
      value: width,
      onChange: value => setAttributes({
        width: value
      }),
      renderTooltipContent: value => `${value}%`,
      min: 1,
      max: 100
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: "\u0412\u044B\u0441\u043E\u0442\u0430 \u043A\u0430\u0440\u0442\u044B",
      help: "\u0412\u044B\u0441\u043E\u0442\u0430 \u0432 \u043F\u0438\u043A\u0441\u0435\u043B\u044F\u0445 \u043C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u0440\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 1000px",
      value: height,
      onChange: value => setAttributes({
        height: value
      }),
      renderTooltipContent: value => `${value}px`,
      min: 1,
      max: 1000
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.RangeControl, {
      label: "\u0417\u0443\u043C",
      value: zoom,
      onChange: value => setAttributes({
        zoom: value
      }),
      min: 0,
      max: 21
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ToggleControl, {
      label: "\u041F\u043E\u0434\u0441\u0442\u0430\u0432\u043B\u044F\u0442\u044C \u0430\u0434\u0440\u0435\u0441 \u0441 \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0439 \u043A\u0430\u0440\u0442\u044B",
      checked: substituteAddress,
      onChange: value => setAttributes({
        substituteAddress: value
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextareaControl, {
      label: "\u0410\u0434\u0440\u0435\u0441\u0441",
      value: address,
      onChange: value => setAttributes({
        address: value
      })
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.PanelColorSettings, {
      title: "\u0426\u0432\u0435\u0442\u0430",
      colorSettings: [{
        value: placemarkColor,
        onChange: value => setAttributes({
          placemarkColor: value
        }),
        label: 'Цвет маркера'
      }]
    })));
  }
}

/***/ }),

/***/ "./src/blocks/yandex-maps/edit.js":
/*!****************************************!*\
  !*** ./src/blocks/yandex-maps/edit.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_yandex_maps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-yandex-maps */ "./node_modules/react-yandex-maps/dist/production/react-yandex-maps.esm.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_inspector_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/inspector.js */ "./src/blocks/yandex-maps/components/inspector.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./editor.scss */ "./src/blocks/yandex-maps/editor.scss");






function Edit(props) {
  const {
    attributes: {
      blockId,
      coords,
      zoom,
      width,
      height,
      placemarkColor,
      address,
      substituteAddress
    },
    clientId,
    setAttributes
  } = props;
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => setAttributes({
    blockId: clientId
  }), [setAttributes]);
  const maps = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
  const [oldCoords, setOldCoords] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(coords);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)()
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_inspector_js__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...props
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_yandex_maps__WEBPACK_IMPORTED_MODULE_5__.YMaps, {
    query: {
      lang: 'ru_RU',
      apikey: isvekPluginYandexMapsArgs.key,
      load: 'package.full'
    },
    options: {
      searchControlProvider: 'yandex#search'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_yandex_maps__WEBPACK_IMPORTED_MODULE_5__.Map, {
    defaultState: {
      center: coords,
      zoom: zoom,
      type: 'yandex#map'
    },
    state: {
      center: oldCoords,
      zoom: zoom
    },
    className: `yandex-map yandex-map-${blockId}`,
    style: {
      position: 'relative',
      pointerEvents: 'none',
      width: width + '%',
      height: height + 'px'
    },
    width: width + '%',
    height: height + 'px',
    onClick: event => {
      setAttributes({
        coords: event.get('coords')
      });
      {
        substituteAddress && maps.current.geocode(event.get('coords')).then(res => {
          let firstGeoObject = res.geoObjects.get(0);
          setAttributes({
            address: firstGeoObject.getAddressLine()
          });
        });
      }
    },
    onLoad: ymaps => {
      maps.current = ymaps;
      document.querySelectorAll(`.wp-block-isvek-plugin-blocks-yandex-maps`).forEach(elementBlock => {
        elementBlock.addEventListener('click', () => {
          document.querySelectorAll('.yandex-map').forEach(element => {
            element.style.pointerEvents = 'auto';
          });
        });
        elementBlock.addEventListener('mouseleave', () => {
          document.querySelectorAll('.yandex-map').forEach(element => {
            element.style.pointerEvents = 'none';
          });
        });
      });
      setOldCoords(coords);
    },
    onBoundsChange: event => setAttributes({
      zoom: event.originalEvent.newZoom
    })
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(react_yandex_maps__WEBPACK_IMPORTED_MODULE_5__.Placemark, {
    geometry: coords,
    properties: {
      iconCaption: address,
      balloonContent: address
    },
    options: {
      iconColor: placemarkColor,
      iconImageSize: [32, 32],
      iconCaptionMaxWidth: '500'
    }
  }))));
}

/***/ }),

/***/ "./src/blocks/yandex-maps/save.js":
/*!****************************************!*\
  !*** ./src/blocks/yandex-maps/save.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
function Save() {
  return null;
}

/***/ }),

/***/ "./src/blocks/yandex-maps/editor.scss":
/*!********************************************!*\
  !*** ./src/blocks/yandex-maps/editor.scss ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/react-yandex-maps/dist/production/react-yandex-maps.esm.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/react-yandex-maps/dist/production/react-yandex-maps.esm.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ at),
/* harmony export */   Circle: () => (/* binding */ wt),
/* harmony export */   Clusterer: () => (/* binding */ Ot),
/* harmony export */   FullscreenControl: () => (/* binding */ ct),
/* harmony export */   GeoObject: () => (/* binding */ Ct),
/* harmony export */   GeolocationControl: () => (/* binding */ ut),
/* harmony export */   ListBox: () => (/* binding */ pt),
/* harmony export */   ListBoxItem: () => (/* binding */ ft),
/* harmony export */   Map: () => (/* binding */ ot),
/* harmony export */   ObjectManager: () => (/* binding */ _t),
/* harmony export */   Panorama: () => (/* binding */ st),
/* harmony export */   Placemark: () => (/* binding */ Pt),
/* harmony export */   Polygon: () => (/* binding */ Rt),
/* harmony export */   Polyline: () => (/* binding */ St),
/* harmony export */   Rectangle: () => (/* binding */ Mt),
/* harmony export */   RouteButton: () => (/* binding */ lt),
/* harmony export */   RouteEditor: () => (/* binding */ mt),
/* harmony export */   RoutePanel: () => (/* binding */ dt),
/* harmony export */   RulerControl: () => (/* binding */ yt),
/* harmony export */   SearchControl: () => (/* binding */ ht),
/* harmony export */   TrafficControl: () => (/* binding */ vt),
/* harmony export */   TypeSelector: () => (/* binding */ bt),
/* harmony export */   YMaps: () => (/* binding */ Z),
/* harmony export */   ZoomControl: () => (/* binding */ jt),
/* harmony export */   withYMaps: () => (/* binding */ N)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof __webpack_require__.g?__webpack_require__.g:"undefined"!=typeof self?self:{};function n(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function o(t,e){return t(e={exports:{}},e.exports),e.exports}var r="function"==typeof Symbol&&Symbol.for,s=r?Symbol.for("react.element"):60103,i=r?Symbol.for("react.portal"):60106,a=r?Symbol.for("react.fragment"):60107,c=r?Symbol.for("react.strict_mode"):60108,u=r?Symbol.for("react.profiler"):60114,p=r?Symbol.for("react.provider"):60109,f=r?Symbol.for("react.context"):60110,l=r?Symbol.for("react.async_mode"):60111,m=r?Symbol.for("react.concurrent_mode"):60111,d=r?Symbol.for("react.forward_ref"):60112,y=r?Symbol.for("react.suspense"):60113,h=r?Symbol.for("react.suspense_list"):60120,v=r?Symbol.for("react.memo"):60115,b=r?Symbol.for("react.lazy"):60116,j=r?Symbol.for("react.block"):60121,O=r?Symbol.for("react.fundamental"):60117,_=r?Symbol.for("react.responder"):60118,g=r?Symbol.for("react.scope"):60119;function E(t){if("object"==typeof t&&null!==t){var e=t.$$typeof;switch(e){case s:switch(t=t.type){case l:case m:case a:case u:case c:case y:return t;default:switch(t=t&&t.$$typeof){case f:case d:case b:case v:case p:return t;default:return e}}case i:return e}}}function C(t){return E(t)===m}var w={AsyncMode:l,ConcurrentMode:m,ContextConsumer:f,ContextProvider:p,Element:s,ForwardRef:d,Fragment:a,Lazy:b,Memo:v,Portal:i,Profiler:u,StrictMode:c,Suspense:y,isAsyncMode:function(t){return C(t)||E(t)===l},isConcurrentMode:C,isContextConsumer:function(t){return E(t)===f},isContextProvider:function(t){return E(t)===p},isElement:function(t){return"object"==typeof t&&null!==t&&t.$$typeof===s},isForwardRef:function(t){return E(t)===d},isFragment:function(t){return E(t)===a},isLazy:function(t){return E(t)===b},isMemo:function(t){return E(t)===v},isPortal:function(t){return E(t)===i},isProfiler:function(t){return E(t)===u},isStrictMode:function(t){return E(t)===c},isSuspense:function(t){return E(t)===y},isValidElementType:function(t){return"string"==typeof t||"function"==typeof t||t===a||t===m||t===u||t===c||t===y||t===h||"object"==typeof t&&null!==t&&(t.$$typeof===b||t.$$typeof===v||t.$$typeof===p||t.$$typeof===f||t.$$typeof===d||t.$$typeof===O||t.$$typeof===_||t.$$typeof===g||t.$$typeof===j)},typeOf:E};o(function(t,e){}),o(function(t){t.exports=w}),Object,Object,Object,function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},n=0;n<10;n++)e["_"+String.fromCharCode(n)]=n;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(t){o[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},o)).join("")}catch(t){return!1}}()&&Object;var P="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";function R(){}function S(){}Function.call.bind(Object.prototype.hasOwnProperty),S.resetWarningCache=R;var M=o(function(t){t.exports=function(){function t(t,e,n,o,r,s){if(s!==P){var i=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw i.name="Invariant Violation",i}}function e(){return t}t.isRequired=t;var n={array:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:S,resetWarningCache:R};return n.PropTypes=n,n}()}),x=n(o(function(t,e){Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){return t.displayName||t.name||("string"==typeof t&&t.length>0?t:"Unknown")}})),T=function(t,e){var n={};for(var o in t)-1===e.indexOf(o)&&(n[o]=t[o]);return n},k="__global_unique_id__",$=function(){return e[k]=(e[k]||0)+1},A=function(){},U=o(function(e,n){n.__esModule=!0;var o=s(M),r=s($);function s(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function c(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}s(A),n.default=function(e,n){var s,u,p="__create-react-context-"+(0,r.default)()+"__",f=function(t){function e(){var n,o,r,s;i(this,e);for(var c=arguments.length,u=Array(c),p=0;p<c;p++)u[p]=arguments[p];return n=o=a(this,t.call.apply(t,[this].concat(u))),o.emitter=(r=o.props.value,s=[],{on:function(t){s.push(t)},off:function(t){s=s.filter(function(e){return e!==t})},get:function(){return r},set:function(t,e){r=t,s.forEach(function(t){return t(r,e)})}}),a(o,n)}return c(e,t),e.prototype.getChildContext=function(){var t;return(t={})[p]=this.emitter,t},e.prototype.componentWillReceiveProps=function(t){if(this.props.value!==t.value){var e=this.props.value,o=t.value,r=void 0;((s=e)===(i=o)?0!==s||1/s==1/i:s!=s&&i!=i)?r=0:(r="function"==typeof n?n(e,o):1073741823,0!=(r|=0)&&this.emitter.set(t.value,r))}var s,i},e.prototype.render=function(){return this.props.children},e}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));f.childContextTypes=((s={})[p]=o.default.object.isRequired,s);var l=function(t){function n(){var e,o;i(this,n);for(var r=arguments.length,s=Array(r),c=0;c<r;c++)s[c]=arguments[c];return e=o=a(this,t.call.apply(t,[this].concat(s))),o.state={value:o.getValue()},o.onUpdate=function(t,e){0!=((0|o.observedBits)&e)&&o.setState({value:o.getValue()})},a(o,e)}return c(n,t),n.prototype.componentWillReceiveProps=function(t){var e=t.observedBits;this.observedBits=null==e?1073741823:e},n.prototype.componentDidMount=function(){this.context[p]&&this.context[p].on(this.onUpdate);var t=this.props.observedBits;this.observedBits=null==t?1073741823:t},n.prototype.componentWillUnmount=function(){this.context[p]&&this.context[p].off(this.onUpdate)},n.prototype.getValue=function(){return this.context[p]?this.context[p].get():e},n.prototype.render=function(){return(t=this.props.children,Array.isArray(t)?t[0]:t)(this.state.value);var t},n}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));return l.contextTypes=((u={})[p]=o.default.object,u),{Provider:f,Consumer:l}},e.exports=n.default});n(U);var B=n(o(function(e,n){n.__esModule=!0;var o=s((react__WEBPACK_IMPORTED_MODULE_0___default())),r=s(U);function s(t){return t&&t.__esModule?t:{default:t}}n.default=o.default.createContext||r.default,e.exports=n.default})),D=B(null),L=function(e){var n=x(e);return function(o){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D.Consumer,null,function(r){if(null===r)throw new Error("Couldn't find Yandex.Maps API in the context. Make sure that <"+n+" /> is inside <YMaps /> provider");return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(e,Object.assign({},{ymaps:r},o))})}},F=B(null),W=function(e){return function(n){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F.Consumer,null,function(o){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(e,Object.assign({},{parent:o},n))})}};function N(e,n,o){void 0===n&&(n=!1),void 0===o&&(o=[]);var r=function(r){function s(){r.call(this),this.state={loading:!0},this._isMounted=!1}return r&&(s.__proto__=r),(s.prototype=Object.create(r&&r.prototype)).constructor=s,s.prototype.componentDidMount=function(){var t=this;this._isMounted=!0,this.props.ymaps.load().then(function(e){return Promise.all(o.concat(t.props.modules).map(e.loadModule)).then(function(){!0===t._isMounted&&t.setState({loading:!1},function(){t.props.onLoad(e)})})}).catch(function(e){!0===t._isMounted&&t.props.onError(e)})},s.prototype.componentWillUnmount=function(){this._isMounted=!1},s.prototype.render=function(){var o=this.props.ymaps,r=!1===n||!1===this.state.loading,s=T(this.props,["onLoad","onError","modules","ymaps"]);return r&&react__WEBPACK_IMPORTED_MODULE_0___default().createElement(e,Object.assign({},{ymaps:o.getApi()},s))},s}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));return r.defaultProps={onLoad:Function.prototype,onError:Function.prototype,modules:[]},L(r)}var q={lang:"ru_RU",load:"",ns:"",mode:"release"},z={},I=function(t){var e=Date.now().toString(32);this.options=t,this.namespace=t.query.ns||q.ns,this.onload="__yandex-maps-api-onload__$$"+e,this.onerror="__yandex-maps-api-onerror__$$"+e};I.prototype.getApi=function(){return"undefined"!=typeof window&&this.namespace?window[this.namespace]:this.api},I.prototype.setApi=function(t){return this.api=t},I.prototype.getPromise=function(){return this.namespace?z[this.namespace]:this.promise},I.prototype.setPromise=function(t){return this.namespace?z[this.namespace]=this.promise=t:this.promise=t},I.prototype.load=function(){var t=this;if(this.getApi())return Promise.resolve(this.setApi(this.getApi()));if(this.getPromise())return this.setPromise(this.getPromise());var e=Object.assign({onload:this.onload,onerror:this.onerror},q,this.options.query),n=Object.keys(e).map(function(t){return t+"="+e[t]}).join("&"),o=["https://"+(this.options.enterprise?"enterprise.":"")+"api-maps.yandex.ru",this.options.version,"?"+n].join("/"),r=new Promise(function(e,n){window[t.onload]=function(n){delete window[t.onload],n.loadModule=t.loadModule.bind(t),n.ready(function(){return e(t.setApi(n))})},window[t.onerror]=function(e){delete window[t.onerror],n(e)},t.fetchScript(o).catch(window[t.onerror])});return this.setPromise(r)},I.prototype.fetchScript=function(t){var e=this;return new Promise(function(n,o){e.script=document.createElement("script"),e.script.type="text/javascript",e.script.onload=n,e.script.onerror=o,e.script.src=t,e.script.async="async",document.head.appendChild(e.script)})},I.prototype.loadModule=function(t){var e=this;return new Promise(function(n,o){e.getApi().modules.require(t,function(o){!function(t,e,n,o){void 0===o&&(o=!1),e="string"==typeof e?e.split("."):e.slice();for(var r,s=t;e.length>1;)s[r=e.shift()]||(s[r]={}),s=s[r];s[e[0]]=!0===o&&s[e[0]]||n}(e.api,t,o,!0),n(o)},o,e.getApi())})},I._name="__react-yandex-maps__";var Z=function(e){function n(t){e.call(this,t),this.ymaps=new I(t)}return e&&(n.__proto__=e),(n.prototype=Object.create(e&&e.prototype)).constructor=n,n.prototype.componentDidMount=function(){!0===this.props.preload&&this.ymaps.load()},n.prototype.render=function(){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D.Provider,{value:this.ymaps},this.props.children)},n}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));Z.defaultProps={version:"2.1",enterprise:!1,query:{lang:"ru_RU",load:"",ns:""},preload:!1};var G=/^on(?=[A-Z])/;function V(t){return Object.keys(t).reduce(function(e,n){if(G.test(n)){var o=n.replace(G,"").toLowerCase();e._events[o]=t[n]}else e[n]=t[n];return e},{_events:{}})}function Y(t,e,n){"function"==typeof n&&t.events.add(e,n)}function H(t,e,n){"function"==typeof n&&t.events.remove(e,n)}function J(t,e,n){Object.keys(Object.assign({},e,n)).forEach(function(o){e[o]!==n[o]&&(H(t,o,e[o]),Y(t,o,n[o]))})}var K=function(t){return"default"+t.charAt(0).toUpperCase()+t.slice(1)};function Q(t,e){return void 0!==t[e]||void 0===t[K(e)]}function X(t,e,n){return(Q(t,e)?t[e]:t[K(e)])||n}function tt(t,e,n){if(void 0===n&&(n=null),t!==e){if(t&&(t.hasOwnProperty("current")?t.current=null:"function"==typeof t&&t(null)),!e)return;e.hasOwnProperty("current")?e.current=n:"function"==typeof e&&e(n)}}function et(t){var e=t.width,n=t.height,o=t.style,r=t.className;return void 0!==o||void 0!==r?Object.assign({},o&&{style:o},r&&{className:r}):{style:{width:e,height:n}}}var nt=function(e){function n(){var t=this;e.call(this),this.state={instance:null},this._parentElement=null,this._getRef=function(e){t._parentElement=e}}return e&&(n.__proto__=e),(n.prototype=Object.create(e&&e.prototype)).constructor=n,n.prototype.componentDidMount=function(){var t=n.mountObject(this._parentElement,this.props.ymaps.Map,this.props);this.setState({instance:t})},n.prototype.componentDidUpdate=function(t){null!==this.state.instance&&n.updateObject(this.state.instance,t,this.props)},n.prototype.componentWillUnmount=function(){n.unmountObject(this.state.instance,this.props)},n.prototype.render=function(){var e=et(this.props),n=V(this.props),o=T(n,["_events","state","defaultState","options","defaultOptions","instanceRef","ymaps","children","width","height","style","className"]);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F.Provider,{value:this.state.instance},react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",Object.assign({},{ref:this._getRef},e,o),this.props.children))},n.mountObject=function(t,e,n){var o=V(n),r=o.instanceRef,s=o._events,i=new e(t,X(n,"state"),X(n,"options"));return Object.keys(s).forEach(function(t){return Y(i,t,s[t])}),tt(null,r,i),i},n.updateObject=function(t,e,n){var o=V(n),r=o._events,s=o.instanceRef,i=V(e),a=i._events,c=i.instanceRef;if(Q(n,"state")){var u=X(e,"state",{}),p=X(n,"state",{});u.type!==p.type&&t.setType(p.type),u.behaviors!==p.behaviors&&(u.behaviors&&t.behaviors.disable(u.behaviors),p.behaviors&&t.behaviors.enable(p.behaviors)),p.zoom&&u.zoom!==p.zoom&&t.setZoom(p.zoom),p.center&&u.center!==p.center&&t.setCenter(p.center),p.bounds&&u.bounds!==p.bounds&&t.setBounds(p.bounds)}if(Q(n,"options")){var f=X(e,"options"),l=X(n,"options",{});f!==l&&t.options.set(l)}X(e,"width")===X(n,"width")&&X(e,"height")===X(n,"height")||t.container.fitToViewport(),J(t,a,r),tt(c,s,t)},n.unmountObject=function(t,e){var n=V(e),o=n.instanceRef,r=n._events;null!==t&&(Object.keys(r).forEach(function(e){return H(t,e,r[e])}),t.destroy(),tt(o))},n}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));nt.defaultProps={width:320,height:240};var ot=N(nt,!0,["Map"]),rt=function(e){function n(){var t=this;e.call(this),this.state={instance:null},this._parentElement=null,this._getRef=function(e){t._parentElement=e}}return e&&(n.__proto__=e),(n.prototype=Object.create(e&&e.prototype)).constructor=n,n.prototype.componentDidMount=function(){var t=this;this._mounted=!0,this.props.ymaps.panorama.isSupported()&&n.mountObject(this._parentElement,this.props.ymaps.panorama,this.props).then(function(e){return t._mounted&&t.setState({instance:e})})},n.prototype.componentDidUpdate=function(t){null!==this.state.instance&&n.updateObject(this.state.instance,t,this.props)},n.prototype.componentWillUnmount=function(){this._mounted=!1,n.unmountObject(this.state.instance,this.props)},n.prototype.render=function(){var e=et(this.props);return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div",Object.assign({},{ref:this._getRef},e))},n.mountObject=function(t,e,n){var o=V(n),r=o.instanceRef,s=o._events,i=X(n,"point"),a=X(n,"locateOptions"),c=X(n,"options");return new Promise(function(n,o){e.locate(i,a).done(function(o){if(o.length>0){var i=new e.Player(t,o[0],c);tt(null,r,i),Object.keys(s).forEach(function(t){return Y(i,t,s[t])}),n(i)}},o)})},n.updateObject=function(t,e,n){var o=V(n),r=o._events,s=o.instanceRef,i=V(e),a=i._events,c=i.instanceRef;if(Q(n,"options")){var u=X(e,"options"),p=X(n,"options");u!==p&&t.options.set(p)}if(Q(n,"point")){var f=X(n,"point"),l=X(e,"point"),m=X(n,"locateOptions");f!==l&&t.moveTo(f,m)}J(t,a,r),tt(c,s,t)},n.unmountObject=function(t,e){var n=V(e),o=n.instanceRef,r=n._events;null!==t&&(Object.keys(r).forEach(function(e){return H(t,e,r[e])}),tt(o))},n}((react__WEBPACK_IMPORTED_MODULE_0___default().Component));rt.defaultProps={width:320,height:240};var st=N(rt,!0,["panorama.isSupported","panorama.locate","panorama.createPlayer","panorama.Player"]),it=function(e){function n(){e.call(this),this.state={instance:null}}return e&&(n.__proto__=e),(n.prototype=Object.create(e&&e.prototype)).constructor=n,n.prototype.componentDidMount=function(){var t=n.mountControl(this.props.ymaps.control[this.props.name],this.props);this.setState({instance:t})},n.prototype.componentDidUpdate=function(t){null!==this.state.instance&&n.updateControl(this.state.instance,t,this.props)},n.prototype.componentWillUnmount=function(){n.unmountControl(this.state.instance,this.props)},n.prototype.render=function(){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F.Provider,{value:this.state.instance},this.props.children)},n.mountControl=function(t,e){var n=V(e),o=n.instanceRef,r=n.parent,s=n.lazy,i=n._events,a=new t({data:X(e,"data"),options:X(e,"options"),state:X(e,"state"),mapTypes:X(e,"mapTypes"),lazy:s});if(Object.keys(i).forEach(function(t){return Y(a,t,i[t])}),r&&r.controls&&"function"==typeof r.controls.add)r.controls.add(a);else{if(!r||!r.add||"function"!=typeof r.add)throw new Error("No parent found to mount "+e.name);r.add(a)}return tt(null,o,a),a},n.updateControl=function(t,e,n){var o=V(n),r=o._events,s=o.instanceRef,i=V(e),a=i._events,c=i.instanceRef;if(Q(n,"options")){var u=X(e,"options"),p=X(n,"options");u!==p&&t.options.set(p)}if(Q(n,"data")){var f=X(e,"data"),l=X(n,"data");f!==l&&t.data.set(l)}if(Q(n,"state")){var m=X(e,"state"),d=X(n,"state");m!==d&&t.state.set(d)}if(Q(n,"mapTypes")){var y=X(e,"mapTypes"),h=X(n,"mapTypes");y!==h&&(t.removeAllMapTypes(),h.forEach(function(e){return t.addMapType(e)}))}J(t,a,r),tt(c,s,t)},n.unmountControl=function(t,e){var n=V(e),o=n.instanceRef,r=n.parent,s=n._events;null!==t&&(Object.keys(s).forEach(function(e){return H(t,e,s[e])}),r.controls&&"function"==typeof r.controls.remove?r.controls.remove(t):r.remove&&"function"==typeof r.remove&&r.remove(t),tt(o))},n}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),at=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"Button"}))},!0,["control.Button"])),ct=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"FullscreenControl"}))},!0,["control.FullscreenControl"])),ut=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"GeolocationControl"}))},!0,["control.GeolocationControl"])),pt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"ListBox"}))},!0,["control.ListBox"])),ft=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"ListBoxItem"}))},!0,["control.ListBoxItem"])),lt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"RouteButton"}))},!0,["control.RouteButton"])),mt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"RouteEditor"}))},!0,["control.RouteEditor"])),dt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"RoutePanel"}))},!0,["control.RoutePanel"])),yt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"RulerControl"}))},!0,["control.RulerControl"])),ht=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"SearchControl"}))},!0,["control.SearchControl"])),vt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"TrafficControl"}))},!0,["control.TrafficControl"])),bt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"TypeSelector"}))},!0,["control.TypeSelector"])),jt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(it,Object.assign({},e,{name:"ZoomControl"}))},!0,["control.ZoomControl"])),Ot=W(N(function(e){function n(){e.call(this),this.state={instance:null}}return e&&(n.__proto__=e),(n.prototype=Object.create(e&&e.prototype)).constructor=n,n.prototype.componentDidMount=function(){var t=n.mountObject(this.props.ymaps.Clusterer,this.props);this.setState({instance:t})},n.prototype.componentDidUpdate=function(t){null!==this.state.instance&&n.updateObject(this.state.instance,t,this.props)},n.prototype.componentWillUnmount=function(){n.unmountObject(this.state.instance,this.props)},n.prototype.render=function(){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(F.Provider,{value:this.state.instance},this.props.children)},n.mountObject=function(t,e){var n=V(e),o=n.instanceRef,r=n.parent,s=n._events,i=new t(X(e,"options"));if(Object.keys(s).forEach(function(t){return Y(i,t,s[t])}),r.geoObjects&&"function"==typeof r.geoObjects.add)r.geoObjects.add(i);else{if(!r.add||"function"!=typeof r.add)throw new Error("No parent found to mount Clusterer");r.add(i)}return tt(null,o,i),i},n.updateObject=function(t,e,n){var o=V(n),r=o._events,s=o.instanceRef,i=V(e),a=i._events,c=i.instanceRef;if(Q(n,"options")){var u=X(e,"options"),p=X(n,"options");u!==p&&t.options.set(p)}J(t,a,r),tt(c,s,t)},n.unmountObject=function(t,e){var n=V(e),o=n.instanceRef,r=n.parent,s=n._events;null!==t&&(Object.keys(s).forEach(function(e){return H(t,e,s[e])}),r.geoObjects&&"function"==typeof r.geoObjects.remove?r.geoObjects.remove(t):r.remove&&"function"==typeof r.remove&&r.remove(t),tt(o))},n}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),!0,["Clusterer"])),_t=W(N(function(t){function e(){t.call(this),this.state={instance:null}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.componentDidMount=function(){var t=e.mountObject(this.props.ymaps.ObjectManager,this.props);this.setState({instance:t})},e.prototype.componentDidUpdate=function(t){null!==this.state.instance&&e.updateObject(this.state.instance,t,this.props)},e.prototype.componentWillUnmount=function(){e.unmountObject(this.state.instance,this.props)},e.prototype.render=function(){return null},e.mountObject=function(t,e){var n=V(e),o=n.instanceRef,r=n.parent,s=n._events,i=X(e,"options",{}),a=X(e,"features",{}),c=X(e,"filter",null),u=X(e,"objects",{}),p=X(e,"clusters",{}),f=new t(i);if(f.add(a||[]),f.setFilter(c),f.objects.options.set(u),f.clusters.options.set(p),Object.keys(s).forEach(function(t){return Y(f,t,s[t])}),r.geoObjects&&"function"==typeof r.geoObjects.add)r.geoObjects.add(f);else{if(!r.add||"function"!=typeof r.add)throw new Error("No parent found to mount ObjectManager");r.add(f)}return tt(null,o,f),f},e.updateObject=function(t,e,n){var o=V(n),r=o._events,s=o.instanceRef,i=V(e),a=i._events,c=i.instanceRef;if(Q(n,"options")){var u=X(e,"options"),p=X(n,"options");u!==p&&t.options.set(p)}if(Q(n,"objects")){var f=X(e,"objects"),l=X(n,"objects");f!==l&&t.objects.options.set(l)}if(Q(n,"clusters")){var m=X(e,"clusters"),d=X(n,"clusters");m!==d&&t.clusters.options.set(d)}if(Q(n,"filter")){var y=X(e,"filter"),h=X(n,"filter");y!==h&&t.setFilter(h)}if(Q(n,"features")){var v=X(e,"features"),b=X(n,"features");v!==b&&(t.remove(v),t.add(b))}J(t,a,r),tt(c,s,t)},e.unmountObject=function(t,e){var n=V(e),o=n.instanceRef,r=n.parent,s=n._events;null!==t&&(Object.keys(s).forEach(function(e){return H(t,e,s[e])}),r.geoObjects&&"function"==typeof r.geoObjects.remove?r.geoObjects.remove(t):r.remove&&"function"==typeof r.remove&&r.remove(t),tt(o))},e}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),!0,["ObjectManager"])),gt=function(t){function e(){t.call(this),this.state={instance:null}}return t&&(e.__proto__=t),(e.prototype=Object.create(t&&t.prototype)).constructor=e,e.prototype.componentDidMount=function(){var t=this.props,n=t.name,o=t.ymaps,r=t.dangerZone,s=e.mountObject(r&&"function"==typeof r.modifyConstructor?r.modifyConstructor(o[n]):o[n],this.props);this.setState({instance:s})},e.prototype.componentDidUpdate=function(t){null!==this.state.instance&&e.updateObject(this.state.instance,t,this.props)},e.prototype.componentWillUnmount=function(){e.unmountObject(this.state.instance,this.props)},e.prototype.render=function(){return null},e.mountObject=function(t,e){var n=V(e),o=n.instanceRef,r=n.parent,s=n._events,i=new t(X(e,"geometry"),X(e,"properties"),X(e,"options"));if(Object.keys(s).forEach(function(t){return Y(i,t,s[t])}),r&&r.geoObjects&&"function"==typeof r.geoObjects.add)r.geoObjects.add(i);else{if(!r||!r.add||"function"!=typeof r.add)throw new Error("No parent found to mount "+e.name);r.add(i)}return tt(null,o,i),i},e.updateObject=function(t,e,n){var o=V(n),r=o._events,s=o.instanceRef,i=V(e),a=i._events,c=i.instanceRef;if(Q(n,"geometry")){var u=X(e,"geometry",{}),p=X(n,"geometry",{});Array.isArray(p)&&p!==u?Array.isArray(p[0])&&"number"==typeof p[1]?(t.geometry.setCoordinates(p[0]),t.geometry.setRadius(p[1])):t.geometry.setCoordinates(p):"object"==typeof p&&(p.coordinates!==u.coordinates&&t.geometry.setCoordinates(p.coordinates),p.radius!==u.radius&&t.geometry.setRadius(p.radius))}if(Q(n,"properties")){var f=X(e,"properties"),l=X(n,"properties");f!==l&&t.properties.set(l)}if(Q(n,"options")){var m=X(e,"options"),d=X(n,"options");m!==d&&t.options.set(d)}J(t,a,r),tt(c,s,t)},e.unmountObject=function(t,e){var n=V(e),o=n.instanceRef,r=n.parent,s=n._events;null!==t&&(Object.keys(s).forEach(function(e){return H(t,e,s[e])}),r.geoObjects&&"function"==typeof r.geoObjects.remove?r.geoObjects.remove(t):r.remove&&"function"==typeof r.remove&&r.remove(t),tt(o))},e}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)),Et={modifyConstructor:function(t){function e(e,n,o){t.call(this,{geometry:e,properties:n},o)}return e.prototype=t.prototype,e}},Ct=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gt,Object.assign({},e,{name:"GeoObject",dangerZone:Et}))},!0,["GeoObject"])),wt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gt,Object.assign({},e,{name:"Circle"}))},!0,["Circle"])),Pt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gt,Object.assign({},e,{name:"Placemark"}))},!0,["Placemark"])),Rt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gt,Object.assign({},e,{name:"Polygon"}))},!0,["Polygon"])),St=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gt,Object.assign({},e,{name:"Polyline"}))},!0,["Polyline"])),Mt=W(N(function(e){return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gt,Object.assign({},e,{name:"Rectangle"}))},!0,["Rectangle"]));
//# sourceMappingURL=react-yandex-maps.esm.js.map


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "./src/blocks/yandex-maps/block.json":
/*!*******************************************!*\
  !*** ./src/blocks/yandex-maps/block.json ***!
  \*******************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"isvek-plugin-blocks/yandex-maps","version":"1.0.0","title":"Яндекс карты","icon":"location-alt","category":"isvek-plugin-blocks","attributes":{"blockId":{"type":"string","default":""},"coords":{"type":"array","default":[55.75354576483724,37.62163622222895]},"zoom":{"type":"number","default":10},"width":{"type":"number","default":100},"height":{"type":"number","default":400},"placemarkColor":{"type":"string","default":"#000000"},"substituteAddress":{"type":"boolean","default":true},"address":{"type":"string","default":"Россия, Москва, Красная площадь"}},"editorScript":"file:./index.js","editorStyle":"file:./index.css","style":["file:./style.css","isvek-plugin-blocks-yandex-maps"]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************************!*\
  !*** ./src/blocks/yandex-maps/index.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/yandex-maps/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/yandex-maps/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/yandex-maps/save.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
}));
})();

/******/ })()
;
//# sourceMappingURL=index.js.map