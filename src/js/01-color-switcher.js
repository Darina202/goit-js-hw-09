const startBtn = document.querySelector('[data-start]');
const stoptBtn = document.querySelector('[data-stop]');
let timerId;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startBtn.addEventListener('click', () => {
  timerId = setInterval(getButtonHexColor, 1000);
  startBtn.disabled = true;
  stoptBtn.disabled = false;
});
stoptBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stoptBtn.disabled = true;
});

function getButtonHexColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}
