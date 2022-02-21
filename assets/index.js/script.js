
// media queries example
const outputElement = document.getElementById("info");

const smallDevice = window.matchMedia("(min-width: 576px)");

smallDevice.addListener(handleDeviceChange);

function handleDeviceChange(e) {
  if (e.matches) outputElement.textContent = "Bigger Than Mobile";
  else outputElement.textContent = "Mobile";
}

// Run it initially
handleDeviceChange(smallDevice);