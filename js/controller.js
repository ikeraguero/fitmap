import * as model from "./model.js"
import mapView from "./views/mapView";
import formView from "./views/formView.js";
import workoutsView from "./views/workoutsView.js";

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
    mapView.renderMarkers(model.state.workouts)
    formView.hideForm()
    workoutsView.renderWorkouts(model.state.workouts)
}

const init = async function() {
    await controlMap()
    formView.addEventHandler(controlWorkouts)
    formView.addChangeEventHandler()
    mapView.addEventHandler(controlForm)
    mapView.renderMarkers(model.state.workouts);
    if(model.state.workouts.length>0) {
        workoutsView.renderWorkouts(model.state.workouts)
    }
    
}

init()