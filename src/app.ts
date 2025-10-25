import { simulation } from "./core/simulation";
import { convertTime } from "./utils/print";

const timeEle = document.getElementById("time")!;
const stepButton = document.getElementById("step-button")!;
const restartButton = document.getElementById("restart-button")!;

function updateTime() {
    timeEle.textContent = `Czas symulacji: ${convertTime(simulation.currentTime)}`;
}

stepButton.addEventListener("click", () => {
    simulation.step();
    updateTime();
});

restartButton.addEventListener("click", () => {
    simulation.restart();
    updateTime();
});

updateTime();
