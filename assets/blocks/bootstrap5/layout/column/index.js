/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/bootstrap5/layout/column/components/inspector.js":
/*!*********************************************************************!*\
  !*** ./src/blocks/bootstrap5/layout/column/components/inspector.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Inspector)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../helpers */ "./src/blocks/helpers.js");







class Inspector extends _wordpress_element__WEBPACK_IMPORTED_MODULE_3__.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_helpers__WEBPACK_IMPORTED_MODULE_4__.deviceLayout)('col', this.props));
  }
}

/***/ }),

/***/ "./src/blocks/bootstrap5/layout/column/edit.js":
/*!*****************************************************!*\
  !*** ./src/blocks/bootstrap5/layout/column/edit.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_inspector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/inspector */ "./src/blocks/bootstrap5/layout/column/components/inspector.js");





function Edit(props) {
  const {
    attributes: {
      classNameCol,
      classNameAlignSelf
    }
  } = props;
  const classCol = Object.values(classNameCol).map(c => c).join(' ');
  const classAlignSelf = Object.values(classNameAlignSelf).map(c => c).join(' ');
  const classes = [classCol, classAlignSelf].join('');
  const blockProps = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps)({
    className: classes
  });
  const {
    children,
    ...innerBlocksProps
  } = (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useInnerBlocksProps)(blockProps);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...innerBlocksProps,
    style: {
      border: '2px dashed #cdcdcd',
      padding: '1rem'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_inspector__WEBPACK_IMPORTED_MODULE_3__["default"], {
    ...props
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    style: {
      borderBottom: '2px solid #cdcdcd',
      marginBottom: '.5rem'
    }
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("strong", null, innerBlocksProps['data-title'])), children);
}

/***/ }),

/***/ "./src/blocks/bootstrap5/layout/column/save.js":
/*!*****************************************************!*\
  !*** ./src/blocks/bootstrap5/layout/column/save.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Save)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__);


function Save(props) {
  const {
    attributes: {
      classNameCol,
      classNameAlignSelf
    }
  } = props;
  const classCol = Object.values(classNameCol).map(c => c).join(' ');
  const classAlignSelf = Object.values(classNameAlignSelf).map(c => c).join(' ');
  const classes = [classCol, classAlignSelf].join('');
  const blockProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useBlockProps.save({
    className: classes
  });
  const innerBlocksProps = _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_1__.useInnerBlocksProps.save(blockProps);
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    ...innerBlocksProps
  });
}

/***/ }),

/***/ "./src/blocks/helpers.js":
/*!*******************************!*\
  !*** ./src/blocks/helpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   background: () => (/* binding */ background),
/* harmony export */   deviceLayout: () => (/* binding */ deviceLayout),
/* harmony export */   devices: () => (/* binding */ devices),
/* harmony export */   getCols: () => (/* binding */ getCols),
/* harmony export */   sides: () => (/* binding */ sides)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);


const getCols = (field, key) => {
  if (key === 'xs') {
    key = null;
  }
  const device = `${field}-${key ? key + '-' : ''}`;
  const cols = [];
  if (field === 'row-cols') {
    cols.push({
      label: 'Нет',
      value: ''
    });
    for (let i = 1; i <= 12; i++) {
      if (i > 0) {
        cols.push({
          label: i,
          value: device + i
        });
      }
    }
  } else {
    cols.push({
      label: 'Нет',
      value: ''
    });
    for (let i = 1; i <= 12; i++) {
      cols.push({
        label: i,
        value: device + i
      });
    }
    cols.push({
      label: 'Auto',
      value: device + 'auto'
    });
  }
  return cols;
};
const tabs = () => {
  const _tabs = [];
  devices.forEach(device => {
    _tabs.push({
      name: device,
      title: device,
      className: device
    });
  });
  return _tabs;
};
const deviceLayout = (key, props) => {
  const {
    attributes: {
      classNameCol,
      classNameAlignSelf
    },
    attributes,
    setAttributes
  } = props;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
    tabs: tabs()
  }, tab => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
    title: 'Настройки ' + tab.title,
    initialOpen: true
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: "\u0412\u0435\u0440\u0442\u0438\u043A\u0430\u043B\u044C\u043D\u043E\u0435 \u0432\u044B\u0440\u0430\u0432\u043D\u0438\u0432\u0430\u043D\u0438\u0435",
    options: [{
      label: 'Нет',
      value: ''
    }, {
      label: 'align-self-start',
      value: 'align-self-start'
    }, {
      label: 'align-self-end',
      value: 'align-self-end'
    }, {
      label: 'align-self-center',
      value: 'align-self-center'
    }, {
      label: 'align-self-baseline',
      value: 'align-self-baseline'
    }, {
      label: 'align-self-stretch',
      value: 'align-self-stretch'
    }],
    onChange: value => setAttributes({
      classNameAlignSelf: {
        ...classNameAlignSelf,
        ...{
          [tab.title]: value
        }
      }
    }),
    value: classNameAlignSelf[tab.title],
    help: 'Выравнивание столбца сверху вниз. Это будет применяться ко всем устройствам больших размеров, если не будет переопределено.'
  }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
    label: "\u0421\u0442\u043E\u043B\u0431\u0446\u044B",
    options: getCols('col', tab.title),
    onChange: value => setAttributes({
      classNameCol: {
        ...classNameCol,
        ...{
          [tab.title]: value
        }
      }
    }),
    value: classNameCol[tab.title],
    help: 'Количество столбцов для охвата.'
  })));
};
const devices = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
const sides = ['t', 'b', 's', 'e', 'x', 'y'];
const background = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark', 'tertiary', 'transparent'];


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

/***/ "./src/blocks/bootstrap5/layout/column/block.json":
/*!********************************************************!*\
  !*** ./src/blocks/bootstrap5/layout/column/block.json ***!
  \********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://json.schemastore.org/block.json","apiVersion":2,"name":"isvek-plugin-blocks/column","version":"1.0.0","title":"Столбец","icon":"columns","category":"isvek-plugin-blocks","editorScript":"file:./index.js","attributes":{"classNameCol":{"type":"object","default":{"xs":"","sm":"","md":"","lg":"","xl":"","xxl":""}},"classNameAlignSelf":{"type":"object","default":{"xs":"","sm":"","md":"","lg":"","xl":"","xxl":""}}}}');

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
/*!******************************************************!*\
  !*** ./src/blocks/bootstrap5/layout/column/index.js ***!
  \******************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./block.json */ "./src/blocks/bootstrap5/layout/column/block.json");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/blocks/bootstrap5/layout/column/edit.js");
/* harmony import */ var _save__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./save */ "./src/blocks/bootstrap5/layout/column/save.js");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_1__, {
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  save: _save__WEBPACK_IMPORTED_MODULE_3__["default"]
}));
})();

/******/ })()
;
//# sourceMappingURL=index.js.map