var assert = require('assert');
var pigLatin = require('./piglatin');

function oneWord() {
	var translated = pigLatin.translateWrapper('fantastic');
	assert.equal(translated, 'antasticfay');
}

function twoWords() {
	var translated = pigLatin.translateWrapper('go bananas');
	assert.equal(translated, 'ogay ananasbay');
}

function twoWordsWithVowels() {
	var translated = pigLatin.translateWrapper('eat apples');
	assert.equal(translated, 'eatay applesay');
}

function twoWordsSpecialCase() {
	var translated = pigLatin.translateWrapper('great scott');
	assert.equal(translated, 'eatgray ottscay');
}

describe('pig latin tests', function() {
	it('translates to antasticfay', oneWord);
	it('translates to ogay ananasbay', twoWords);
	it('translates to eatay applesay', twoWordsWithVowels);
	it('translates to eatgray ottscay', twoWordsSpecialCase);
});
