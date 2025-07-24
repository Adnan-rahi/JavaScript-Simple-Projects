const loadContent = document.querySelector(".loading-text");
const bg = document.querySelector(".bg");

let load = 0;

const bluring = () => {
  load++;

  if (load > 99) {
    clearInterval(int);
  }
  loadContent.innerText = `${load}%`;
  loadContent.style.opacity = scale(load, 0, 100, 1, 0);
  bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`
};

const int = setInterval(bluring, 50);

// find the range of number.

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
