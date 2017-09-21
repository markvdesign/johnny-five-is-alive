const express = require('express'); // Load express
const cors = require('cors');
const app = express();
const axios = require('axios');
const path = require('path');
const five = require('johnny-five');

// JOHNNY-FIVE CONFIG AND STARTUP
// =============================================================================
const board = five.Board();
let led = null;

board.on("ready", function(){
    led = new five.Led(53);

    this.repl.inject({
        led: led
    });

});

board.on("exit", function(){
    led = new five.Led(53);
    led.off();
});

// SERVER CONFIG
// =============================================================================
const port = process.env.PORT || 8081;

// MIDDLEWARE
// ==================
app.use(cors());
app.options('*', cors());

app.use(express.static(path.join(__dirname, 'www')));

app.use('/led', function(req, res){
    led.toggle();
    let status = board.pins[53].value == 1 ? 'on' : 'off';
    return res.json({ledState: status});
});


// START THE SERVER
// =============================================================================
app.listen(port);
console.info('The magic happens on port 8081');