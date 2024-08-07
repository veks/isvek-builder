(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.isvekPlugin = {}));
})(this, (function (exports) { 'use strict';

  function _typeof$1(o) {
    "@babel/helpers - typeof";

    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof$1(o);
  }

  function toPrimitive(t, r) {
    if ("object" != _typeof$1(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof$1(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }

  function toPropertyKey(t) {
    var i = toPrimitive(t, "string");
    return "symbol" == _typeof$1(i) ? i : String(i);
  }

  function _defineProperty(obj, key, value) {
    key = toPropertyKey(key);
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }
    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }
  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
        args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);
        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }
        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }
        _next(undefined);
      });
    };
  }

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var regeneratorRuntime$1 = {exports: {}};

  var _typeof = {exports: {}};

  (function (module) {
  	function _typeof(o) {
  	  "@babel/helpers - typeof";

  	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
  	    return typeof o;
  	  } : function (o) {
  	    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
  	}
  	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports; 
  } (_typeof));

  var _typeofExports = _typeof.exports;

  (function (module) {
  	var _typeof = _typeofExports["default"];
  	function _regeneratorRuntime() {
  	  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
  	    return e;
  	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  	  var t,
  	    e = {},
  	    r = Object.prototype,
  	    n = r.hasOwnProperty,
  	    o = Object.defineProperty || function (t, e, r) {
  	      t[e] = r.value;
  	    },
  	    i = "function" == typeof Symbol ? Symbol : {},
  	    a = i.iterator || "@@iterator",
  	    c = i.asyncIterator || "@@asyncIterator",
  	    u = i.toStringTag || "@@toStringTag";
  	  function define(t, e, r) {
  	    return Object.defineProperty(t, e, {
  	      value: r,
  	      enumerable: !0,
  	      configurable: !0,
  	      writable: !0
  	    }), t[e];
  	  }
  	  try {
  	    define({}, "");
  	  } catch (t) {
  	    define = function define(t, e, r) {
  	      return t[e] = r;
  	    };
  	  }
  	  function wrap(t, e, r, n) {
  	    var i = e && e.prototype instanceof Generator ? e : Generator,
  	      a = Object.create(i.prototype),
  	      c = new Context(n || []);
  	    return o(a, "_invoke", {
  	      value: makeInvokeMethod(t, r, c)
  	    }), a;
  	  }
  	  function tryCatch(t, e, r) {
  	    try {
  	      return {
  	        type: "normal",
  	        arg: t.call(e, r)
  	      };
  	    } catch (t) {
  	      return {
  	        type: "throw",
  	        arg: t
  	      };
  	    }
  	  }
  	  e.wrap = wrap;
  	  var h = "suspendedStart",
  	    l = "suspendedYield",
  	    f = "executing",
  	    s = "completed",
  	    y = {};
  	  function Generator() {}
  	  function GeneratorFunction() {}
  	  function GeneratorFunctionPrototype() {}
  	  var p = {};
  	  define(p, a, function () {
  	    return this;
  	  });
  	  var d = Object.getPrototypeOf,
  	    v = d && d(d(values([])));
  	  v && v !== r && n.call(v, a) && (p = v);
  	  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  	  function defineIteratorMethods(t) {
  	    ["next", "throw", "return"].forEach(function (e) {
  	      define(t, e, function (t) {
  	        return this._invoke(e, t);
  	      });
  	    });
  	  }
  	  function AsyncIterator(t, e) {
  	    function invoke(r, o, i, a) {
  	      var c = tryCatch(t[r], t, o);
  	      if ("throw" !== c.type) {
  	        var u = c.arg,
  	          h = u.value;
  	        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
  	          invoke("next", t, i, a);
  	        }, function (t) {
  	          invoke("throw", t, i, a);
  	        }) : e.resolve(h).then(function (t) {
  	          u.value = t, i(u);
  	        }, function (t) {
  	          return invoke("throw", t, i, a);
  	        });
  	      }
  	      a(c.arg);
  	    }
  	    var r;
  	    o(this, "_invoke", {
  	      value: function value(t, n) {
  	        function callInvokeWithMethodAndArg() {
  	          return new e(function (e, r) {
  	            invoke(t, n, e, r);
  	          });
  	        }
  	        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
  	      }
  	    });
  	  }
  	  function makeInvokeMethod(e, r, n) {
  	    var o = h;
  	    return function (i, a) {
  	      if (o === f) throw new Error("Generator is already running");
  	      if (o === s) {
  	        if ("throw" === i) throw a;
  	        return {
  	          value: t,
  	          done: !0
  	        };
  	      }
  	      for (n.method = i, n.arg = a;;) {
  	        var c = n.delegate;
  	        if (c) {
  	          var u = maybeInvokeDelegate(c, n);
  	          if (u) {
  	            if (u === y) continue;
  	            return u;
  	          }
  	        }
  	        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
  	          if (o === h) throw o = s, n.arg;
  	          n.dispatchException(n.arg);
  	        } else "return" === n.method && n.abrupt("return", n.arg);
  	        o = f;
  	        var p = tryCatch(e, r, n);
  	        if ("normal" === p.type) {
  	          if (o = n.done ? s : l, p.arg === y) continue;
  	          return {
  	            value: p.arg,
  	            done: n.done
  	          };
  	        }
  	        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
  	      }
  	    };
  	  }
  	  function maybeInvokeDelegate(e, r) {
  	    var n = r.method,
  	      o = e.iterator[n];
  	    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
  	    var i = tryCatch(o, e.iterator, r.arg);
  	    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
  	    var a = i.arg;
  	    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  	  }
  	  function pushTryEntry(t) {
  	    var e = {
  	      tryLoc: t[0]
  	    };
  	    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  	  }
  	  function resetTryEntry(t) {
  	    var e = t.completion || {};
  	    e.type = "normal", delete e.arg, t.completion = e;
  	  }
  	  function Context(t) {
  	    this.tryEntries = [{
  	      tryLoc: "root"
  	    }], t.forEach(pushTryEntry, this), this.reset(!0);
  	  }
  	  function values(e) {
  	    if (e || "" === e) {
  	      var r = e[a];
  	      if (r) return r.call(e);
  	      if ("function" == typeof e.next) return e;
  	      if (!isNaN(e.length)) {
  	        var o = -1,
  	          i = function next() {
  	            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
  	            return next.value = t, next.done = !0, next;
  	          };
  	        return i.next = i;
  	      }
  	    }
  	    throw new TypeError(_typeof(e) + " is not iterable");
  	  }
  	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
  	    value: GeneratorFunctionPrototype,
  	    configurable: !0
  	  }), o(GeneratorFunctionPrototype, "constructor", {
  	    value: GeneratorFunction,
  	    configurable: !0
  	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
  	    var e = "function" == typeof t && t.constructor;
  	    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  	  }, e.mark = function (t) {
  	    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  	  }, e.awrap = function (t) {
  	    return {
  	      __await: t
  	    };
  	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
  	    return this;
  	  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
  	    void 0 === i && (i = Promise);
  	    var a = new AsyncIterator(wrap(t, r, n, o), i);
  	    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
  	      return t.done ? t.value : a.next();
  	    });
  	  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
  	    return this;
  	  }), define(g, "toString", function () {
  	    return "[object Generator]";
  	  }), e.keys = function (t) {
  	    var e = Object(t),
  	      r = [];
  	    for (var n in e) r.push(n);
  	    return r.reverse(), function next() {
  	      for (; r.length;) {
  	        var t = r.pop();
  	        if (t in e) return next.value = t, next.done = !1, next;
  	      }
  	      return next.done = !0, next;
  	    };
  	  }, e.values = values, Context.prototype = {
  	    constructor: Context,
  	    reset: function reset(e) {
  	      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
  	    },
  	    stop: function stop() {
  	      this.done = !0;
  	      var t = this.tryEntries[0].completion;
  	      if ("throw" === t.type) throw t.arg;
  	      return this.rval;
  	    },
  	    dispatchException: function dispatchException(e) {
  	      if (this.done) throw e;
  	      var r = this;
  	      function handle(n, o) {
  	        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
  	      }
  	      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
  	        var i = this.tryEntries[o],
  	          a = i.completion;
  	        if ("root" === i.tryLoc) return handle("end");
  	        if (i.tryLoc <= this.prev) {
  	          var c = n.call(i, "catchLoc"),
  	            u = n.call(i, "finallyLoc");
  	          if (c && u) {
  	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
  	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
  	          } else if (c) {
  	            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
  	          } else {
  	            if (!u) throw new Error("try statement without catch or finally");
  	            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
  	          }
  	        }
  	      }
  	    },
  	    abrupt: function abrupt(t, e) {
  	      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
  	        var o = this.tryEntries[r];
  	        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
  	          var i = o;
  	          break;
  	        }
  	      }
  	      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
  	      var a = i ? i.completion : {};
  	      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
  	    },
  	    complete: function complete(t, e) {
  	      if ("throw" === t.type) throw t.arg;
  	      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
  	    },
  	    finish: function finish(t) {
  	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
  	        var r = this.tryEntries[e];
  	        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
  	      }
  	    },
  	    "catch": function _catch(t) {
  	      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
  	        var r = this.tryEntries[e];
  	        if (r.tryLoc === t) {
  	          var n = r.completion;
  	          if ("throw" === n.type) {
  	            var o = n.arg;
  	            resetTryEntry(r);
  	          }
  	          return o;
  	        }
  	      }
  	      throw new Error("illegal catch attempt");
  	    },
  	    delegateYield: function delegateYield(e, r, n) {
  	      return this.delegate = {
  	        iterator: values(e),
  	        resultName: r,
  	        nextLoc: n
  	      }, "next" === this.method && (this.arg = t), y;
  	    }
  	  }, e;
  	}
  	module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports; 
  } (regeneratorRuntime$1));

  var regeneratorRuntimeExports = regeneratorRuntime$1.exports;

  // TODO(Babel 8): Remove this file.

  var runtime = regeneratorRuntimeExports();
  var regenerator = runtime;

  // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }

  var _regeneratorRuntime = /*@__PURE__*/getDefaultExportFromCjs(regenerator);

  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  var im = new Inputmask('8 (999) 999-99-99');
  function ContactForms(options) {
    document.addEventListener('DOMContentLoaded', function () {
      var defaultOption = {
        target: '.ib-contact-forms',
        url: null,
        googleKey: null,
        action: null,
        googleScriptLoadTimeout: 0
      };
      var _Object$assign = Object.assign({}, defaultOption, options),
        target = _Object$assign.target,
        url = _Object$assign.url,
        googleKey = _Object$assign.googleKey,
        action = _Object$assign.action,
        googleScriptLoadTimeout = _Object$assign.googleScriptLoadTimeout;
      var forms = document.querySelectorAll(target);
      var addScriptGoogleReCaptcha = function addScriptGoogleReCaptcha(googleKey) {
        var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        setTimeout(function () {
          var script = document.createElement('script');
          script.src = "https://www.google.com/recaptcha/api.js?render=".concat(googleKey);
          script.type = 'text/javascript';
          document.getElementsByTagName('head')[0].appendChild(script);
        }, timeout * 1000);
      };
      var data = function data(form) {
        var data = {};
        var formData = new FormData(form);
        formData.forEach(function (value, key) {
          data[key] = value;
        });
        return data;
      };
      var validField = function validField(element) {
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/i;
        var regexTel = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i;
        var invalidFeedback = element.parentElement.querySelector('.invalid-feedback');
        var messageInvalid = function messageInvalid(text) {
          return invalidFeedback.innerHTML = text;
        };
        element.setCustomValidity('');
        if (!element.validity.valid) {
          if (element.type === 'email' && !regexEmail.test(element.value)) {
            element.setCustomValidity('is-invalid');
            messageInvalid('Пожалуйста, введите действительный адрес электронной почты.');
          } else if (element.type === 'tel' && !regexTel.test(element.value)) {
            element.setCustomValidity('is-invalid');
            messageInvalid('Пожалуйста, введите правильный номер телефона.');
          } else if (element.type === 'checkbox' && element.name === 'agree') {
            element.setCustomValidity('is-invalid');
            messageInvalid('Подтвердите ваше согласие c политикой обработки персональных данных.');
          } else if (element.required === true && element.value === '') {
            messageInvalid('Это поле обязательно к заполнению.');
            element.setCustomValidity('is-invalid');
          }
        }
      };
      if (forms) {
        forms.forEach(function (form) {
          if (form !== null) {
            addScriptGoogleReCaptcha(googleKey, googleScriptLoadTimeout);
            form.querySelectorAll('input[type="tel"]').forEach(function (tel) {
              return im.mask(tel);
            });
            var agree = form.querySelector('input[name="agree"]');
            if (agree) {
              agree.addEventListener('change', function (event) {
                if (event.currentTarget.checked) {
                  event.target.value = true;
                } else {
                  event.target.value = '';
                }
              });
            }
            var buttonStatus = function buttonStatus() {
              var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
              var button = form.querySelector('button[type="submit"]');
              /*let old_text_content = button.textContent
               if (status) {
                button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Отправляем'
              } else {
                button.innerHTML = old_text_content
              }*/

              button.disabled = status;
            };
            var alertStatus = function alertStatus(type) {
              var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
              var alert = form.querySelector('.alert');
              switch (type) {
                case 'danger':
                  alert.classList.remove('d-none');
                  alert.classList.remove('alert-info');
                  alert.classList.remove('alert-success');
                  alert.classList.add('alert-danger');
                  alert.textContent = '';
                  alert.insertAdjacentHTML('afterbegin', message);
                  break;
                case 'info':
                  alert.classList.remove('d-none');
                  alert.classList.remove('alert-danger');
                  alert.classList.remove('alert-success');
                  alert.classList.add('alert-info');
                  alert.textContent = '';
                  alert.insertAdjacentHTML('afterbegin', message);
                  break;
                case 'success':
                  alert.classList.remove('d-none');
                  alert.classList.remove('alert-info');
                  alert.classList.remove('alert-danger');
                  alert.classList.add('alert-success');
                  alert.textContent = '';
                  alert.insertAdjacentHTML('afterbegin', message);
                  break;
                default:
                  alert.textContent = '';
                  alert.classList.add('d-none');
                  alert.classList.remove('alert-info');
                  alert.classList.remove('alert-danger');
                  alert.classList.remove('alert-success');
                  break;
              }
            };
            form.addEventListener('submit', /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee4(event) {
                var getCaptcha, reCAPTCHA;
                return _regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) switch (_context4.prev = _context4.next) {
                    case 0:
                      event.preventDefault();
                      Array.from(form.elements).forEach(function (element) {
                        element.setCustomValidity('');
                        validField(element);
                      });
                      if (!form.checkValidity()) {
                        event.stopPropagation();
                        alertStatus('danger', 'Одно или несколько полей содержат ошибочные данные. Пожалуйста, проверьте их и попробуйте ещё раз.');
                      } else {
                        getCaptcha = /*#__PURE__*/function () {
                          var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
                            var recaptcha_token;
                            return _regeneratorRuntime.wrap(function _callee$(_context) {
                              while (1) switch (_context.prev = _context.next) {
                                case 0:
                                  recaptcha_token = '';
                                  grecaptcha.ready(function () {
                                    grecaptcha.execute(googleKey, {
                                      action: "".concat(action)
                                    }).then(function (token) {
                                      recaptcha_token = token;
                                    });
                                  });
                                case 2:
                                  if (!(recaptcha_token === '')) {
                                    _context.next = 7;
                                    break;
                                  }
                                  _context.next = 5;
                                  return new Promise(function (r) {
                                    return setTimeout(r, 100);
                                  });
                                case 5:
                                  _context.next = 2;
                                  break;
                                case 7:
                                  return _context.abrupt("return", recaptcha_token);
                                case 8:
                                case "end":
                                  return _context.stop();
                              }
                            }, _callee);
                          }));
                          return function getCaptcha() {
                            return _ref2.apply(this, arguments);
                          };
                        }();
                        reCAPTCHA = form.querySelector('input[name="reCAPTCHA"]');
                        if (reCAPTCHA) {
                          reCAPTCHA.value = '';
                          setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
                            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
                              while (1) switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return getCaptcha();
                                case 2:
                                  reCAPTCHA.value = _context2.sent;
                                case 3:
                                case "end":
                                  return _context2.stop();
                              }
                            }, _callee2);
                          })), 200);
                        }
                        alertStatus('info', 'Отправляем сообщение...');
                        buttonStatus(true);
                        setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
                          return _regeneratorRuntime.wrap(function _callee3$(_context3) {
                            while (1) switch (_context3.prev = _context3.next) {
                              case 0:
                                _context3.next = 2;
                                return fetch(url, {
                                  method: 'POST',
                                  credentials: 'same-origin',
                                  headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                    'Cache-Control': 'no-cache'
                                  },
                                  body: new URLSearchParams(data(form)).toString()
                                }).then(function (response) {
                                  return response.json().then(function (data) {
                                    return _objectSpread({
                                      ok: response.ok,
                                      status: response.status,
                                      statusText: response.statusText
                                    }, data);
                                  });
                                }).then(function (object) {
                                  if (object.ok === true && object.status === 200) {
                                    if (object.success === true) {
                                      form.reset();
                                      Array.from(form.elements).forEach(function (element) {
                                        element.setCustomValidity('');
                                      });
                                      form.classList.remove('was-validated');
                                      alertStatus('success', 'Сообщение успешно отправлено.');
                                      buttonStatus(false);
                                    } else {
                                      var messageAlert = [];
                                      if (Array.isArray(object.data)) {
                                        object.data.forEach(function (data) {
                                          if (data.data === 'alert') {
                                            messageAlert.push('• ' + data.message);
                                          }
                                          if (data.data === 'message') {
                                            var field = form.querySelector("[name=\"".concat(data.code, "\"]"));
                                            if (field !== null) {
                                              var invalidFeedback = field.parentElement.querySelector('.invalid-feedback');
                                              invalidFeedback.innerHTML = '';
                                              field.classList.add('is-invalid');
                                              field.addEventListener('change', function (event) {
                                                event.target.setCustomValidity('');
                                                event.target.classList.remove('is-invalid');
                                                invalidFeedback.innerHTML = '';
                                              });
                                              field.setCustomValidity('is-invalid');
                                              invalidFeedback.innerHTML = data.message;
                                            }
                                          }
                                        });
                                        messageAlert.push('• Одно или несколько полей содержат ошибочные данные. Пожалуйста, проверьте их и попробуйте ещё раз.');
                                      }
                                      if (Array.isArray(messageAlert)) {
                                        alertStatus('danger', [].concat(messageAlert).join('<br>'));
                                      }
                                      buttonStatus(false);
                                    }
                                  } else {
                                    alertStatus('danger', "Error code ".concat(object.status, " ").concat(object.statusText, "."));
                                    buttonStatus(false);
                                    throw new Error(object.status);
                                  }
                                })["catch"](function (error) {
                                  alertStatus('danger', error);
                                  buttonStatus(false);
                                });
                              case 2:
                              case "end":
                                return _context3.stop();
                            }
                          }, _callee3);
                        })), googleScriptLoadTimeout * 1000 + 2500);
                      }
                      form.classList.add('was-validated');
                    case 4:
                    case "end":
                      return _context4.stop();
                  }
                }, _callee4);
              }));
              return function (_x) {
                return _ref.apply(this, arguments);
              };
            }());
          }
        });
      }
    });
  }

  exports.ContactForms = ContactForms;

}));
//# sourceMappingURL=contact-forms.js.map
