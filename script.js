let lastX = 0, lastY = 0, lastZ = 0;
let threshold = 15;
let lastPlayTime = 0;

function startMotion() {
  // iOS permission (won’t hurt Android)
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission().then(permission => {
      if (permission === "granted") {
        window.addEventListener("devicemotion", detectShake);
        alert("Motion enabled! Now shake 📱");
      } else {
        alert("Motion permission denied");
      }
    });
  } else if (typeof DeviceMotionEvent !== "undefined") {
    window.addEventListener("devicemotion", detectShake);
    alert("Motion enabled! Now shake 📱");
  } else {
    alert("Motion sensor not supported");
  }
}

function detectShake(event) {
  let acc = event.accelerationIncludingGravity;
  if (!acc) return;

  let x = acc.x || 0;
  let y = acc.y || 0;
  let z = acc.z || 0;

  let change =
    Math.abs(x - lastX) +
    Math.abs(y - lastY) +
    Math.abs(z - lastZ);

  let now = Date.now();

  if (change > threshold && now - lastPlayTime > 1000) {
    let sound = document.getElementById("sound");
    sound.currentTime = 0;
    sound.play();
    lastPlayTime = now;
  }

  lastX = x;
  lastY = y;
  lastZ = z;
}
