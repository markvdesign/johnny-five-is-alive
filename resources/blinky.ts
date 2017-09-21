import { Board, Led, Repl } from "johnny-five";

let led: Led;
let board: Board;

board = new Board();

board.on("ready", function() {
    led = new Led(53);
    led.on();
    this.repl.inject({
        led: led
    });
});

board.on("exit", () => {
    led = new Led(53);
    led.off();
});
