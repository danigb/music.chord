# music.chord

[![Build Status](https://travis-ci.org/danigb/music.chord.svg?branch=master)](https://travis-ci.org/danigb/music.chord)
[![Code Climate](https://codeclimate.com/github/danigb/music.chord/badges/gpa.svg)](https://codeclimate.com/github/danigb/music.chord)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![npm version](https://img.shields.io/npm/v/music.chord.svg)](https://www.npmjs.com/package/music.chord)
[![license](https://img.shields.io/npm/l/music.chord.svg)](https://www.npmjs.com/package/music.chord)
[![distribution file](https://img.shields.io/badge/dist-6.1kb-blue.svg)](https://raw.githubusercontent.com/danigb/music.chord/master/dist/music.chord.min.js)
[![music.kit](https://img.shields.io/badge/music.kit-yellow.svg)](https://www.npmjs.com/package/music.kit)

Music chords made easy:

```js
var chord = require('music.chord')
var M9 = chord('1 3 5 7 9')
M9('D3') // => ['D3', 'F#3', 'A#3', 'C#4', 'E4']
var dom7 = chord('C E G Bb')
dom7('A4') // => ['A4', 'C#5', 'E5', 'G5']
```

This is part of [music.kit](https://github.com/danigb/music.kit).

## Install

Install via npm: `npm i --save music.chord` or grab the distribution file in [dist](https://github.com/danigb/music.chord/tree/master/dist) for browsers.

## Usage

#### Build chords from intervals

This is the simplest usage:

```js
var chord = require('music.chord')
chord('1 3 5 7b 9', 'F2') // => ['F2', 'A2', 'C3', 'Eb3', 'G3']
```

You can partially apply the function:

```js
var dom79 = chord('1 3 5 7b 9')
dom79('F2') // => ['F2', 'A2', 'C3', 'Eb3', 'G3']
```

__Its important to note that all chord notes are ordered by pitch:__

```js
chord('1 3 5 7 2', 'C') // => ['C', 'D', 'E', 'G', 'B']
```

#### Build chord from notes

You can build from notes the same way (again, ordered notes):

```js
var m7b5 = chord('C Eb Gb Bb')
m7b5('D4') // => ['D4', 'F4', 'Ab4', 'C5']
var maj7drop2 = chord('C2 E2 G1 B2')
maj7drop2('C4') // => [ 'G3', 'C4', 'E4', 'B4' ]
```

#### Get chord intervals

Set `false` as tonic to get the chord intervals:

```js
var chord('C E G B', false) // => ['1P', '3M', '5P', '7M']
```

#### More...

See [music.chords](https://github.com/danigb/music.chords) for a chord dictionary,
[music.scale](https://github.com/danigb/music.scale) for scales, or [music.kit](https://github.com/danigb/music.kit) for the whole thing.

## Documentation

It's just [one function](https://github.com/danigb/music.chord/blob/master/API.md)

## License

MIT License
