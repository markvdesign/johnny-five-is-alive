const five = require('johnny-five');
const board = new five.Board();

board.on('ready', () => {
    const relay = new five.Relay(28);

    console.log(`What type of relay are you? ${relay.type}`);

    relay.close();

    setInterval(() => {
        relay.toggle();
        console.log(`Is the relay on?  ${relay.isOn}`);
    }, 5000);

    // Read, Eval, Print, Loop allows us to do some basic functionality
    // from the command line
    this.repl.inject({
        toggle: function(){
            relay.toggle();
        },
        open: function() {
            relay.open();
        },
        close: function() {
            relay.close();
        }
    });
});

board.on('exit', () => {
    const relay = new five.Relay(28);

    relay.open();
});