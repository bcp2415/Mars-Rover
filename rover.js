class Rover {
   // Write code here!
  constructor(position, mode, generatorWatts = 110) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let response = {};
    response["message"] = message.name;
    let results = [];
    
    for (const command of message.commands) {
      if (command.commandType === 'STATUS_CHECK') {
        results.push({
              completed: true,
              roverStatus: {
                mode: this.mode,
                generatorWatts: this.generatorWatts,
                position: this.position
              }
        });
      } else if (command.commandType === 'MODE_CHANGE' && command.value === 'LOW_POWER') {
        results.push({
          completed:  true
        });
        this.mode = 'LOW_POWER';
      } else if (command.commandType === 'MODE_CHANGE' && command.value === 'NORMAL') {
        results.push({
          completed:  true
        });
        this.mode = 'NORMAL';
      } else if (command.commandType === 'MOVE' && this.mode === 'LOW_POWER') {
        results.push({
          completed:  false
        });
      } else if (command.commandType === 'MOVE') {
        this.position = command.value;
        results.push({
          completed:  true
        });
      } else {
        results.push(command);
      }
          
    }
    response['results'] = results;
    return response;
  };
}

module.exports = Rover;