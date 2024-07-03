export let state = {
    position: '',
    workouts: []
}

class Workout {
    date = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date());
    id = (Date.now() + "").slice(-10);
    constructor(coords, duration, distance) {
      this.coords = coords;
      this.duration = duration;
      this.distance = distance;
    }
  }

class Running extends Workout {
    type = "running";
    constructor(coords, duration, distance, cadence) {
      super(coords, duration, distance);
      this.cadence = cadence;
      this.calcPace()
    }
    calcPace() {
      this.pace = this.duration / this.distance;
    }
  }
  
  class Cycling extends Workout {
    type = "cycling";
    constructor(coords, duration, distance, elevationGain) {
      super(coords, duration, distance);
      this.elevationGain = elevationGain;
      this.calcSpeed()
    }
    calcSpeed() {
      this.speed = this.distance/this.duration
    }
  }


export const getPosition = async function () {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    }).then((res) => {
        const { latitude: lat, longitude: lng } = res.coords;
        return [lat, lng]
  })
};

export const setPostion = function(position) {
    state.position = position;
    console.log(state)
}


export const persistWorkouts = function() {
  localStorage.setItem("workouts", JSON.stringify(state.workouts))
}

export const addWorkout = function(newWorkout) {
    console.log(newWorkout)
    let workout;
    if(newWorkout.type === 'running') {
        workout = new Running(
            state.position,
            newWorkout.duration,
            newWorkout.distance,
            newWorkout.distance
          );
    }
    if(newWorkout.type === 'cycling') {
        workout = new Cycling(
            state.position,
            newWorkout.duration,
            newWorkout.distance,
            newWorkout.elevation
          );
    }
    console.log(workout)
    state.workouts.push(workout)
    persistWorkouts();
    return workout
}

const init = function() {
  const storage = localStorage.getItem("workouts");
  if(storage) state.workouts = JSON.parse(storage)
}

init()