// Load express
const express= require('express');
const app = express();
const http = require('http').Server(app);
const serverIO = require('socket.io')(http);
const axios = require('axios');
const path = require('path');
const five = require('johnny-five');
const pin = 53;

// JOHNNY-FIVE CONFIG AND STARTUP
// =============================================================================
const board = five.Board();
let led = null;

board.on("ready", function(){
    led = new five.Led(pin);

    this.repl.inject({
        led: led
    });

});

board.on("exit", function(){
    led = new five.Led(pin);
    led.off();
});

// SERVER CONFIG
// =============================================================================
const port = process.env.PORT || 8081;

// SOCKET IO
serverIO.on("connection", function(clientSocket) {
    console.log('client has connected');

    let status;

    if(board.isReady) {
        status = board.pins[pin].value == 1 ? 'on' : 'off';
        
        let ledState = {
            ledState: status
        };
    
        serverIO.emit("led status", ledState);
    }

    clientSocket.on('toggle LED', function() {
        led.toggle();
    });

    clientSocket.on("disconnect", function() {
        console.log('client disconnected');
    });
});


// MIDDLEWARE
// ==================

app.use(express.static(path.join(__dirname, 'www')));

app.use('/led', function(req, res){
    led.toggle();
    let status = board.pins[pin].value == 1 ? 'on' : 'off';
    return res.json({ledState: status});
});


// START THE SERVER
// =============================================================================
http.listen(port);
console.info('The magic happens on port 8081');