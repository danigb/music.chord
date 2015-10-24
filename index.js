'use strict'

var gamut = require('music.gamut')
var harmonizer = require('music.harmonizer')
var operator = require('music.pitch.operator')

/**
 * Build a chord from a source and a tonic
 *
 * A chord is a list of notes or intervals is __ascending pitch order__
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
