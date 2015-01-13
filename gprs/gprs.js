var tessel = require('tessel');
var gprs = require('gprs-sim900').use(tessel.port['A']); 

//  Port, callback
gprs.on('ready', function() {
  console.log('GPRS module connected to Tessel. Searching for network...');
});

//  Emit unsolicited messages beginning with...
gprs.emitMe(['NORMAL POWER DOWN', 'RING', '+']);

gprs.on('NORMAL POWER DOWN', function powerDaemon () {
  gprs.emit('powered off');
  console.log('The GPRS Module is off now.');
});

gprs.on('RING', function someoneCalledUs () {
  console.log("Someone's calling!");
  console.log("Type the command 'ATA' to answer and 'ATH' to hang up.");
  console.log("You'll need a mic and headset connected to talk and hear.");
  console.log("If you want to call someone, type 'ATD\"[their 10+digit number]\"'.")
});

gprs.on('+', function handlePlus (data) {
  console.log("Got an unsolicited message that begins with a '+'! Data:", data);
  
  message_index = parseInt(data.split(",")[1]);
  console.log(message_index);
  
  gprs.readSMS(message_index, 1, 0, function(e, message){
    console.log(e);
    console.log(message[2]);
  });
});

//  Command the GPRS module via the command line
process.stdin.resume();
process.stdin.on('data', function (data) {
  data = String(data).replace(/[\r\n]*$/, '');  //  Removes the line endings
  console.log('got command', [data]);
  gprs._txrx(data, 10000, function(err, data) {
    console.log('\nreply:\nerr:\t', err, '\ndata:');
    data.forEach(function(d) {
      console.log('\t' + d);
    });
    console.log('');
  });
});

//  Handle errors
gprs.on('error', function (err) {
  console.log('Got an error of some kind:\n', err);
});
