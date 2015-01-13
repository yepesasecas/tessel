var tessel = require("tessel");
var ble    = require("ble-ble113a").use(tessel.port["A"]);

ble.on("ready", function(error){
  console.log("Scanning...");
  ble.startScanning();
});

ble.on("discover", function(peripheral){
  console.log("Discovered peripheral!", " address:", peripheral["address"].toString());
});
