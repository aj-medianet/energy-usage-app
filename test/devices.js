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

describe('Check user login', () => {
  it('should check that we can login', (done) => {
    chai.request(app)
      .post('/login')
      .send(userCredentials)
      .end(function(err, res){
        // there should be no errors
        should.not.exist(err);
        // there should be a 200 status code
        res.status.should.equal(200);
        

        done();
      });
    agent
      .post('/login')
      .send(userCredentials)
      .then(function(res) {
        expect(res).to.have.cookie('session_id');
      
        return agent.get('/login/')
          .then(function (res) {
            expect(res).to.have.status(200);
        });
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
  it('should respond devices page', (done) => {
    chai.request(app)
    .get('/devices/')
    .end((err, res) => {
      // there should be no errors
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

describe('GET /', () => {
  it('should respond device page', (done) => {
    chai.request(app)
    .get('/devices/1')
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
    updatedDevice.name = "Toaster";
    updatedDevice.manufacturer = "Toasty";
    updatedDevice.deviceOnOff = 1;

    chai.request(app)
    .put('/devices/1')
    .send(updatedDevice)
    .end((err, res) => {
       // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
     });

     chai.request(app)
     .get('/devices/1')
     .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);
      // the response should be JSON
      res.type.should.equal('text/html');

      var data = JSON.parse(res.header.data);

      data.device.id.should.equal(1);
      data.device.name.should.equal('Toaster');
      data.device.manufacturer.should.equal('Toasty');
      data.device.deviceOnOff.should.equal(1);

      done();
    });
  });
});

describe('PUT /', () => {
  it('should update to original device in the database', (done) => {

    var origDevice = {};
    origDevice.name = "Microwave";
    origDevice.manufacturer = "Toshiba";
    origDevice.deviceOnOff = 0;

    chai.request(app)
    .put('/devices/1')
    .send(origDevice)
    .end((err, res) => {
      // there should be no errors
      should.not.exist(err);
      // there should be a 200 status code
      res.status.should.equal(200);

    });

    chai.request(app)
    .get('/devices/1')
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
