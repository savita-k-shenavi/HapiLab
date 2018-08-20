'use strict';

const hapi = require('hapi');
const inert = require('inert');
const vision = require('vision');
const hapiSwagger = require('hapi-swagger');
const pack = require('./package');
 const  mongo = require('./mongo-db.js');

const server = new hapi.Server();

server.connection({
        host: 'localhost',
        port: 3000
    });
 

 server.register([
     require('./routes.js')], (err)=> {
	if(err) {
		throw err;
	}
});

const options = {
    info: {
            'title': 'Test API Documentation',
            'version': pack.version,
        }
    };
 
server.register([
    inert,
    vision,
    {
        'register': hapiSwagger,
        'options': options
    }], (err) => {
        server.start( (err) => {
           if (err) {
                console.log(err);
            } 
            else {
                console.log('Server running at:', server.info.uri);
				//mongo.connect();
            }
            
        });
	 });
 module.exports = server;
