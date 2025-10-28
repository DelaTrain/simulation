import { MapDraw } from "agentscript/src/MapDraw";
import { CountiesModel } from "agentscript/models/CountiesModel";
import { Animator } from "agentscript/src/Animator";
import * as util from "agentscript/src/utils.js";
import leafletInit from "agentscript/leafletInit.js";

const model = new CountiesModel(); // default: { bbox: nmcounties.json, patchesWidth: 100 }
// await model.startup()
model.setup();

const drawOptions = {
    // patchesColor: 'transparent', // default in MapDraw
    linksColor: "gray",
    linksWidth: 4,
    turtlesSize: 6,
    turtlesColor: (t: any) => view.drawOptions.turtlesMap.atIndex(t.county + 1),
};
const view = new MapDraw(model, {
    // div: util.createCanvas(0, 0), // default & the view will resize
    drawOptions,
});

// const params = await view.leafletInit({
const params = await leafletInit(model, view.canvas, {
    Z: 7,
    terrain: "osm",
    bboxBorder: { color: "black", weight: 1, fill: false },
    tilesBorder: "solid green 2px",
    json: model.world.geojson,

    // default style parameters https://leafletjs.com/reference.html#path-option
    jsonStyle: (_feature: any) => ({
        color: "red",
    }),
    jsonPopup: (layer: any) =>
        layer.feature.properties.NAME + ", pop: " + layer.feature.properties.population.toLocaleString(),
});

const anim = new Animator(
    () => {
        model.step();
        view.draw();
    },
    -1, // run forever
    20 // 30 // 30 fps
);
anim.start();
util.toWindow({ model, view, params, util });
