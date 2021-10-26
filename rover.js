class Rover {
   // Write code here!
  constructor(position, mode, generatorWatts = 110) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    if (message.commands[0].commandType === 'STATUS_CHECK') {
      return {
        message: message.name,
        results: [
          {
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          }
        ]
      }
    } else {
      return {
        message: message.name,
        results: message.commands
      };
    }
    
  };
}

module.exports = Rover;