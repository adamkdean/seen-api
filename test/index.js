'use strict';

const Hapi = require('hapi');
const routes = require('../dist/routes');
const chai = require('chai');
const chaiThings = require('chai-things');
const expect = chai.expect;
const assert = chai.assert;
const GET = (url) => ({ method: 'GET', url });

const requiredFilmProperties = ['title', 'director', 'score', 'length'];
const requiredReviewProperties = [];

//
// Setup
//
chai.use(chaiThings);

beforeEach(() => {
  let server = this.server = new Hapi.Server();
  server.connection({ port: 6000 });
  server.route(routes);
});

//
// Tests
//
describe('GET /', () => {
  const request = GET('/');

  it('should return http 200', (done) =>
    this.server.inject(request, (response) => {
      assert.equal(response.statusCode, 200);
      done();
    })
  );

  it('should return status OK in JSON', (done) =>
    this.server.inject(request, (response) => {
      expect(response.result).to.have.property('status', 'OK');
      done();
    })
  );
});

// N.B. I'm not sure if this kind of things is frowned upon in tests. On one hand,
// it avoids duplicated code, on the other, I've not seen this style before...
[
  '/films',
  '/films?when=last_week',
  '/films?when=last_month',
  '/films?when=last_year',
  '/films?when=all_time'
]
.forEach((url) => {
  describe(`GET ${url}`, () => {
    const request = GET(url);

    it('should return http 200', (done) =>
      this.server.inject(request, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      })
    );

    it('should return an array', (done) =>
      this.server.inject(request, (response) => {
        expect(response.result).to.be.an('array');
        done();
      })
    );

    requiredFilmProperties.forEach((property) => {
      it(`should contain objects with property ${property}`, (done) =>
        this.server.inject(request, (response) => {
          expect(response.result).to.all.have.property(property);
          done();
        })
      );
    });
  });
});

describe('GET /film/interstellar', () => {
  const request = GET('/film/interstellar');

  it('should return http 200', (done) =>
    this.server.inject(request, (response) => {
      assert.equal(response.statusCode, 200);
      done();
    })
  );

  it('should return an object', (done) =>
    this.server.inject(request, (response) => {
      expect(response.result).to.be.an('object');
      done();
    })
  );

  requiredFilmProperties.forEach((property) => {
    it(`should contain objects with property ${property}`, (done) =>
      this.server.inject(request, (response) => {
        expect(response.result).to.have.property(property);
        done();
      })
    );
  });
});

describe('GET /reviews/interstellar', () => {
  const request = GET('/reviews/interstellar');

  it('should return http 200', (done) =>
    this.server.inject(request, (response) => {
      assert.equal(response.statusCode, 200);
      done();
    })
  );

  it('should return an array', (done) =>
    this.server.inject(request, (response) => {
      expect(response.result).to.be.an('array');
      done();
    })
  );

  requiredReviewProperties.forEach((property) => {
    it(`should contain objects with property ${property}`, (done) =>
      this.server.inject(request, (response) => {
        expect(response.result).to.all.have.property(property);
        done();
      })
    );
  });
});
