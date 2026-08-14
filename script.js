let clockDiv = document.getElementById("clock");


function updateClock() {
    clockDiv.textContent = new Date().toLocaleTimeString();
}