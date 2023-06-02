"use strict";
const textarea = document.querySelector("textarea"),
  voiceList = document.querySelector("Select"),
  speechBtn = document.querySelector("button");

let synth = speechSynthesis,
  isSpeaking = true;

voices();



function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>
      ${voice.name}(${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voicechanged", voices);

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of synth.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }
  synth.speak(utterance);
}

speechBtn.addEventListener("click", function() {
  textToSpeech(textarea.value);
});


function startRecording() {
  recorder = new MediaRecorder(stream);
  chunks = [];

  recorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };


  
  recorder.onstop = function() {
    let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    let url = URL.createObjectURL(blob);
    let audio = new Audio(url);
    let downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "recorded_audio.ogg";
    downloadLink.innerHTML = "Download";
    document.body.appendChild(downloadLink);
    audio.play();
  };

  recorder.start();

 

  async function startRecording() {
    // ...
    let mp4Blob = await new Promise(resolve => {
      let ffmpeg = require('ffmpeg');
      ffmpeg.input(url).output('recorded_audio.mp4').on('error', err => {
          console.error(err);
      }).on('end', () => {
          resolve(mp4Blob);
      });
    });
    // ...
  }
}
