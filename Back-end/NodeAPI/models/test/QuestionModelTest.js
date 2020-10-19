var expect = require('chai').expect;

var Question = require('../Question');

//validation tests
describe('question', function () {
    it('should be invalid if category is empty', function (done) {
        var m = new Question();

        m.validate(function (err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });
});

describe('question', function () {
    it('should be invalid if question is empty', function (done) {
        var m = new Question();

        m.validate(function (err) {
            expect(err.errors.question).to.exist;
            done();
        });
    });
});

describe('question', function () {
    it('should be invalid if answer is empty', function (done) {
        var m = new Question();

        m.validate(function (err) {
            expect(err.errors.answer).to.exist;
            done();
        });
    });
});

describe('question', function () {
    it('should be invalid if choices are empty', function (done) {
        var m = new Question();

        m.validate(function (err) {
            expect(err.errors.choices).to.exist;
            done();
        });
    });
});