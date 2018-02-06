var express = require('express');
var querystring = require('querystring');
var request = require('request');

var config = require('../config/config');

var app = express();

var search = function (req, res) {
	if (!req.params.term || !req.params.term.length) {
		return res.status(400).json({error: 'missing term param'});
	}

	if (!req.query.next) {
		req.query.next = 0;
	}

	makeGiphyRequest(req.params.term, req.query.next, function(err, response, body) {
		if (err) {
			return res.status(500).json({error: 'request to giphy failed'});
		}

		if (response.statusCode !== 200) {
			return res.status(response.statusCode).json({error: 'unexpected status code: ' + response.statusCode});
		}

		handleBody(res, body, req.query.next);
	});
};

var makeGiphyRequest = function (term, next, cb) {
	request({
		method: 'GET',
		url: 'http://api.giphy.com/v1/gifs/search',
		qs: {
			api_key: config.giphy.api_key,
			q: term,
			limit: 5,
			offset: next * 5,
		},
		json: true
	}, cb);
};

var handleBody = function(res, body, next) {
	var results = {
		data: []
	};

	if (!body) {
		return res.status(404).json({error: 'no body received from request'});
	}

	// send back empty data set for data array length less than five
	if (body.data.length < 5) {
		return res.status(200).json(results);
	}

	// only need id and url fields from objects sent in data array
	results.data = body.data.map(function (entry) {
		return {
			gif_id: entry.id,
			url: entry.url,
		};
	});

	results.next = ++next;

	res.status(200).json(results);
};

app.get('/search/:term',
	search
);

app.listen(config.port, function () {
	console.log('Giphy search service started!')
});
