const second = document.querySelector(".second");
const minute = document.querySelector(".minute");
const hour = document.querySelector(".hour");

function setTime() {
  const now = new Date();

  const getSec = now.getSeconds();
  const getMint = now.getMinutes();
  const getHour = now.getHours();
  
  const secondDeg = (getSec / 60) * 360;
  const minuteDeg = (getMint / 60 ) * 360;
  const hourDeg = (getHour / 12) * 360

  second.style.transform = `rotate(${secondDeg}deg)`
  minute.style.transform = `rotate(${minuteDeg}deg)`
  hour.style.transform = `rotate(${hourDeg}deg)`
}

setInterval(setTime, 1000);
