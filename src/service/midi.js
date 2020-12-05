var WebMidi = require("webmidi");

var midiFunc = (exec) => {
  console.log("in Midi Func");
  WebMidi.enable((err) => {
    console.log("midi enableing");
    if (err) {
      console.log("WebMidi could not be enabled.", err);
      return
    }
    console.log("WebMidi is enabled.");
    exec();
  })
}

export default {
  Listen(onAvailable,onPressed) {
    console.log("Initiating Listening");
    midiFunc(() => {
      console.log("Adding Listner");
      var input = WebMidi.inputs[0];
      if(!input){
        console.log("no inputs found, reconnect usb jack");
        return;
      }
      onAvailable();
      input.on("noteon", "all", function (e) {
        onPressed(e)
      })
    })
  },
  Stop() {
    console.log("Stopping Listening");
    midiFunc(() => input.removeListener("noteon", "all",(e)=> {
      console.log("Stopped Listening",e);
    }))
    WebMidi.disable();
  }
}

