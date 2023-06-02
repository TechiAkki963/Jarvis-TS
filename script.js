var input = document.getElementById("input");
var speak = document.getElementById("speak");

speak.onclick = function() {
  var text = input.value;
  var speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
  speechSynthesisUtterance.speak();
};
