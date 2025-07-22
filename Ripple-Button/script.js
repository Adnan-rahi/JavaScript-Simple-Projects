const button = document.querySelector(".btn");

let ripple;

button.addEventListener("mouseenter", (e) => {
  const left = e.clientX - e.target.getBoundingClientRect().left;
  const top = e.clientY - e.target.getBoundingClientRect().top;

  ripple = document.createElement("div");
  ripple.classList.add("ripple");
  ripple.style.top = `${top}px`;
  ripple.style.left = `${left}px`;

  button.prepend(ripple);
});

button.addEventListener("mouseleave", () => {
  button.removeChild(ripple);
});
