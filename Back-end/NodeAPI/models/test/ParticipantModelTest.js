var expect = require('chai').expect;

var Category = require('../Participant');

describe('participant', function () {
    it('should be invalid if name is empty', function (done) {
        var m = new Category();

        m.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});

describe('participant', function () {
    it('should be invalid if score is empty', function (done) {
        var m = new Category();

        m.validate(function (err) {
            expect(err.errors.score).to.exist;
            done();
        });
    });
});