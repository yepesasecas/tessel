var tessel  = require("tessel");
var climate = require("climate-si7020").use(tessel.port["A"]);

climate.on("ready", function(){
  setImmediate(function loop(){
    climate.readTemperature("celsius", function(error, temp){
      climate.readHumidity(function(error, humid){
        console.log("Degrees:", temp.toFixed(4) + "C", "Humidity:", humid.toFixed(4) + "%RH");
        setTimeout(loop, 1000);
      });
    });
  });
});

climate.on("error", function(error){
  console.error(error)
});
