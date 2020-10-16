var expect = require('chai').expect;

var Question = require('../Question');

describe('question', function () {
    it('should be invalid if category is empty', function (done) {
        var m = new Question();

        m.validate(function (err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });
});