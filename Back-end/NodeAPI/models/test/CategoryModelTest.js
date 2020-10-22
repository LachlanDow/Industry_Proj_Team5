var expect = require('chai').expect;

var Category = require('../Category');

describe('category', function () {
    it('should be invalid if name is empty', function (done) {
        var m = new Category();

        m.validate(function (err) {
            expect(err.errors.name).to.exist;
            done();
        });
    });
});

describe('category', function () {
    it('should be invalid if id is empty', function (done) {
        var m = new Category();

        m.validate(function (err) {
            expect(err.errors._id).to.exist;
            done();
        });
    });
});