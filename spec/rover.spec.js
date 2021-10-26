const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    expect(new Rover(98382).position).toEqual(98382);
    expect(new Rover(98382).mode).toEqual('NORMAL');
    expect(new Rover(98382).generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message", function() {

  });
});
