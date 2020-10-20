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

describe('quiz', function () {
    it('should be invalid if timelimit is empty', function (done) {
        var m = new Quiz();

        m.validate(function (err) {
            expect(err.errors.timeLimit).to.exist;
            done();
        });
    });
});

describe('quiz', function () {
    it('should be invalid if question count is empty', function (done) {
        var m = new Quiz();

        m.validate(function (err) {
            expect(err.errors.questionCount).to.exist;
            done();
        });
    });
});


describe('quiz', function () {
    it('should be invalid if questions array is empty', function (done) {
        var m = new Quiz();

        m.validate(function (err) {
            expect(err.errors.questions).to.exist;
            done();
        });
    });
});


describe('quiz', function () {
    it('should be invalid if questionNumber is empty', function (done) {
        var m = new Quiz();

        m.validate(function (err) {
            expect(err.errors.questionNumber).to.exist;
            done();
        });
    });
});
