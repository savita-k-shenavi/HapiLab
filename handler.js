/**
 * http://usejsdoc.org/
 */
'use strict';

var mongo = require('./mongo-db.js');



function findAllCategories(request, reply) {
	console.log("findAllUsers ...");
	var limits = parseInt(request.query.limit);
	var offset = parseInt(request.query.offset);
	var options = {
		"limit": limits,
		"skip": offset
	}
	var MongoFilterCondition = {};
	if (request.query.UserId) {
		MongoFilterCondition["UserId"] = request.query.UserId;
	}
	var MongoPrintFieldCondition = {};
	mongo.findDocuments('categories', MongoFilterCondition, options, function (data) {
		reply(data);
	});
	//  mongo.findCategories('categories',function(data){
	//  	//console.log("collection Name " + categories);
	//  	reply(data);
	//  });
}

function ArrayFindMyApi(request, reply) {
	console.log("ArrayFindMyApi's ...");
	console.log("ArrayFindMyApi's ..." + JSON.stringify(request.payload));
	var limits = parseInt(request.query.limit);
	var offset = parseInt(request.query.offset);
	if (!limits) {
		limits = 10
	}
	if (!offset) {
		offset = 0
	}
	var options = {
		"limit": limits,
		"skip": offset,
		fields: {
			_id: false
		}
	}
	var objectWithApiIds = request.payload;
	if (objectWithApiIds) {
		var apiIds = [];
		for (var i = 0; i < objectWithApiIds.apiIds.length; i++) {
			apiIds.push(objectWithApiIds.apiIds[i]);
		}
		var newFilterCondition = {
			api_id: {
				$in: apiIds
			}
		};
		mongo.findDocuments('sw_api', newFilterCondition, options, function (latestdata) {
			reply(latestdata);
		})
	} else {
		reply({
			LimitedHits: 0,
			TotalHits: 0,
			results: []
		});
	}
}


function findAllTags(request, reply) {
	console.log("getalltags ...");
	var limits = parseInt(request.query.limit);
	var offset = parseInt(request.query.offset);
	if (!limits) {
		limits = 50
	}
	if (!offset) {
		offset = 0
	}
	var options = {
		"limit": limits,
		"skip": offset,
		fields: {
			_id: false,
			"api_id": true,
			"keyword": true
		}
	}
	var MongoFilterCondition = {};
	MongoFilterCondition = {
		"keyword": {
			$ne: ""
		}
	};
	// if (request.params.email) {
	mongo.findDocuments('sw_api', MongoFilterCondition, options, function (data) {
		var resultdata = [];
		for (var i = 0; i < data.TotalHits; i++) {
			var item = data.results[i].keyword;
			if (item) {
				console.log(item.split('|'));
				for (var j = 0; j < item.split('|').length; j++) {
					resultdata.push({
						api_id: data.results[i].api_id,
						value: item.split('|')[j].trim(),
						count: item.split('|').length
					});
				}
			}
		}
		var resItems = grouptagsbyApiId(resultdata);
		resItems.forEach(function (arrayItem) {
			arrayItem.count = arrayItem.api_id.length;
		});
		reply(resItems);
	});
}
function findAllValueChain(request, reply) {
	console.log("findAllValueChain ...");
	var limits = parseInt(request.query.limit);
	var offset = parseInt(request.query.offset);
	var options = {
		"limit": limits,
		"skip": offset
	}
	var MongoFilterCondition = {};
	if (request.query.UserId) {
		MongoFilterCondition['UserId'] = request.query.UserId;
	}
	var MongoPrintFieldCondition = {};
	mongo.findDocuments('value_chain', MongoFilterCondition, options, function (data) {
		reply(data);
	});
}
function findAllDatasubject(request, reply) {
	console.log("findAllDatasubject ...");
	var MongoFilterCondition = {};
	if (request.query.UserId) {
		MongoFilterCondition['UserId'] = request.query.UserId;
	}
	var MongoPrintFieldCondition = {};
	mongo.findDocuments('data_subject', MongoFilterCondition, MongoPrintFieldCondition, function (data) {
		reply(data);
	});
}
function findAPI(request, reply) {
	console.log("findAPIS ...");
	var limits = parseInt(request.query.limit);
	var offset = parseInt(request.query.offset);
	var apiname = request.params.apiname;
	var sortField = request.query.sortField;
	var sortOrder = parseInt(request.query.sortOrder);
	if (!limits) {
		limits = 10
	}
	if (!offset) {
		offset = 0
	}
	if (!sortField) {
		sortField = "epr_id"
	}
	if (!sortOrder) {
		sortOrder = parseInt(-1)
	}
	var options = {
		"limit": limits,
		"skip": offset,
		fields: {
			_id: false
		},
		sort: [
			[sortField, sortOrder]
		]
	}
	var MongoFilterCondition = {};
	mongo.findDocuments('sw_api', MongoFilterCondition, options, function (data) {
		reply(data);
	});
}

function findUser(request, reply) {
	console.log("findUser ...");
	var limits = parseInt(request.query.limit);
	var offset = parseInt(request.query.offset);
	if (!limits) {
		limits = 10
	}
	if (!offset) {
		offset = 0
	}
	var options = {
		"limit": limits,
		"skip": offset
	}
	var MongoFilterCondition = {};
	if (request.query.UserId) {
		MongoFilterCondition['UserId'] = request.query.UserId;
	}
	mongo.findDocuments('user', MongoFilterCondition, options, function (data) {
		reply(data);
	});
}

function registerUser(request, reply) {
	console.log("registerUser ...");
	if (request.payload) {
		mongo.insertDocuments('user', request.payload, function (data) {
			reply(data);
		});
	} else {
		reply('Invalid request..!').code(400);
	}
}

function hello(request, reply) { //Action 
					// Response JSON object 
					reply("shweta");
				} 

exports.findUser = findUser;
exports.findAPI = findAPI;
exports.ArrayFindMyApi = ArrayFindMyApi;
exports.findAllCategories = findAllCategories;
exports.findAllValueChain = findAllValueChain;
exports.findAllDatasubject = findAllDatasubject;
exports.findAllTags = findAllTags;
exports.registerUser = registerUser;
exports.ArrayFindMyApi = ArrayFindMyApi;
exports.hello = hello;