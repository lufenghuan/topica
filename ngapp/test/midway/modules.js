//Ensure that our top-level module exists
describe("Midway Testing for Modules", function() {
  describe("topicaApp Module:", function() {

    var module;
    before(function() {
      module = angular.module("topicaApp");
    });

    it("should be registered", function() {
      expect(module).not.to.equal(null);
    });

  });
});