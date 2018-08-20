'use strict';

const Lab = require('lab');
const lab = exports.lab = Lab.script();
const server = require('../app.js');
const mongo = require('../mongo-db.js');
const code = require('code');
process.env.NODE_ENV = 'test';
mongo.connect();

lab.experiment("Aplication test" , {timeout : 8000} ,function() {
//  debugger
  lab.test("Testing for 'HelloWorld'", function (done) {
    var options = { method: "GET", url: "/helloworld" };
    server.inject(options, function (response) {
      var result = response.result;
      console.log("result " + JSON.stringify(result));
      code.expect(result).to.equal("shweta");
      done();
    });
  });
  
// lab.before(() => {

//         const promise = mongo.connect();

//         return promise;
//     });

  lab.test("Testing for 'Category'" , function (done) {
    // return mongo.connect()
    //         .then((aValue) => {

    //             Code.expect(aValue).to.equal(expectedValue);
    //         });
    var options = { method: "GET", url: "/categories" };
    server.inject(options, function (response) {
         var result = response.result;
         console.log("result " + JSON.stringify(result));
         code.expect(response.statusCode).to.equal(200);
       //  code.expect(response.result.name).to.equal('Sales Automation and CRM');
         code.expect(response.result.results).to.be.instanceof(Array);
         code.expect(response.result).to.have.length(3);
         code.expect(response.result.LimitedHits).to.equal(7);
         done();
      
    });

  });

  lab.test("Testing for 'api'", function(done){
      var options = {method: "GET", url:"/api/v1/apistore/user"};
//      debugger
      server.inject(options, function(response){
        var result=response.result;
        console.log("result " + JSON.stringify(result));
        //code.expect(response.statusCode).to.equal(200);
        code.expect(response.result.results).to.be.instanceof(Array);
        code.expect(response.result).to.have.length(3);
        code.expect(response.result.LimitedHits).to.equal(10);
        done();
      });
  });

  lab.test("Testing for 'api'", function(done){
      var options = {method: "GET", url:"/api/v1/apistore"};
//      debugger
      server.inject(options, function(response){
        var result=response.result;
        console.log("result " + JSON.stringify(result));
        code.expect(response.statusCode).to.equal(200);
        code.expect(response.result.results).to.be.instanceof(Array);
        code.expect(response.result).to.have.length(3);
        code.expect(response.result.LimitedHits).to.equal(10);
        done();
      });
  }); 

  lab.test("Testing for 'api'", function(done){
      var options = {method: "GET", url:"/api/v1/apistore/valuechain"};
//      debugger
      server.inject(options, function(response){
        var result=response.result;
        console.log("result " + JSON.stringify(result));
        code.expect(response.statusCode).to.equal(200);
        code.expect(response.result.results).to.be.instanceof(Array);
        code.expect(response.result).to.have.length(3);
        code.expect(response.result.LimitedHits).to.equal(110);
        done();
      });
  }); 

  lab.test("Testing for 'api'", function(done){
      var options = {method: "GET", url:"/api/v1/apistore/datasubject"};
//      debugger
      server.inject(options, function(response){
        var result=response.result;
        console.log("result " + JSON.stringify(result));
        code.expect(response.statusCode).to.equal(200);
        code.expect(response.result.results).to.be.instanceof(Array);
        code.expect(response.result).to.have.length(3);
        code.expect(response.result.LimitedHits).to.equal(110);
        done();
      });
  }); 

/*lab.test("Testing for 'api'", function(done){
      var options = {method: "GET", url:"/api/v1/apistore/findAllTags"};
//      debugger
      server.inject(options, function(response){
        var result=response.result;
        console.log("result " + JSON.stringify(result));
        code.expect(response.statusCode).to.equal(200);
        code.expect(response.result.results).to.be.instanceof(Array);
        code.expect(response.result).to.have.length(3);
        code.expect(response.result.LimitedHits).to.equal(8);
        done();
      });
  }); */


});

