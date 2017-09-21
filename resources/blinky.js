"use strict";
exports.__esModule = true;
var johnny_five_1 = require("johnny-five");
var led;
var board;
board = new johnny_five_1.Board();
board.on("ready", function () {
    var repl;
    led = new johnny_five_1.Led(53);
    led.on();
    this.repl.inject({
        led: led
    });
});
board.on("exit", function () {
    led = new johnny_five_1.Led(53);
    led.off();
});
