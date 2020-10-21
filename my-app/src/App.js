import React, { useState, useEffect } from 'react';
import './App.css';
import './grid.css';
function App() {
  return (
    <div>
      <DrumMachine />
    </div>
  );
}

const DrumMachine = () => {
  const keyArray1 = [
    { "Q": "Piano Chord 1", "src": "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" },
    { "W": "Piano Chord 2", "src": 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3' },
    { "E": "Piano Chord 3", "src": 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3' },
    { "A": "HiHat", "src": "https://raw.githubusercontent.com/wazebase/drum-machine/master/01%20HHclosed08.wav" },
    { "S": "Snare", "src": "https://raw.githubusercontent.com/wazebase/drum-machine/master/2Pac%20Snare3.wav" },
    { "D": "Bass", "src": "https://raw.githubusercontent.com/wazebase/drum-machine/master/808LONG'.WAV" },
    { "Z": "Shaker", "src": "https://raw.githubusercontent.com/wazebase/drum-machine/master/50%20Cent%20Shaker%201.wav" },
    { "X": "Kick", "src": "https://raw.githubusercontent.com/wazebase/drum-machine/master/50%20dre%20kick.wav" },
    { "C": "Flick", "src": "https://raw.githubusercontent.com/wazebase/drum-machine/master/50%20flick.wav" }];

  const keyArray2 = [{ "Q": "Heater-1", "src": 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3' },
  { "W": "Heater-2", "src": 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3' },
  { "E": "Heater-3", "src": 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3' },
  { "A": "Heater-4", "src": 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3' }
    , { "S": "Clap", "src": 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3' },
  { "D": 'Open-HH', "src": 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3' },
  { "Z": "Kick-n'-Hat", "src": 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3' },
  { "X": 'Kick', "src": 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3' },
  { "C": 'Closed-HH', "src": 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3' }];


  const [padName, setPadName] = useState("Drum kit 1");
  const [keys, setKeys] = useState(keyArray1);
  const [keysChange, setKeysChange] = useState(false);
  const [volume, setVolume] = useState(50);
  useEffect(() => {
    if (keysChange) {
      setPadName("Drum kit 2");
      setKeys(keyArray2);
    }
    if (!keysChange) {
      setPadName("Drum kit 1");
      setKeys(keyArray1);
    }
  }, [keysChange])

  document.addEventListener('keydown', function (key) {
    let padKey = key.key.toUpperCase();
    if (["Q", "W", "E", "A", "S", "D", "Z", "X", "C"].includes(padKey)) {
      handlePlay(padKey);
    }
  })

  const handlePlay = (padKey) => {
    handleColor(padKey);
    let newPadName;
    keys.map(obj => {
      if (Object.keys(obj)[0] === padKey) {
        newPadName = obj[padKey];
      }
    })
    setPadName(newPadName);
    let music = document.getElementById(padKey);
    if (music.currentTime > 0) {
      music.pause();
      music.currentTime = 0;
    }
    music.volume = volume / 100;
    music.play();
  }

  const handleColor = (padKey) => {
    let pad = document.getElementById("div-" + padKey);
    pad.style.backgroundColor = "rgba(0, 171, 238,0.7)";
    pad.style.marginTop = "3px";
    setTimeout(() => {
      pad.style.backgroundColor = "rgb(44, 32, 97)";;
      pad.style.boxShadow = '3px 3px 5px black';
      pad.style.marginTop = "0px";
    }, 200);

  }
  const handleVolumeChange = (currentVolume) => {
    setPadName("Volume:" + currentVolume);
    setVolume(currentVolume);
  }
  return (

    <div id="drum-machine">
      <div id="display">{padName}</div>
      <div class="slidecontainer">
        <input type="range" min="1" max="100" value={volume} class="slider" id="volume_slider"
          onChange={() => handleVolumeChange(document.getElementById("volume_slider").value)} />
      </div>
      <button id="bank" onClick={() => setKeysChange(!keysChange)}>Change bank</button>
      <div id="pads">
        <DrumPad padKey={"Q"} src={keys[0]["src"]} handlePlay={handlePlay} />
        <DrumPad padKey={"W"} src={keys[1]["src"]} handlePlay={handlePlay} />
        <DrumPad padKey={"E"} src={keys[2]["src"]} handlePlay={handlePlay} />
        <DrumPad padKey={"A"} src={keys[3]["src"]} handlePlay={handlePlay} />
        <DrumPad padKey={"S"} src={keys[4]["src"]} handlePlay={handlePlay} />
        <DrumPad padKey={"D"} src={keys[5]["src"]} handlePlay={handlePlay} />
        <DrumPad padKey={"Z"} src={keys[6]["src"]} handlePlay={handlePlay} />
        <DrumPad padKey={"X"} src={keys[7]["src"]} handlePlay={handlePlay} />
        <DrumPad padKey={"C"} src={keys[8]["src"]} handlePlay={handlePlay} />
      </div>
    </div>
  );
}
const DrumPad = (props) => {

  return (

    <div className="drum-pad" id={"div-" + props.padKey} onClick={() => props.handlePlay(props.padKey)}>
      <audio id={props.padKey} className="clip" src={props.src} />
      {props.padKey}
    </div>
  );
}


export default App;
