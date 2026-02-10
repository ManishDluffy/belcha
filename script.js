let lastX = 0, lastY = 0, lastZ = 0;
let threshold = 15;
let sound = document.getElementById("sound");

function enableMotion() {
  if (typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then(permission => {
        if (permission === "granted") {
          window.addEventListener("devicemotion", handleMotion);
        }
      });
  } else {
    window.addEventListener("devicemotion", handleMotion);
  }
}

function handleMotion(event) {
  let x = event.accelerationIncludingGravity.x;
  let y = event.accelerationIncludingGravity.y;
  let z = event.accelerationIncludingGravity.z;

  let delta =
    Math.abs(x - lastX) +
    Math.abs(y - lastY) +
    Math.abs(z - lastZ);

  if (delta > threshold) {
    sound.currentTime = 0;
    sound.play();
  }

  lastX = x;
  lastY = y;
  lastZ = z;
}
