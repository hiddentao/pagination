var assert = require('assert');
var pagination = require('../index.js');
var Paginator = pagination.Paginator;

function test() {
	console.log('Running Paginator test');
	var item = new Paginator({
		current : 11,
		pageLinks : 7,
		totalResult : 100
	});
	console.log(item.calc());
	assert.deepEqual({
		prelink : "",
		current : 10,
		previous : 9,
		next : null,
		first : 1,
		last : null,
		range : [4, 5, 6, 7, 8, 9, 10],
		fromResult : 40,
		toResult : 100,
		totalResult : 100,
		pageCount : 10
	}, item.calc());

	var item = new Paginator({
		current : 8,
		pageLinks : 7,
		totalResult : 100
	});
	assert.deepEqual({
		prelink : "",
		current : 8,
		previous : 7,
		next : 9,
		first : 1,
		last : 10,
		range : [4, 5, 6, 7, 8, 9, 10],
		fromResult : 40,
		toResult : 100,
		totalResult : 100,
		pageCount : 10
	}, item.calc());

	var item = new Paginator({
		current : 5,
		pageLinks : 7,
		totalResult : 100
	});
	assert.deepEqual({
		prelink : "",
		current : 5,
		previous : 4,
		next : 6,
		first : 1,
		last : 10,
		range : [2, 3, 4, 5, 6, 7, 8],
		fromResult : 20,
		toResult : 80,
		totalResult : 100,
		pageCount : 10
	}, item.calc());

	var item = new Paginator({
		current : 5,
		pageLinks : 6,
		totalResult : 100
	});

	assert.deepEqual({
		prelink : "",
		current : 5,
		previous : 4,
		next : 6,
		first : 1,
		last : 10,
		range : [2, 3, 4, 5, 6, 7],
		fromResult : 20,
		toResult : 70,
		totalResult : 100,
		pageCount : 10
	}, item.calc());

	var item = new Paginator({
		current : 5,
		pageLinks : 4,
		totalResult : 100
	});
	assert.deepEqual({
		prelink : "",
		current : 5,
		previous : 4,
		next : 6,
		first : 1,
		last : 10,
		range : [3, 4, 5, 6],
		fromResult : 30,
		toResult : 60,
		totalResult : 100,
		pageCount : 10
	}, item.calc());

	var item = new Paginator({
		prelink : '/',
		current : 5,
		pageLinks : 4,
		totalResult : 100
	});
	assert.deepEqual({
		prelink : '/',
		current : 5,
		previous : 4,
		next : 6,
		first : 1,
		last : 10,
		range : [3, 4, 5, 6],
		fromResult : 30,
		toResult : 60,
		totalResult : 100,
		pageCount : 10
	}, item.calc());

	/* pageLinks 5 by default; howto specify for Item Pattern */
	var item = new Paginator({
		current : 5,
		totalResult : 100
	});
	assert.deepEqual({
		prelink : '',
		current : 5,
		previous : 4,
		next : 6,
		first : 1,
		last : 10,
		range : [3, 4, 5, 6, 7],
		fromResult : 30,
		toResult : 70,
		totalResult : 100,
		pageCount : 10
	}, item.calc());

	var item = new Paginator({
		prelink : '/',
		current : 5,
		pageLinks : 4,
		totalResult : 100
	});

	assert.equal('/?', item.preparePreLink('/'));
	assert.equal('/?q=testing&', item.preparePreLink('/?q=testing'));
	assert.equal('http//igeonote.com/?', item.preparePreLink('http//igeonote.com/'));
	assert.equal('http//sibox.isgoodness.com/q/testing?', item.preparePreLink('http//sibox.isgoodness.com/q/testing'));

	item.set('totalResult', 3000);
	item.set('notSupported', 'notfound');
	// ugly :-)
	item.set('translator',null);
	assert.deepEqual({
		totalResult : 3000,
		prelink : '/',
		rowsPerPage : 10,
		pageLinks : 4,
		current : 5,
		template : '{PreviousPageLink} <strong>{CurrentPageReport}</strong> {NextPageLink}',
		translator : null
	}, item.options);

}

test();