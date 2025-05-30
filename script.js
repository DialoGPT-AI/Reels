const upload = document.getElementById("upload");
const feed = document.getElementById("feed");
const recordBtn = document.getElementById("recordBtn");
const stopBtn = document.getElementById("stopRecord");
const cameraContainer = document.getElementById("cameraContainer");
const camera = document.getElementById("camera");

upload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("video/")) {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.controls = true;
    video.loop = true;
    video.muted = true;
    feed.prepend(video);
    video.play();
  }
});

recordBtn.addEventListener("click", async () => {
  cameraContainer.classList.remove("hidden");
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  camera.srcObject = stream;
});

stopBtn.addEventListener("click", () => {
  const stream = camera.srcObject;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    camera.srcObject = null;
  }
  cameraContainer.classList.add("hidden");
});
