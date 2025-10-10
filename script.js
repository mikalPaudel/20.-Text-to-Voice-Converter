let speech = new SpeechSynthesisUtterance();
let voices = [];

const voiceSelect = document.querySelector("select");

function populateVoices() {
  voices = window.speechSynthesis.getVoices();

  if (!voices.length) {
    console.log("No voices yet...");
    return;
  }

  voiceSelect.innerHTML = ""; // clear old

  voices.forEach((voice, i) => {
    const label = voice.name || `Voice ${i}`;
    const option = new Option(`${label} (${voice.lang})`, i);
    voiceSelect.add(option);
  });

  // set default
  speech.voice = voices[0];
}

speechSynthesis.onvoiceschanged = populateVoices;

// fallback in case voiceschanged never fires
setTimeout(populateVoices, 1000);

voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
  speech.text = document.querySelector("textarea").value;
  speechSynthesis.speak(speech);
});
