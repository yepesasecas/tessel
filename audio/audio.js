var tessel = require("tessel");
var audio  = require("audio-vs1053b").use(tessel.port["A"]);

var chunks = [];

audio.on("data", function(data){
  chunks.push(data);
});

audio.on("ready", function(){
  console.log("Hold the config button to record...");
  tessel.button.once("press", startRecording);
});

function startRecording(){
  audio.startRecording("voice", function(){
    console.log("Recording...");
  });
  tessel.button.once("release", stopRecording);
}

function stopRecording(){
  console.log("stopping the recording...");
  audio.stopRecording(function(){
    console.log("Playing it back...");
    audio.play(Buffer.concat(chunks), function(error){
      chunks = [];
      console.log("Hold the config button to record...");
      tessel.button.once("press", startRecording);
    });
  });
}

audio.on("error", function(error){
  throw error;
});