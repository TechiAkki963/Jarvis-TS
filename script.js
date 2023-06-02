"use strict";

const textarea = document.querySelector("textarea");
const voiceList = document.querySelector("select");
const speechBtn = document.querySelector("button");

let synth = speechSynthesis;
let isSpeaking = true;

voices();

function voices() {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = `<option value="${voice.name}" ${selected}>
      ${voice.name}(${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

synth.addEventListener("voiceschanged", voices);

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

async function startRecording() {
  let recorder = new MediaRecorder(stream);
  let chunks = [];

  recorder.ondataavailable = function(e) {
    chunks.push(e.data);
  };

  recorder.onstop = async function() {
    let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    let url = URL.createObjectURL(blob);
    let mp4Blob = await convertOggToMp4(url);
    let mp4Url = URL.createObjectURL(mp4Blob);
    let downloadLink = document.createElement("a");
    downloadLink.href = mp4Url;
    downloadLink.download = "recorded_audio.mp4";
    downloadLink.innerHTML = "Download";
    document.body.appendChild(downloadLink);
  };
  
  async function convertOggToMp4(url) {
      let mp4Blob = await new Promise(resolve => {
          let ffmpeg = require('ffmpeg');
          ffmpeg.input(url).output('recorded_audio.mp4').on('error', err => {
              console.error(err);
          }).on('end', () => {
              resolve(mp4Blob);
          });
      });
  
      return mp4Blob;
  }
}
