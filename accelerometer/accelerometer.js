var tessel = require('tessel');
var accelerometer = require('accel-mma84').use(tessel.port['A'])

accelerometer.on('ready', function(){
  setInterval(function(){
    accelerometer.getAcceleration(function(e, xyz){
      console.log(e);
      console.log(xyz);
    });
  }, 1000);
});

accelerometer.on('error', function(e){
  console.log('Error:', e);
});