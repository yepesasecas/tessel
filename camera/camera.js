var tessel = require("tessel");
var camera = require("camera-vc0706").use(tessel.port["A"]);

var notificationLED = tessel.led[3];

camera.on("ready", function(){
  notificationLED.high();

  camera.setResolution("qqvga", function(){
    console.log("Set resolution ");
  });

  camera.takePicture(function(error, image){
    if(error){
      console.error("error taking image", error);
    }
    else {
      var name = "picture-" + Math.floor(Date.now()*1000) + ".jpg";
      console.log("Picture saving as ", name, "...");

      notificationLED.low();
      
      process.sendfile(name, image);
      console.log("done.");

      camera.disable();
    }
  });
});

camera.on("error", function(error){
  console.error(error)
});
