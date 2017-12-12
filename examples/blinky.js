const five = require('johnny-five');
const board = new five.Board();
let led;

board.on("ready", function() {
    led = new five.Led(53);

    // led.blink(1000);
    led.on();

    this.repl.inject({
        myled: led
    });

});

board.on("exit", () => {
    led.off();
});