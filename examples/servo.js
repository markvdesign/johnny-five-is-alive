const five = require('johnny-five');
const board = new five.Board();
const panRange = [0, 180];
const titlRange = [0, 90]
let pan, tilt;
let joystick;

board.on('ready', function() {
    pan = new five.Servo({
        pin: 2,
        range: panRange,
        center: true
    });

    tilt = new five.Servo({
        pin: 3,
        range: titlRange
        //center: true
    });

    joystick = new five.Joystick({
        pins: ["A14", "A15"],
        invertX: true,
        freq: 100
    });

    joystick.on("change", function() {
        tilt.to(five.Fn.scale(this.x, -1, 1, 0, 90)); // I flipped these to suit my joystick
        pan.to(five.Fn.scale(this.y, -1, 1, 0, 180)); // As per above ^^^
    });

    this.repl.inject({
        pan: pan,
        tilt: tilt
    })
});

board.on('exit', function() {
    tilt.home();
    tilt.stop();
    pan.home();
    pan.stop();
});