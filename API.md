# API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="arr"><span class="type-signature"></span>arr<span class="signature">(val)</span><span class="type-signature"> &rarr; {Array|String}</span></h4>
</dt>
<dd>
<div class="description">
<p>Converts pitches between strings and <a href="https://github.com/danigb/a-pitch">array notation</a></p>
<p>This functions parses a string in the form <code>'letter + accidentals [+ octave]'</code>.
The letter can be upper or down case and the accidentals can be sharps <code>#</code>
flats <code>b</code> or double sharps <code>x</code>.</p>
<p>The pitch array notation is 3 integers is in the form <code>[letter, accidentals, octave]</code>.</p>
<p>This function caches the result to get better performance. If for some
reason you don't want to cache, use <code>pitch.parse</code> and <code>pitch.build</code></p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>val</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch (can be a string or array)</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L157">lineno 157</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the converted val (string if it was an array,
and array if it was string)</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
|
<span class="param-type">String</span>
</dd>
</dl>
<h5>Examples</h5>
<pre class="prettyprint"><code>var pitch = require('pitch-parser')
pitch('C4') // => [0, 0, 4]
pitch([0, 0, 4]) // => 'C4'</code></pre>
<pre class="prettyprint"><code> // parse
pitch('c2') // => [0, 0, 2]
pitch('F#') // => [4, 1, null] (no octave)</code></pre>
<pre class="prettyprint"><code> // build
pitch([2, -1, 3]) // => 'Eb3'
pitch([6, -2, null]) // => 'Bbb'</code></pre>
<pre class="prettyprint"><code> // return scientific notation
pitch(pitch('cbb')) // => 'Cbb'
pitch(pitch('fx')) // => 'F##'</code></pre>
</dd>
<dt>
<h4 class="name" id="chord"><span class="type-signature"></span>chord<span class="signature">(source, tonic)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Build a chord from a source and a tonic</p>
<p>A source can be a list of intervals or notes. The tonic must be
a pitch (with or without octave) or false to get the intervals</p>
<p>This function is currified, so you can partially apply the function passing
one parameter instead of two (see example)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>source</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the list of intervals or notes</p></td>
</tr>
<tr>
<td class="name"><code>tonic</code></td>
<td class="type">
<span class="param-type">String</span>
</td>
<td class="description last"><p>the tonic of the chord or null to get the intervals</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/index.js#L26">lineno 26</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the chord notes (or intervals if null tonic)</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>var chord = require('music.chord')
chord('1 3 5 6', 'G') // => ['G', 'B', 'D', 'E']
var maj79 = chord('C E G B D')
maj79('A4') // => ['A4', 'C#5', 'E5', 'G#5', 'B5']</code></pre>
</dd>
<dt>
<h4 class="name" id="compare"><span class="type-signature"></span>compare<span class="signature">(first, second)</span><span class="type-signature"> &rarr; {Integer}</span></h4>
</dt>
<dd>
<div class="description">
<p>Compare the height of two pitches. Can be used as comparator for array.sort()
to sort in ascending height (pitch, freq) order</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>first</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>first pitch</p></td>
</tr>
<tr>
<td class="name"><code>second</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>second pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L531">lineno 531</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>0 if same height, &gt; 0 if first is higher, &lt; 0 if second is higher</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Integer</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>arrayOfPitches.sort(op.compare) // => array in ascending order</code></pre>
</dd>
<dt>
<h4 class="name" id="filter"><span class="type-signature"></span>filter<span class="signature">(filter, source)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Filter the elements of a gamut</p>
<p>The filter function will receive the elements in array-notation</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>filter</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>the filter function</p></td>
</tr>
<tr>
<td class="name"><code>source</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the gamut source</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L106">lineno 106</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the gamut after filter the elements</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="gamut"><span class="type-signature"></span>gamut<span class="signature">(source, transform)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get a gamut: create an array of notes or intervals from a source.
The source can be a string with items separated by
spaces, commas or bars (<code>|</code>), an array or an object.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>source</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
|
<span class="param-type">Object</span>
</td>
<td class="description last"><p>the source</p></td>
</tr>
<tr>
<td class="name"><code>transform</code></td>
<td class="type">
<span class="param-type">function</span>
</td>
<td class="description last"><p>(Optional) a function that transforms the gamut</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L53">lineno 53</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the source converted to an array (never null)</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>gamut('cb d3 e') // => [ 'Cb', 'D3', 'E' ]</code></pre>
</dd>
<dt>
<h4 class="name" id="height"><span class="type-signature"></span>height<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {Integer}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get distance in semitones from <code>[0, 0, 0]</code> (<code>'C0'</code> or <code>'1P'</code>)</p>
<p>Notice that pitch classes are asumed to have octave 0</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch or interval</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L512">lineno 512</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the distance</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Integer</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>op.height([0, 0, 0]) // => 0
op.height([1, 1, 0]) // => 3
op.height([1, 1]) // => 3 // 'D#0' is same as 'D#'</code></pre>
</dd>
<dt>
<h4 class="name" id="multiply"><span class="type-signature"></span>multiply<span class="signature">(n, a)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Multiply a pitch or interval by a scalar</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>n</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the scalar</p></td>
</tr>
<tr>
<td class="name"><code>a</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch or interval in <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L647">lineno 647</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch or interval multiplied in <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.multiply(2, [4, 0, 0]) // => [1, 0, 1]</code></pre>
</dd>
<dt>
<h4 class="name" id="pitchClass"><span class="type-signature"></span>pitchClass<span class="signature">(pitch)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get pitch class of a pitch.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L437">lineno 437</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch class of the pitch</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>pitchClass([1, -2, 3]) // => [1, -2, nul]</code></pre>
</dd>
<dt>
<h4 class="name" id="setDefaultOctave"><span class="type-signature"></span>setDefaultOctave<span class="signature">(octave, pitch)</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Set the octave only if not present</p>
<p>This function can be partially applied (Integer -&gt; Array -&gt; Array)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>octave</code></td>
<td class="type">
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>the octave number</p></td>
</tr>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch array</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L487">lineno 487</a>
</li>
</ul></dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>op.setDefaultOctave(1, [1, 2, null]) // => [1, 2, 1]
op.setDefaultOctave(1, [1, 2, 3]) // => [1, 2, 3]
// partially applied:
arrayOfPitches.map(op.setDefaultOctave(3))</code></pre>
</dd>
<dt>
<h4 class="name" id="setOctave"><span class="type-signature"></span>setOctave<span class="signature">(octave, pitch)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Set octave of a pitch.</p>
<p>This function can be partially applied (Integer -&gt; Array -&gt; Array)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>octave</code></td>
<td class="type">
<span class="param-type">Integer</span>
</td>
<td class="description last"><p>the octave to set</p></td>
</tr>
<tr>
<td class="name"><code>pitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L450">lineno 450</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the pitch with the given octave</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.setOctave(2, [1, 2, 0]) // => [1, 2, 2]
// partially applied, you get a function:
arrayOfPitchs.map(operator.setOctave(2))</code></pre>
</dd>
<dt>
<h4 class="name" id="simplify"><span class="type-signature"></span>simplify<span class="signature">(interval)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Simplify interval (set the octave to 0)</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the interval</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L474">lineno 474</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the simplified interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.simplify([1, 2, 3]) // => [1, 2, 0]</code></pre>
</dd>
<dt>
<h4 class="name" id="subtract"><span class="type-signature"></span>subtract<span class="signature">(a, b)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Subtract two pitches or intervals. Can be used to find the distance between pitches.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>a</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>one pitch or interval in <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p></td>
</tr>
<tr>
<td class="name"><code>b</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the other pitch or interval in <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L624">lineno 624</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>both pitches or intervals substracted <a href="https://github.com/danigb/pitch-array">pitch-array</a> format</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>operator.subtract([4, 0, 0], [3, 0, 0]) // => [1, 0, 0]</code></pre>
</dd>
<dt>
<h4 class="name" id="toArray"><span class="type-signature"></span>toArray<span class="signature">(source)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Convert a source to an array</p>
<p>The source can be an array (it will return it without modification), a
string with elements separated by spaces, commas or bars (<code>|</code>) or a single
element (it will be wrapped inside an array)</p>
<p>This function <strong>does not perform any transformation</strong> of the array elements.
and <strong>it always return an array, even if its empty</strong>.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>source</code></td>
<td class="type">
<span class="param-type">String</span>
|
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the source</p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L121">lineno 121</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>the source as array</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="toFifths"><span class="type-signature"></span>toFifths<span class="signature">(apitch)</span><span class="type-signature"> &rarr; {Array}</span></h4>
</dt>
<dd>
<div class="description">
<p>Get a pitch measured in fifths and octaves</p>
<p>Every interval (or note) can be expressed by repeating ascending or descending
fifths and octaves. For exaple, interval major second is two fifths up and
one octave down:
<code>fifths([1, 0, 0]) // =&gt; [2, -1]</code></p>
<p>This representation is useful for calculating interval distances, transpositions
or keys</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>apitch</code></td>
<td class="type">
<span class="param-type">Array</span>
</td>
<td class="description last"><p>the pitch or interval as <a href="https://github.com/danigb/a-pitch">a-pitch</a></p></td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js">dist/music.chord.js</a>
<span>, </span>
<a href="https://github.com/danigb/music.chord/blob/master/dist/music.chord.js#L550">lineno 550</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>an array with the form [toFifths, octaves] where both are integers</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">Array</span>
</dd>
</dl>
<h5>Example</h5>
<pre class="prettyprint"><code>op.toFifths([0, 0, 0]) // => [0, 0]
op.toFifths([0, 0, 1]) // => [0, 1]
op.toFifths([1, 0, 0]) // => [2, -1]</code></pre>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->
