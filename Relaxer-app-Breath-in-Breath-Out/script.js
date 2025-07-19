const container = document.getElementById("container");
const text = document.getElementById("text");

let totalTime = 7500;
let breatheTime = (totalTime / 5) * 2;
let holdTime = totalTime / 5;

function bratheAnimation() {
  text.innerText = "Breathe In!";
  container.className = "container grow";

  setTimeout(() => {
    text.innerText = "Hold";

    setTimeout(() => {
      text.innerText = "Breathe Out!";
      container.classList.add('shrink') 
    }, holdTime);
  }, breatheTime);
}

setInterval(bratheAnimation, totalTime);

bratheAnimation();
