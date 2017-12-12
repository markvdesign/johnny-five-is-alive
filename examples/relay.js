const five = require('johnny-five');
const board = new five.Board();

board.on('ready', function() {
    const relay = new five.Relay(22);

    console.log(`What type of relay are you? ${relay.type}`);

    relay.close();

    setInterval(() => {
        relay.toggle();
        console.log(`Is the relay on?  ${relay.isOn}`);
    }, 1000);
    
    // Read, Eval, Print, Loop allows us to do some basic functionality
    // from the command line
    this.repl.inject({
        relay: relay
    });

});

board.on('exit', () => {
    const relay = new five.Relay(22);

    relay.open();
});