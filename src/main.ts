import "./app.ts";
import "./index.css";
import "./map.ts";
import { simulation } from "./core/simulation.ts";
import DATA from "../data/delatrain.json";
import { ImportedData } from "./utils/importer.ts";

simulation.step();
export const importedData = new ImportedData(DATA);
