import * as model from "./model.js"
import mapView from "./views/mapView";
import formView from "./views/formView.js";

const controlMap = async function() {
    // Getting the position
    const position = await model.getPosition();
    mapView.renderMap(position);
    console.log("Done")
}

const controlMarkers = function() {
    formView.renderForm()
}

const init = async function() {
    await controlMap()
    mapView.addEventHandler(controlMarkers)
}

init()