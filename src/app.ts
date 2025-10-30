import { simulation } from "./core/simulation";
import { convertTime } from "./utils/print";

const timeEle = document.getElementById("time")!;
const stepButton = document.getElementById("step-button")!;
const restartButton = document.getElementById("restart-button")!;
const autorunButton = document.getElementById("autorun-button")!;

export function updateTime() {
    timeEle.textContent = `Czas symulacji: ${convertTime(simulation.currentTime)}`;
}

stepButton.addEventListener("click", () => {
    simulation.step();
});

restartButton.addEventListener("click", () => {
    simulation.restart();
});

autorunButton.addEventListener("click", () => {
    if (simulation.autorun) {
        simulation.autorun = false;
        autorunButton.textContent = "Play";
    } else {
        simulation.autorun = true;
        autorunButton.textContent = "Pause";
        simulation.runAutomatically();
    }
});

updateTime();
