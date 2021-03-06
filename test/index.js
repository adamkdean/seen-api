'use strict';

const Hapi = require('hapi');
const api = require('../src/api');
const chai = require('chai');
const chaiThings = require('chai-things');
const expect = chai.expect;
const assert = chai.assert;
const GET = (url) => ({ method: 'GET', url });

const requiredFilmProperties = ['slug', 'title', 'director', 'score', 'overview', 'poster_path', 'length'];
const requiredReviewProperties = ['id', 'film_slug', 'film_title', 'poster_path', 'author', 'content', 'summary'];

//
// Setup
//
let server = null,
    db = null;

chai.use(chaiThings);

beforeEach(async () => {
  await api.init();

  server = new Hapi.Server();
  db = api.db;

  server.connection({ port: 6000 });
  server.route(api.routes);
});

afterEach(async () => {
  db.close();
});

//
// Tests
//
describe('GET /', () => {
  const request = GET('/');

  it('should return http 200', (done) =>
    server.inject(request, (response) => {
      assert.equal(response.statusCode, 200);
      done();
    })
  );

  it('should return status OK in JSON', (done) =>
    server.inject(request, (response) => {
      expect(response.result).to.have.property('status', 'OK');
      done();
    })
  );
});

// N.B. I'm not sure if this kind of thing is frowned upon in tests.
// On one hand it avoids duplicated code, on the other... dynamic tests...
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
      server.inject(request, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      })
    );

    it('should return an array', (done) =>
      server.inject(request, (response) => {
        expect(response.result).to.be.an('array');
        done();
      })
    );

    // yay, more dynamic tests
    requiredFilmProperties.forEach((property) => {
      it(`should contain objects with property ${property}`, (done) =>
        server.inject(request, (response) => {
          expect(response.result)
            .to.have.length.above(1)
            .and.to.all.have.property(property);
          done();
        })
      );
    });
  });
});

describe('GET /film/interstellar', () => {
  const request = GET('/film/interstellar');

  it('should return http 200', (done) =>
    server.inject(request, (response) => {
      assert.equal(response.statusCode, 200);
      done();
    })
  );

  it('should return an object', (done) =>
    server.inject(request, (response) => {
      expect(response.result).to.be.an('object');
      done();
    })
  );

  // actually, I really like dynamic tests
  requiredFilmProperties.forEach((property) => {
    it(`should have property ${property}`, (done) =>
      server.inject(request, (response) => {
        expect(response.result).and.to.have.property(property);
        done();
      })
    );
  });
});

[
  '/reviews',
  '/reviews?when=last_week',
  '/reviews?when=last_month',
  '/reviews?when=last_year',
  '/reviews?when=all_time'
]
.forEach((url) => {
  describe(`GET ${url}`, () => {
    const request = GET(url);

    it('should return http 200', (done) =>
      server.inject(request, (response) => {
        assert.equal(response.statusCode, 200);
        done();
      })
    );

    it('should return an array', (done) =>
      server.inject(request, (response) => {
        expect(response.result).to.be.an('array');
        done();
      })
    );

    requiredReviewProperties.forEach((property) => {
      it(`should contain objects with property ${property}`, (done) =>
        server.inject(request, (response) => {
          expect(response.result)
            .to.have.length.above(1)
            .and.to.all.have.property(property);
          done();
        })
      );
    });
  });
});

describe('GET /reviews/interstellar', () => {
  const request = GET('/reviews/interstellar');

  it('should return http 200', (done) =>
    server.inject(request, (response) => {
      assert.equal(response.statusCode, 200);
      done();
    })
  );

  it('should return an array', (done) =>
    server.inject(request, (response) => {
      expect(response.result).to.be.an('array');
      done();
    })
  );

  // I've decided this is now going to become a thing
  requiredReviewProperties.forEach((property) => {
    it(`should have property ${property}`, (done) =>
      server.inject(request, (response) => {
        expect(response.result)
          .to.have.length.above(1)
          .and.to.all.have.property(property);
        done();
      })
    );
  });
});
