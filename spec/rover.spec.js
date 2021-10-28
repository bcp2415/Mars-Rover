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
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.message).toEqual(message.name);
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message = new Message('Test message with two commands', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results.length).toEqual(2)
  });

  it("responds correctly to status check command", function() {
    const commands = [new Command('STATUS_CHECK')];
    const message = new Message('Test status check command', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[0].roverStatus.mode).toEqual(rover.mode);
    expect(response.results[0].roverStatus.generatorWatts).toEqual(rover.generatorWatts);
    expect(response.results[0].roverStatus.position).toEqual(rover.position);

    const commands2 = [new Command('MOVE', 98000), new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    const message2 = new Message('Test STATUS_CHECK command after changing default values for mode and position', commands2);
    rover.generatorWatts = 100;
    const response2 = rover.receiveMessage(message2);
    expect(response2.results[2].roverStatus.position).toEqual(98000);
    expect(response2.results[2].roverStatus.mode).toEqual('LOW_POWER');
    expect(response2.results[2].roverStatus.generatorWatts).toEqual(100);
  });

  it("responds correctly to mode change command", function() {
    const commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    const message = new Message('Test mode change to low power', commands);
    const rover = new Rover(98382);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(true);
    rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');

    const commands2 = [new Command('MODE_CHANGE', 'NORMAL')];
    const message2 = new Message('Test mode change to normal', commands2);
    const response2 = rover.receiveMessage(message2);
    expect(response.results[0].completed).toEqual(true);
    rover.receiveMessage(message2);
    expect(rover.mode).toEqual('NORMAL');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    const rover = new Rover(98382);
    rover.mode = 'LOW_POWER';
    const commands = [new Command('MOVE', 98383)];
    const message = new Message('Test MOVE command in low power mode', commands);
    const response = rover.receiveMessage(message);
    expect(response.results[0].completed).toEqual(false);
    expect(rover.position).toEqual(98382);
  });

  it("responds with position for move command", function() {
    const rover = new Rover(98382);
    const commands = [new Command('MOVE', 98383)];
    const message = new Message('Test MOVE command', commands);
    rover.receiveMessage(message);
    expect(rover.position).toEqual(98383);
  });
});
