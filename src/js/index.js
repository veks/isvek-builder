/**
 * --------------------------------------------------------------------------
 * Button visually impaired (v1.0.1): util/index.js
 * Licensed under MIT (https://github.com/veks/button-visually-impaired-javascript/blob/master/LICENSE.md)
 * --------------------------------------------------------------------------
 */

/**
 * To type
 *
 * @param obj
 * @returns {string}
 */
const toType = obj => {
  if (obj === null || obj === undefined) {
    return `${obj}`
  }

  return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase()
}

/**
 * Is element
 *
 * @param obj
 * @returns {boolean}
 */
const isElement = obj => {
  if (!obj || typeof obj !== 'object') {
    return false
  }

  return typeof obj.nodeType !== 'undefined'
}

/**
 * Check config
 *
 * @param config
 * @param configTypes
 * @param configOptions
 */
const checkConfig = (config, configTypes, configOptions) => {
  getObjectKey(configTypes, key => {
    const expectedTypes = configTypes[key]
    const value = config[key]
    const valueType = value && isElement(value) ? 'element' : toType(value)

    if (!new RegExp(expectedTypes).test(valueType)) {
      throw new TypeError(`Console: Опция "${key}" предоставленный тип "${valueType}", ожидаемый тип "${expectedTypes}".`,)
    }
  })

  getObjectKey(configOptions, key => {
    const expectedOptions = configOptions[key]
    const value = config[key]

    if (!new RegExp(expectedOptions).test(value)) {
      throw new TypeError(`Console: Опция "${key}" параметр "${value}", ожидаемый параметр "${expectedOptions}".`,)
    }
  })
}

/**
 * Plural at word
 *
 * @param number
 * @param text
 * @returns {`${string} ${string}`}
 */
const pluralAtWord = (number, text = ['пиксель', 'пикселя', 'пикселей']) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return `${number} ${text[0]}`
  } else if (number % 10 >= 2 && number % 10 <= 4 && (number % 100 < 10 || number % 100 >= 20)) {
    return `${number} ${text[1]}`
  } else {
    return `${number} ${text[2]}`
  }
}

/**
 * String to boolean
 *
 * @param string
 * @returns {boolean}
 */
const stringToBoolean = string => {
  switch (string) {
    case 'on':
    case 'true':
    case '1':
      return true
    default:
      return false
  }
}

/**
 * wrapInner
 *
 * @param parent
 * @param wrapper
 * @param className
 */
const wrapInner = (parent, wrapper, className) => {
  if (typeof wrapper === 'string') {
    wrapper = document.createElement(wrapper)
  }

  parent.appendChild(wrapper).className = className

  while (parent.firstChild !== wrapper) {
    wrapper.appendChild(parent.firstChild)
  }
}

/**
 * Unwrap
 *
 * @param wrapper
 */
const unwrap = wrapper => {
  let docFrag = document.createDocumentFragment()

  if (!wrapper) return

  while (wrapper.firstChild) {
    docFrag.appendChild(wrapper.removeChild(wrapper.firstChild))
  }

  wrapper.parentNode.replaceChild(docFrag, wrapper)
}

/**
 * Get object key
 *
 * @param object
 * @param callback
 */
const getObjectKey = (object, callback) => Object.keys(object).forEach(key => typeof callback === 'function' ? callback(key) : null)

/**
 * Get object value
 *
 * @param object
 * @param callback
 */
const getObjectValue = (object, callback) => typeof callback === 'function' ? getObjectKey(object, key => callback(object[key])) : null

/**
 * Get array
 *
 * @param array
 * @param callback
 */
const getArrayKey = (array, callback) => Array.from(array).forEach(key => typeof callback === 'function' ? callback(key) : null)

/**
 * Text transform upper case
 *
 * @param string
 * @returns {string|string}
 */
const textTransformUpperCase = string => (string && string.charAt(0).toUpperCase() + string.slice(1)) || ''

/**
 * Text transform lower case
 *
 * @param string
 * @returns {string|string}
 */
const textTransformLowerCase = string => (string && string.charAt(0).toLowerCase() + string.slice(1)) || ''

/**
 * In array
 *
 * @param needle
 * @param haystack
 * @returns {boolean}
 */
const inArray = (needle, haystack) => {
  for (let i = 0; i < haystack.length; i++) {
    if (haystack[i] === needle) {
      return true
    }
  }

  return false
}

export {
  isElement,
  pluralAtWord,
  checkConfig,
  stringToBoolean,
  wrapInner,
  unwrap,
  getObjectKey,
  getArrayKey,
  getObjectValue,
  inArray,
  textTransformLowerCase
}
