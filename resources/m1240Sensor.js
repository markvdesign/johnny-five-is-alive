const five = require("johnny-five");
const board = new five.Board();
const sensorDataReadPin = 'A0';
const ledPin = '7';

board.on('ready', () => {
    // create our sensor and the power pin
    const m1240Sensor = new five.Sensor({
        id: 1,
        pin: sensorDataReadPin,
        freq: 1000
      });
    
    const led = new five.Led(ledPin);

    m1240Sensor.on('change', (data) => {

        console.log(
            `
                ---------------
                cm:   ${data}
                ---------------
            `
        );
    });

    m1240Sensor.scale([0, 255]).on('data', (data) => {
        led.brightness(data);
    })


    m1240Sensor.on('change', () => {
        // Put any code required to report the change in value
        console.log(`The object has moved.`);
    });
});

board.on('exit', () => {
    const led = new five.Led(ledPin);

    led.off();
    // Put all your closing code in this block

    console.log(`Shut down process complete.`);
});