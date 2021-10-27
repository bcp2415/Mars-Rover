class Rover {
   // Write code here!
  constructor(position, mode, generatorWatts = 110) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  receiveMessage(message) {
    let response = {
      message:  message.name
    };
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
        console.log(results);
      } else {
        results.push(command);
        console.log(reults);
      }
          
    }
    response('results') = results;
    console.log(`response is as follows: `, response);
    return response;
  };
}

module.exports = Rover;