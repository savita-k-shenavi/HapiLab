/**
 * http://usejsdoc.org/
 */
'use strict';

var Joi = require('joi');
var assert = require('assert');
var Boom = require('boom');
var Handlers = require('./handler');

exports.register = function (server, options, next) {

	
		
		server.route({
		    method: 'GET',
		    path:'/categories',
		    config: {
				tags: ['api'],
		      handler: Handlers.findAllCategories,
		      description: 'Fetch All categories ',
		      notes: ['Fetch All categories']
		      }
		});

		server.route({
		    method: 'GET',
		    path:'/api/v1/apistore',
		    config: {
				tags: ['api'],
		      handler: Handlers.findAPI,
		      description: 'Fetch All API ',
		      notes: ['Fetch All API']
		      }
		});

		server.route({
		    method: 'POST',
		    path:'/api/v1/apistore/ArrayFindMyApi',
		    config: {
				tags: ['api'],
		      handler: Handlers.ArrayFindMyApi,
		      description: 'Fetch All API ',
		      notes: ['Fetch All API'],
			  validate: {
				  params: {},
        query: {
          limit: Joi.number().description('offset number of api to be Feteched').integer().min(1).max(100).default(10),
          offset: Joi.number().description('number of api records return').integer().min(0).max(100).default(0)
        },
        payload: Joi.object({
          apiIds: Joi.array()
        })
      }
			  }
		      
		});

		server.route({
		    method: 'GET',
		    path:'/api/v1/apistore/user',
		    config: {
				tags: ['api'],
		      handler: Handlers.findUser,
		      description: 'Fetch All API ',
		      notes: ['Fetch All API']
		      }
		});

		server.route({
		    method: 'GET',
		    path:'/api/v1/apistore/valuechain',
		    config: {
				tags: ['api'],
		      handler: Handlers.findAllValueChain,
		      description: 'Fetch All API ',
		      notes: ['Fetch All API']
		      }
		});

		server.route({
		    method: 'GET',
		    path:'/api/v1/apistore/datasubject',
		    config: {
				tags: ['api'],
		      handler: Handlers.findAllValueChain,
		      description: 'Fetch All API ',
		      notes: ['Fetch All API']
		      }
		});

		server.route({
		    method: 'GET',
		    path:'/api/v1/apistore/findAllTags',
		    config: {
				tags: ['api'],
		      handler: Handlers.findAllTags,
		      description: 'Fetch All API ',
		      notes: ['Fetch All API']
		      }
		});
		
		server.route({ 
			method: 'GET', // Methods Type 
			path: '/helloworld', // Url 
			config: { 
				// Include this API in swagger documentation 
				tags: ['api'], 
				description: 'Say Hello', 
				notes: 'Say Hello' }, 
				handler:Handlers.hello,
				
		}); 


		next();
	
};
exports.register.attributes = {name : 'shweta'};
