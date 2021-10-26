class Rover {
   // Write code here!
  constructor(position, mode, generatorWatts = 110) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    console.log('this = ', this);
    if (messagecommands[0].commandType === 'STATUS_CHECK') {
          const returnObject = {
            completed: true,
            roverStatus: {
              mode: 'NORMAL',
              generatorWatts: 110,
              position: rover.position
            }
          };
        };
    return {
      message: message.name,
      results: 'tbd'
    };
  };
}

module.exports = Rover;