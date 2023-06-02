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
