var tessel = require('tessel');

var led1 = tessel.led[0].output(1);
var led2 = tessel.led[1].output(0);
var led3 = tessel.led[2].output(1);
var led4 = tessel.led[3].output(0);

console.log(tessel);

setInterval(function(){
  console.log("Im blinking! (Press CTRL + C to stop)");

  led1.toggle();
  led2.toggle();
  led3.toggle();
  led4.toggle();
}, 1000);
