import * as model from "./model.js"
import mapView from "./views/mapView";
import formView from "./views/formView.js";

const controlMap = async function() {
    // Getting the position
    const position = await model.getPosition();
    mapView.renderMap(position);
    console.log("Done")
}

const controlForm = function(position) {
    model.setPostion(position)
    formView.renderForm()
}

const controlWorkouts = function(newWorkout) {
    model.addWorkout(newWorkout)
}

const init = async function() {
    await controlMap()
    mapView.addEventHandler(controlForm)
    formView.addEventHandler(controlWorkouts)
}

init()