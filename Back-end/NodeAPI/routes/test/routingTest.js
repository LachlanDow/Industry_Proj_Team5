var expect = require('chai').expect;
const express = require("express");
const categoriesRouter = require("../Category");
const mongoose = require("mongoose");
require('dotenv').config();

const supertest = require("supertest");
const app = require("../../server");
var Category = require('../../models/Category');
var password = process.env.DB_PASSWORD;


describe("POST /", function () {
    before(function (done) {
        mongoose.connect(`mongodb://quizAdmin:${password}@34.105.157.233:27017/quiz?authSource=admin`, { useNewUrlParser: true })
        .then(() => done())
            .catch((err) => done(err));

    });
    after(function (done) {
        mongoose.disconnect(`mongodb://quizAdmin:${password}@34.105.157.233:27017/quiz?authSource=admin`, { useNewUrlParser: true })
            .then(() => done())
            .catch((err) => done(err));

    });

    it("it should return new quiz object when posted", function (done) {
        supertest(app).post("/quiz")
            .send({

                "hostName": "Robert",
                "categoryId": "e6ef7f3ced4043d991b541cb49963bc9",
                "timeLimit": 20,
                "questionCount": 1
            } )
            .then((res) => {
                const body = res.body.newQuiz;
                expect(res.statusCode).to.equal(201);
                expect(body).to.contain.property('_id');
                expect(body.questionNumber).to.equal(0);
                expect(body.participants).to.be.an('array');
                expect(body.participants).to.have.lengthOf(1);
                expect(body.questions).to.have.lengthOf(body.questionCount);
                done();
            })
            .catch((err) => done(err));
            
            });
    });

