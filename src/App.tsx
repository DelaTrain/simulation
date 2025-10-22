import { useState } from "react";
import { simulation } from "./core/simulation";
import { convertTime } from "./utils/print";

function App() {
    const [time, setTime] = useState(0);

    return (
        <>
            <h1>Symulacja</h1>
            <p>{convertTime(time)}</p>
            <button
                onClick={() => {
                    simulation.step();
                    setTime(simulation.currentTime);
                }}
            >
                step
            </button>
            <button
                onClick={() => {
                    simulation.restart();
                    setTime(simulation.currentTime);
                }}
            >
                restart
            </button>
        </>
    );
}

export default App;
