const five = require("johnny-five");
const board = new five.Board();
const sensorDataReadPin = 'A0';

board.on('ready', () => {
    const m1240Sensor = new five.Proximity({
        controller: "MB1230", // Use this Controller name as MB1240 isn't recognised.
        pin: sensorDataReadPin,
        freq: 1000 // this is in ms
      });

    m1240Sensor.on('data', (dataStream) => {
        console.log(
            `
                ---------------
                cm:   ${dataStream.cm}
                ---------------
            `
        );
    });

    m1240Sensor.on('change', () => {
        // Put any code required to report the change in value
        console.log(`The object has moved.`);
    });
});

board.on('exit', () => {
    console.log(`Shut down process complete.`);
});