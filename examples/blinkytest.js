"use strict";
exports.__esModule = true;
var johnny_five_1 = require("johnny-five");
var Blinky = (function () {
    function Blinky(board, led, repl) {
        board = new johnny_five_1.Board();
        led = new johnny_five_1.Led(13);
        board.on("ready", function () {
            led.on();
            repl.inject({
                on: function () {
                    led.on();
                },
                off: function () {
                    led.off();
                }
            });
        });
        board.on("exit", function () {
            led.off();
        });
    }
    return Blinky;
}());