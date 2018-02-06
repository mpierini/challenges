var assert = require('assert');
var request = require('request');

var search = function (term, cb) {
	request({
		method: 'GET',
		url: 'http://localhost:8080/search/' + term,
		json: true
	}, cb);
};

var returnFiveEntries = function (done) {
	search('cat', function(err, response, body) {
		assert.ifError(err);
		assert.equal(response.statusCode, 200);
		assert.equal(body.data.length, 5);
		done();
	});
};

var returnNoEntries = function (done) {
	search('qodts', function(err, response, body) {
		assert.ifError(err);
		assert.equal(response.statusCode, 200);
		assert.equal(body.data.length, 0);
		done();
	});
};

describe('Test search service', function() {
	it('should return five entries', returnFiveEntries);
	it('should return no entries', returnNoEntries);
});
