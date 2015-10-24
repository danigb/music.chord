(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

var gamut = require('music.gamut')
var harmonizer = require('music.harmonizer')
var operator = require('music.pitch.operator')

/**
 * Build a chord from a source and a tonic
 *
 * A source can be a list of intervals or notes. The tonic must be
 * a pitch (with or without octave) or false to get the intervals
 *
 * This function is currified, so you can partially apply the function passing
 * one parameter instead of two (see example)
 *
 * @param {Array} source - the list of intervals or notes
 * @param {String} tonic - the tonic of the chord or null to get the intervals
 * @return {Array} the chord notes (or intervals if null tonic)
 *
 * @example
 * var chord = require('music.chord')
 * chord('1 3 5 6', 'G') // => ['G', 'B', 'D', 'E']
 * var maj79 = chord('C E G B D')
 * maj79('A4') // => ['A4', 'C#5', 'E5', 'G#5', 'B5']
 */
function chord (source, tonic) {
  if (arguments.length === 1) return function (t) { return chord(source, t) }
  return gamut.apply(function (g) {
    var intervals = harmonizer(g, false).sort(operator.compare)
    return harmonizer(intervals, tonic)
  }, source)
}

module.exports = chord

},{"music.gamut":2,"music.harmonizer":4,"music.pitch.operator":6}],2:[function(require,module,exports){
'use strict'

var notation = require('music.notation')

var isArray = Array.isArray
var identity = function (e) { return e }
// simple curryfication for 2 args function
function _curry (fn) {
  return function (a, b) {
    return arguments.length === 1 ? function (b) { return fn(a, b) } : fn(a, b)
  }
}
// separator pattern to convert a list string to an array
var SEP = /\s*\|\s*|\s*,\s*|\s+/

/**
 * Get a gamut: create an array of notes or intervals from a source.
 * The source can be a string with items separated by
 * spaces, commas or bars (`|`), an array or an object.
 *
 * @name gamut
 * @function
 * @param {String|Array|Object} source - the source
 * @param {Function} transform - (Optional) a function that transforms the gamut
 * @return {Array} the source converted to an array (never null)
 *
 * @example
 * gamut('cb d3 e') // => [ 'Cb', 'D3', 'E' ]
 */
function gamut (source, fn) {
  return gamut.apply(fn || identity, source)
}

/**
 * Apply a function to a gamut.
 *
 * The interesting part is that the callback function will receive always an
 * array with the pitches in array-notation. `gamut.apply` will do the conversion
 * to array-notation and back to strings.
 *
 * @param {Function} fn - the function to apply
 * @param {String|Array} source - the source of the gamut
 * @return {Array} the gamut after apply the fn
 *
 * @example
 * var addStep = function(p) { return [p[0] + 1, p[1], p[2]] }
 * gamut.apply(addStep, 'C D E') // => ['D', 'E', 'F']
 */
gamut.apply = _curry(function (fn, source) {
  var isGamut = isArray(source) && isArray(source[0])
  var g = isGamut ? source : gamut.split(source).map(notation.arr)
  var res = fn(g)
  return !isGamut && isArray(res[0]) ? res.map(notation.str) : res
})

/**
 * Map a function to each element of the gamut.
 *
 * The callback function will receive the elements in array-notation
 *
 * @param {Function} fn - the callback function
 * @param {String|Array} source - the gamut source
 * @return {Array} the gamut after apply the function to each element
 */
gamut.map = _curry(function (fn, source) {
  return gamut.apply(function (g) { return g.map(fn) }, source)
})

/**
 * Filter the elements of a gamut
 *
 * The filter function will receive the elements in array-notation
 *
 * @name filter
 * @function
 * @param {Function} filter - the filter function
 * @param {String|Array} source - the gamut source
 * @return {Array} the gamut after filter the elements
 */
gamut.filter = _curry(function (fn, source) {
  return gamut.apply(function (g) { return g.filter(fn) }, source)
})

/**
 * Convert a source to an array
 *
 * The source can be an array (it will return it without modification), a
 * string with elements separated by spaces, commas or bars (`|`) or a single
 * element (it will be wrapped inside an array)
 *
 * This function __does not perform any transformation__ of the array elements.
 * and __it always return an array, even if its empty__.
 *
 * @name toArray
 * @function
 * @param {String|Array} source - the source
 * @return {Array} the source as array
 */
gamut.split = function (source) {
  if (isArray(source)) return source
  else if (typeof source === 'string') return source.split(SEP)
  else if (source === null || typeof source === 'undefined') return []
  else return [ source ]
}

module.exports = gamut

},{"music.notation":3}],3:[function(require,module,exports){
'use strict'

// utility: fill a string with a char
function fillStr (num, char) { return Array(num + 1).join(char) }

var LETTERS = 'CDEFGAB'
var REGEX = /^([a-gA-G])(#{1,4}|b{1,4}|x{1,2}|)(\d*)$/

var cache = {}
var notation = {}

/**
 * Converts pitches between strings and [array notation](https://github.com/danigb/a-pitch)
 *
 * This functions parses a string in the form `'letter + accidentals [+ octave]'`.
 * The letter can be upper or down case and the accidentals can be sharps `#`
 * flats `b` or double sharps `x`.
 *
 * The pitch array notation is 3 integers is in the form `[letter, accidentals, octave]`.
 *
 * This function caches the result to get better performance. If for some
 * reason you don't want to cache, use `pitch.parse` and `pitch.build`
 *
 * @name arr
 * @function
 * @param {String|Array} val - the pitch (can be a string or array)
 * @return {Array|String} the converted val (string if it was an array,
 * and array if it was string)
 *
 * @example
 * var pitch = require('pitch-parser')
 * pitch('C4') // => [0, 0, 4]
 * pitch([0, 0, 4]) // => 'C4'
 *
 * @example // parse
 * pitch('c2') // => [0, 0, 2]
 * pitch('F#') // => [4, 1, null] (no octave)
 *
 * @example // build
 * pitch([2, -1, 3]) // => 'Eb3'
 * pitch([6, -2, null]) // => 'Bbb'
 *
 * @example // return scientific notation
 * pitch(pitch('cbb')) // => 'Cbb'
 * pitch(pitch('fx')) // => 'F##'
 */
notation.arr = function (src) {
  if (Array.isArray(src)) return src
  return src in cache ? cache[src] : cache[src] = parsePitch(src) || parseInterval(src)
}

function toString (arr) {
  if (arr.length === 1 || arr.length === 2) return buildPitch(arr)
  else if (arr.length === 3) return buildInterval(arr)
  else if (arr.length === 0) return null
  else return buildPitch(arr)
}

notation.str = function (arr) {
  if (!Array.isArray(arr)) return null
  var str = '|' + arr[0] + '|' + arr[1] + '|' + arr[2] + '|' + arr[3] + '|' + arr[4]
  return str in cache ? cache[str] : cache[str] = toString(arr)
}

/**
 * Get a pitch array from a pitch string in scientific notation
 *
 * The pitch array of 3 integers is in the form `[letter, accidentals, octave]`
 *
 * This function is non cached. Prefer `pitch` where possible.
 *
 * @param {String} str - the pitch string
 * @return {Array} the pitch array
 *
 * @example
 * pitch.parse('C2') // => [0, 0, 2]
 * pitch.parse('C3') // => [0, 0, 3]
 * pitch.parse('C#3') // => [0, 1, 3]
 * pitch.parse('Cb3') // => [0, -1, 3]
 * pitch.parse('D##4') // => [1, 2, 4]
 * pitch.parse('F#') // => [4, 1, null]
 */
function parsePitch (str) {
  var m = REGEX.exec(str)
  if (!m) return null

  var step = LETTERS.indexOf(m[1].toUpperCase())
  var alt = m[2].replace(/x/g, '##').length
  if (m[2][0] === 'b') alt *= -1
  return m[3] ? [step, alt, +m[3], 0] : [step, alt]
}

/**
 * Get a pitch string from a pitch array
 *
 * This function is non cached. Prefer `pitch` where possible.
 *
 * @name pitch.build
 * @param {Array} arr - the pitch array
 * @return {String} the pitch string in scientific notation
 *
 * @example
 * pitch.build([2, -1, 3]) // => 'Eb3'
 * pitch.build([5, 2, 2]) // => 'A##2'
 * pitch.build([6, -2, null]) // => 'Bbb'
 */
function buildPitch (arr) {
  if (!Array.isArray(arr) || !arr.length) return null
  var letter = LETTERS.charAt(Math.abs(arr[0]) % 7)
  var acc = fillStr(Math.abs(arr[1]), arr[1] < 0 ? 'b' : '#')
  var oct = arr[2] || arr[2] === 0 ? arr[2] : ''
  return letter + acc + oct
}

'use strict'

/**
 * Converts between interval strings and [array notation](https://github.com/danigb/a-pitch)
 *
 * The interval string can be in two different formats:
 *
 * - As interval (num + quality): `'1P' '3M' '5P' '13A'` are valid intervals
 * - As scale degree (alterations + num): `'b2' '#4' 'b9'` are valid intervals
 *
 * The array notation is an array in the form `[num, alter, oct]`. See [a-pitch](https://github.com/danigb/a-pitch)
 * for more infor about array notation.
 *
 * @param {String|Array} interval - the interval in either string or array notation
 * @return {Array|String} the interval (as string if was array, as array if was string).
 * null if not a valid array
 *
 * @example
 * var interval = require('interval-parser')
 * interval('3M') // => [2, 0, 1]
 * interval([2, 0, 1]) // => '3M'
 *
 * @example // parse strings
 * interval('1P') // => [0, 0, 0]
 * interval('2m') // => [0, -1, 0]
 * interval('1') // same as interval('1P')
 * interval('5b') // same as interval('5d')
 * interval('2b') // same as interval('2m')
 *
 * @example // build strings
 * interval.build([1, 0, 0]) // => '2M'
 * interval.build([1, 0, 1]) // => '9M'
 */

var INTERVAL = /^([-+]?)(\d+)(d{1,4}|m|M|P|A{1,4}|b{1,4}|#{1,4}|)$/
var QALT = {
  P: { dddd: -4, ddd: -3, dd: -2, d: -1, P: 0, A: 1, AA: 2, AAA: 3, AAAA: 4 },
  M: { ddd: -4, dd: -3, d: -2, m: -1, M: 0, A: 1, AA: 2, AAA: 3, AAAA: 4 }
}
var ALTER = {
  P: ['dddd', 'ddd', 'dd', 'd', 'P', 'A', 'AA', 'AAA', 'AAAA'],
  M: ['ddd', 'dd', 'd', 'm', 'M', 'A', 'AA', 'AAA', 'AAAA']
}
var TYPES = 'PMMPPMM'

/**
 * Parses an interval string and returns [a-pitch](https://github.com/danigb/a-pitch) array
 *
 * The interval string can be in two different formats:
 *
 * - As interval (num + quality): `'1P' '3M' '5P' '13A'` are valid intervals
 * - As scale degree (alterations + num): `'b2' '#4' 'b9'` are valid intervals
 *
 * @param {String} str - the interval string
 * @return {Array} the a-pitch representation
 *
 * @example
 * var interval = require('interval-parser')
 * interval.parse('1P') // => [0, 0, 0]
 * interval.parse('2m') // => [0, -1, 0]
 * interval.parse('1') // same as interval.parse('1P')
 * interval.parse('5b') // same as interval.parse('5d')
 * interval.parse('2b') // same as interval.parse('2m')
 */
function parseInterval (str) {
  var m = INTERVAL.exec(str)
  if (!m) return null
  var dir = m[1] === '-' ? -1 : 1
  var num = +m[2] - 1

  var simple = num % 7
  var oct = dir * Math.floor(num / 7)
  var type = TYPES[simple]

  var alt
  if (m[3] === '') alt = 0
  else if (m[3][0] === '#') alt = m[3].length
  else if (m[3][0] === 'b') alt = -m[3].length
  else {
    alt = QALT[type][m[3]]
    if (typeof alt === 'undefined') return null
  }

  // if descending, invert it and octave lower
  if (dir === -1) {
    alt = type === 'P' ? -alt : -(alt + 1)
    if (simple !== 0) {
      simple = 7 - simple
      oct--
    }
  }
  return [simple, alt, oct]
}

/*
 * Convert from an [a-pitch](https://github.com/danigb/a-pitch) to an interval string
 *
 * @param {Array} interval - the interval [a-pitch](https://github.com/danigb/a-pitch) array
 * @return {String} the interval string
 *
 * @example
 * var interval = require('interval-parser')
 * interval.build([1, 0, 0]) // => '2M'
 */
function buildInterval (i) {
  if (!i || !Array.isArray(i)) return null
  var t = TYPES[Math.abs(i[0]) % 7]
  var n = number(i)
  var alt = i[1]
  if (n < 0) alt = t === 'P' ? -alt : -(alt + 1)
  var q = ALTER[t][4 + alt]
  if (!q) return null
  return n + q
}

function number (i) {
  var simple = (i[0] % 7) + 1
  if (i[2] === null) return simple
  var dir = i[2] < 0 ? -1 : 1
  var oct = Math.abs(i[2])
  if (dir < 0) {
    simple = 9 - simple
    oct--
  }
  return dir * (simple + 7 * oct)
}

module.exports = notation

},{}],4:[function(require,module,exports){
'use strict'

var gamut = require('music.gamut')
var operator = require('music.pitch.operator')
var notation = require('music.notation')

/**
 * Harmonize a note
 *
 * This function is currified, so it can be partially applied
 *
 * @param {String|Array} source - the intervals or notes
 * @param {String|Array} note - the note to harmonize (as string or array notation)
 * @return {Array} the list of notes
 *
 * @example
 * harmonize('1 2 3 4', 'D') // => ['D', 'E', 'F#', 'G']
 * harmonize('d e f g a', 'g') // => ['G', 'A', 'Bb', 'C', 'D']
 * harmonize('d e f g a b c', false) // => ['1P', '2M', '3m', '4P', '5P', '6M', '7m']
 */
function harmonizer (intervals, tonic) {
  if (arguments.length === 1) return function (t) { return harmonizer(intervals, t) }

  return gamut.apply(function (g) {
    var intervals = toIntervals(g)
    if (tonic === false) return intervals
    var t = notation.arr(tonic)
    return intervals.map(operator.addTo(t))
  }, intervals)
}

function toIntervals (notes) {
  var t = operator.setDefaultOctave(0, notes[0])
  return notes.map(function (n) {
    return n && n.length !== 3 ? operator.subtract(t, n) : n
  })
}

module.exports = harmonizer

},{"music.gamut":2,"music.notation":5,"music.pitch.operator":6}],5:[function(require,module,exports){
arguments[4][3][0].apply(exports,arguments)
},{"dup":3}],6:[function(require,module,exports){
'use strict'

var op = {}

/**
 * Get pitch class of a pitch.
 *
 * @name pitchClass
 * @function
 * @param {Array} pitch - the pitch
 * @return {Array} the pitch class of the pitch
 *
 * @example
 * pitchClass([1, -2, 3]) // => [1, -2, nul]
 */
op.pitchClass = function (p) { return p ? [p[0], p[1]] : null }

/**
 * Set octave of a pitch.
 *
 * This function can be partially applied (Integer -> Array -> Array)
 *
 * @name setOctave
 * @function
 * @param {Integer} octave - the octave to set
 * @param {Array} pitch - the pitch
 * @return {Array} the pitch with the given octave
 *
 * @example
 * operator.setOctave(2, [1, 2, 0]) // => [1, 2, 2]
 * // partially applied, you get a function:
 * arrayOfPitchs.map(operator.setOctave(2))
 */
op.setOctave = function (num, arr) {
  if (arguments.length === 1) return function (arr) { return op.setOctave(num, arr) }
  if (!arr) return null
  var copy = arr.slice()
  copy[2] = num
  return copy
}

/**
 * Simplify interval (set the octave to 0)
 *
 * @name simplify
 * @function
 * @param {Array} interval - the interval
 * @return {Array} the simplified interval
 *
 * @example
 * operator.simplify([1, 2, 3]) // => [1, 2, 0]
 */
op.simplify = op.setOctave(0)

/**
 * Set the octave only if not present
 *
 * This function can be partially applied (Integer -> Array -> Array)
 *
 * @name setDefaultOctave
 * @function
 * @param {Integer} octave - the octave number
 * @param {Array} pitch - the pitch array
 *
 * @example
 * op.setDefaultOctave(1, [1, 2, null]) // => [1, 2, 1]
 * op.setDefaultOctave(1, [1, 2, 3]) // => [1, 2, 3]
 * // partially applied:
 * arrayOfPitches.map(op.setDefaultOctave(3))
 */
op.setDefaultOctave = function (oct, arr) {
  if (arguments.length === 1) return function (arr) { return op.setDefaultOctave(oct, arr) }
  if (!arr) return null
  var c = arr.slice()
  c[2] = c[2] === null || c[2] === undefined ? oct : c[2]
  return c
}

var SEMITONES = [0, 2, 4, 5, 7, 9, 11]
/**
 * Get distance in semitones from `[0, 0, 0]` (`'C0'` or `'1P'`)
 *
 * Notice that pitch classes are asumed to have octave 0
 *
 * @name height
 * @function
 * @param {Array} pitch - the pitch or interval
 * @return {Integer} the distance
 *
 * @example
 * op.height([0, 0, 0]) // => 0
 * op.height([1, 1, 0]) // => 3
 * op.height([1, 1]) // => 3 // 'D#0' is same as 'D#'
 */
op.height = function (i) {
  return i ? SEMITONES[i[0] % 7] + i[1] + 12 * (i[2] || 0) : null
}

/**
 * Compare the height of two pitches. Can be used as comparator for array.sort()
 * to sort in ascending height (pitch, freq) order
 *
 * @name compare
 * @function
 * @param {Array} first - first pitch
 * @param {Array} second - second pitch
 * @return {Integer} 0 if same height, > 0 if first is higher, < 0 if second is higher
 *
 * @example
 * arrayOfPitches.sort(op.compare) // => array in ascending order
 */
op.compare = function (a, b) { return op.height(a) - op.height(b) }

// The fifths vector representation of: 1P, 2M, 3M, 4P, 5P, 6M, 7M
var BASE_TO = [ [0, 0], [2, -1], [4, -2], [-1, 1], [1, 0], [3, -1], [5, -2] ]
var BASE_FROM = [ [0, 0], [4, 0], [1, 1], [5, 1], [2, 2], [6, 2], [3, -1] ]

/**
 * Get a pitch measured in fifths and octaves
 *
 * Every interval (or note) can be expressed by repeating ascending or descending
 * fifths and octaves. For exaple, interval major second is two fifths up and
 * one octave down:
 * `fifths([1, 0, 0]) // => [2, -1]`
 *
 * This representation is useful for calculating interval distances, transpositions
 * or keys
 *
 * @name toFifths
 * @function
 * @param {Array} apitch - the pitch or interval as [a-pitch](https://github.com/danigb/a-pitch)
 * @return {Array} an array with the form [toFifths, octaves] where both are integers
 *
 * @example
 * op.toFifths([0, 0, 0]) // => [0, 0]
 * op.toFifths([0, 0, 1]) // => [0, 1]
 * op.toFifths([1, 0, 0]) // => [2, -1]
 */
op.toFifths = function (t) {
  var base = BASE_TO[t[0] % 7]
  var fifths = base[0] + 7 * t[1]
  var oct = t.length > 2 ? base[1] + t[2] - 4 * t[1] : null
  return [fifths, oct]
}

/*
 * Get a pitch (in array notation) from a fifths array
 *
 * @param {Array} coord - the fifths array
 * @return {Array} the pitch array
 *
 * @example
 * fromFifths([3, -1]) // => [6, 0, 1]
 */
op.fromFifths = function (coord) {
  var q = coord[0] % 7
  var index = q < 0 ? 7 - Math.abs(q) : q
  var alter = Math.floor((coord[0] + 1) / 7)

  var base = BASE_FROM[index]
  var oct = coord[1] === null ? null : base[1] + alter * 4 + coord[1]
  return [base[0], alter, oct]
}

/**
 * Add two pitches. Can be used to tranpose pitches.
 *
 * @param {Array} first - first pitch
 * @param {Array} second - second pitch
 * @return {Array} both pitches added
 *
 * @example
 * operator.add([3, 0, 0], [4, 0, 0]) // => [0, 0, 1]
 */
function add (a, b) {
  var fifths = a[0] + b[0]
  var octaves = a[1] === null || b[1] === null ? null : a[1] + b[1]
  return [fifths, octaves]
}
op.add = function (a, b) {
  if (arguments.length === 1) return function (b) { return op.add(a, b) }
  if (!a || !b) return null
  var r = op.fromFifths(add(op.toFifths(a), op.toFifths(b)))
  var copy = b.slice()
  copy[0] = r[0]
  copy[1] = r[1]
  if (b.length > 2) copy[2] = r[2]
  return copy
}
op.addTo = function (p) { return function (i) { return op.add(i, p) } }

/**
 * Subtract two pitches or intervals. Can be used to find the distance between pitches.
 *
 * @name subtract
 * @function
 * @param {Array} a - one pitch or interval in [pitch-array](https://github.com/danigb/pitch-array) format
 * @param {Array} b - the other pitch or interval in [pitch-array](https://github.com/danigb/pitch-array) format
 * @return {Array} both pitches or intervals substracted [pitch-array](https://github.com/danigb/pitch-array) format
 *
 * @example
 * operator.subtract([4, 0, 0], [3, 0, 0]) // => [1, 0, 0]
 */
function subtract (a, b) {
  var fifths = b[0] - a[0]
  var octaves = a[1] !== null && b[1] !== null ? b[1] - a[1] : null
  return [fifths, octaves]
}
op.subtract = function (a, b) {
  if (arguments.length === 1) return function (b) { return op.subtract(a, b) }
  if (!a || !b) return null
  return op.fromFifths(subtract(op.toFifths(a), op.toFifths(b)))
}

/**
 * Multiply a pitch or interval by a scalar
 *
 * @name multiply
 * @function
 * @param {Array} n - the scalar
 * @param {Array} a - the pitch or interval in [pitch-array](https://github.com/danigb/pitch-array) format
 * @return {Array} the pitch or interval multiplied in [pitch-array](https://github.com/danigb/pitch-array) format
 *
 * @example
 * operator.multiply(2, [4, 0, 0]) // => [1, 0, 1]
 */
function multiply (m, a) { return [m * a[0], a[1] === null ? null : m * a[1]] }

op.multiply = function (m, a) {
  if (arguments.length === 1) return function (b) { return op.multiply(m, b) }
  if (!a) return null
  return op.fromFifths(multiply(+m, op.toFifths(a)))
}

module.exports = op

},{}]},{},[1]);
