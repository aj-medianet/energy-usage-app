const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('GET /', () => {
  it('should respond nav page', (done) => {
    chai.request("http://localhost:3200")
    .get('/')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('text/html');
      done();
    });
  });
});

describe('GET /', () => {
  it('should respond nav page', (done) => {
    chai.request("http://localhost:3200")
    .get('/devices/')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('text/html');
      console.log(res.header.data);
      done();
    });
  });
});

describe('GET /', () => {
  it('should respond nav page', (done) => {
    chai.request("http://localhost:3200")
    .get('/devices/0')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('text/html');
      console.log(res.header.data);
      done();
    });
  });
});

describe('GET /', () => {
  it('should respond nav page', (done) => {
    chai.request("http://localhost:3200")
    .get('/devices/search')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('text/html');
      console.log(res.header.data);
      done();
    });
  });
});
