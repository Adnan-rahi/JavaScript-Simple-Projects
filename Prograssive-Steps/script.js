const progress = document.getElementById("progress");
const previous = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");

let currentActiveStep = 1;

next.addEventListener("click", () => {
  currentActiveStep++;

  if (currentActiveStep > circles.length) {
    currentActiveStep = circles.length;
  }

  stepForward();
});

previous.addEventListener("click", () => {
  currentActiveStep--;

  if (currentActiveStep < 1) {
    currentActiveStep = 1;
  }

  stepForward();
});

const stepForward = () => {
  circles.forEach((circle, index) => {
    if (index < currentActiveStep) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const actives = document.querySelectorAll("active");

  progress.style.width =
    ((actives.length - 1) / (circles.length - 1)) * 100 + "%";

  if (currentActiveStep === 1) {
    previous.disabled = true;
  } else if (currentActiveStep === circles.length) {
    next.disabled = true;
  } else {
    previous.disabled = false;
    next.disabled = false;
  }
};
