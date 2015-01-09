var should = require("should");
var schema = require("../lib/attribute");
var validator = require("tv4");

var json;

describe('Attribute Validation', function(){

    beforeEach(function(){
        var name = require.resolve('./data/validAttribute');
        if(name) {
            delete require.cache[name];
        }
        json = require("./data/validAttribute");
    });

    describe("attribute with missing _id", function() {
        it("should result in an error message", function(){
            json._id = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: _id");
        });
    });

    describe("user with incorrect type _id", function() {
        it("should result in an error message", function(){
            json._id = "hello world";
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Invalid type: string (expected integer)");
        });
    });

    describe("attribute with missing name", function() {
        it("should result in an error message", function(){
            json.name = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: name");
        });
    });

    describe("attribute with missing abbreviation", function() {
        it("should result in an error message", function(){
            json.abbreviation = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: abbreviation");
        });
    });

    describe("attribute with abbreviation greater than 3 characters", function() {
        it("should result in an error message", function(){
            json.abbreviation = "AAAA";
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("String is too long (4 chars), maximum 3");
        });
    });

    describe("attribute with abbreviation less than 3 characters", function() {
        it("should result in an error message", function(){
            json.abbreviation = "BB";
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("String is too short (2 chars), minimum 3");
        });
    });

    describe("attribute with missing type", function() {
        it("should result in an error message", function(){
            json.type = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: type");
        });
    });

    describe("attribute with invalid type", function() {
        it("should result in an error message", function(){
            json.type = "Bowler";
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("No enum match for: \"Bowler\"");
        });
    });

    describe("attribute with missing description", function() {
        it("should result in an error message", function(){
            json.description = undefined;
            var result = validator.validate(json, schema);
            validator.error.message.should.equal("Missing required property: description");
        });
    });


    describe("valid attribute", function() {
        it("should validate", function(){
            var result = validator.validate(json, schema);
            result.should.be.true;
        });
    });
});

