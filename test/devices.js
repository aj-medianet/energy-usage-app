const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require("../app.js")

//const supertest = require('supertest');
//var agent = supertest.agent(app);
//var Cookies;

var agent = chai.request.agent(app);

const userCredentials = {
  email: 'tester@tester.com', 
  password: 'test123'
}

const wrongCredentials = {
  email: 'tester@tester.com',
  password: 'test'
}

describe('Check user login', () => {
  it('should check that the user can login', (done) => {
    chai.request(app)
      .post('/login')
      .send(userCredentials)
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.header('login', 'success');
        done();
    });
  });
});


describe('Check user login', () => {
  it('should verify that wrong credentials cannot login', (done) => {
    chai.request(app)
      .post('/login')
      .send(wrongCredentials)
      .end(function(err, res) {
        expect(res).to.not.have.header('login');
        done();
    });
  });
});


describe('Check user login', () => {
  it('should check that we can access devices page when logged in', (done) => {
    var agent = chai.request.agent(app);
    agent
      .post('/login')
      .send(userCredentials)
      .then(function(res) {
        agent.get('/devices/')
        .end((err, res) => {
          // there should be no error
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('text/html');

          var data = JSON.parse(res.header.data);
          data.devices[0].id.should.equal(1);
          data.devices[0].name.should.equal('Microwave');
          data.devices[0].deviceOnOff.should.equal(0);
          data.devices[0].currentEnergyUsage.should.equal(0);
          data.devices[0].averageEnergyUsage.should.equal(150);

          data.devices.length.should.equal(6);
        
        done();    
        });
     });
  });
});

describe('Check user login', () => {
  it('should redirect to login page when trying to visit devices page when not logged in', (done) => {
    chai.request(app)
      .get('/devices/')
      .end(function(err, res){
        expect(res).to.redirect;
        done();
    });
  });
});


describe('Check unauthorized user cant access any devices', () => {
  it('should redirect to login page', (done) => {
    chai.request(app)
      .get('/devices/1')
      .end(function(err, res){
        expect(res).to.redirect;
        done();
    });
  });
});

describe('GET /', () => {
  it('should respond nav page', (done) => {
    chai.request(app)
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
  it('should respond faq page', (done) => {
    chai.request(app)
    .get('/faq')
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
  it('should respond device page', (done) => {
    var agent = chai.request.agent(app);
    agent
      .post('/login')
      .send(userCredentials)
      .then(function(res) {
        agent.get('/devices/1')
          .end((err, res) => {
          // there should be no errors
          should.not.exist(err);
          // there should be a 200 status code
          res.status.should.equal(200);
          // the response should be JSON
          res.type.should.equal('text/html');

          var data = JSON.parse(res.header.data);

          data.device.id.should.equal(1);
          data.device.name.should.equal('Microwave');
          data.device.deviceOnOff.should.equal(0);
          data.device.currentEnergyUsage.should.equal(0);
          data.device.averageEnergyUsage.should.equal(150);

      done();
      });
    });
  });
});

describe('GET /', () => {
  it('should respond search page', (done) => {
    chai.request(app)
    .get('/devices/search')
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

describe('PUT /', () => {
  it('should update device in the database', (done) => {

    var updatedDevice = {};
    updatedDevice.name = "Microwave";
    updatedDevice.manufacturer = "Toshiba";
    updatedDevice.deviceOnOff = 0;

    var agent = chai.request.agent(app);
    agent
      .post('/login')
      .send(userCredentials)
      .then(function(res) {
        agent.put('/devices/1')
        .send(updatedDevice)
        .end((err, res) => {
         // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
     });

     agent.get('/devices/1')
     .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('text/html');

      var data = JSON.parse(res.header.data);

      data.device.id.should.equal(1);
      data.device.name.should.equal('Microwave');
      data.device.manufacturer.should.equal('Toshiba');
      data.device.deviceOnOff.should.equal(0);

      done();
      });
    });
  });
});


describe('PUT /', () => {
  it('should update to original device in the database', (done) => {

    var origDevice = {};
    origDevice.name = "Microwave";
    origDevice.manufacturer = "Toshiba";
    origDevice.deviceOnOff = 0;

    var agent = chai.request.agent(app);
    agent
      .post('/login')
      .send(userCredentials)
      .then(function(res) {
        agent.put('/devices/1')
        .send(origDevice)
        .end((err, res) => {
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);

    });

    agent.get('/devices/1')
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('text/html');

      var data = JSON.parse(res.header.data);

      data.device.id.should.equal(1);
      data.device.name.should.equal('Microwave');
      data.device.manufacturer.should.equal('Toshiba');
      data.device.deviceOnOff.should.equal(0);

      done();
      });
    });
  });
});

agent.close();
