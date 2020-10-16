var expect = require('chai').expect;

var Quiz = require('../Quiz');

describe('quiz', function () {
    it('should be invalid if category is empty', function (done) {
        var m = new Quiz();

        m.validate(function (err) {
            expect(err.errors.categoryId).to.exist;
            done();
        });
    });
});