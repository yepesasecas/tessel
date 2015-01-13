var tessel = require("tessel");
var ambient = require("ambient-attx4").use(tessel.port["A"]);

ambient.on("ready", function(){
  setInterval(function(){
    ambient.getLightLevel(function(lError, ldata){
      if(err) throw lError;
      ambient.getSoundLevel(function(sError, sdata){
        if(err) throw sError;
        console.log("light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
      });
    });
  }, 500);
});

ambient.on("error", function(e){
  console.log(e);
})
