
var vowels = {
	a: true,
	e: true,
	i: true,
	o: true,
	u: true,
};

var translateWrapper = function(phrase) {
	var split = phrase.split(' ');

	var translated = split.map(translate);

	return translated.join(' ');
}

var translate = function(word) {
	var suffix = 'ay';

	var prefix = '';

	for (var i = 0; i < word.length; i++) {
		if (vowels[word[i]]) {
			break;
		}
		prefix += word[i];
	}

	return word.slice(prefix.length) + prefix + suffix;
};

module.exports.translateWrapper = translateWrapper;

/* Pig Latin Rules:
*
* "fantastic" -> "antasticfay"
* "go bananas" -> "ogay ananasbay"
* "Go bananas" -> "Ogay ananasbay"
* "Go bananas!!" -> "Ogay ananasbay!!"
* "eat apples" -> "eatay applesay"
* "great scott" -> "eatgray ottscay"
*/