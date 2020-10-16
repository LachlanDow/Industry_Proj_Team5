var expect = require('chai').expect;
var sinon = require('sinon');
const express = require("express");
const categoriesRouter = require("../Category");



const supertest = require("supertest");
const app = require("../../server");
var Category = require('../../models/Category');


describe("GET /", function () {
    it("it should has status code 200", function (done) {
        supertest(app)
            .get("/")
            .expect(200)
            .end(function (err, res) {
                if (err) done(err);
                done();
            });
    });
});

