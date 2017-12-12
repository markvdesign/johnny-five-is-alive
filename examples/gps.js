var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {

  var gps = new five.GPS({
    port: this.io.SERIAL_PORT_IDs.HW_SERIAL3,
    baud: 9600
  });

  this.repl.inject({
      gps: gps
  });

  // If latitude, longitude change log it
  gps.on("change", function() {
    console.log("position");
    console.log("  latitude   : ", this.latitude);
    console.log("  longitude  : ", this.longitude);
    console.log("  altitude   : ", this.altitude);
    console.log("--------------------------------------");
  });
  // If speed, course change log it
  gps.on("navigation", function() {
    console.log("navigation");
    console.log("  speed   : ", this.speed);
    console.log("  course  : ", this.course);
    console.log("--------------------------------------");
  });
});