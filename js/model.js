import { WEATHER_API_KEY, REVERSE_GEOCODING_API_KEY } from "./config.js";

export let state = {
  position: "",
  workouts: [],
};

class Workout {
  date = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
  id = (Date.now() + "").slice(-10);
  constructor(coords, duration, distance, condition) {
    this.coords = coords;
    this.duration = duration;
    this.distance = distance;
    this.condition = condition;
  }
}

class Running extends Workout {
  type = "running";
  constructor(coords, duration, distance, condition, cadence) {
    super(coords, duration, distance, condition);
    this.cadence = cadence;
    this.calcPace();
  }
  calcPace() {
    this.pace = this.duration / this.distance;
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, duration, distance, condition, elevationGain) {
    super(coords, duration, distance, condition);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    this.speed = this.distance / this.duration;
  }
}

export const getPosition = async function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).then((res) => {
    const { latitude: lat, longitude: lng } = res.coords;
    return [lat, lng];
  });
};

export const setPostion = function (position) {
  state.position = position;
};

export const persistWorkouts = function () {
  localStorage.setItem("workouts", JSON.stringify(state.workouts));
};

export const addWorkout = async function (newWorkout) {
  const condition = await getWeather();

  let workout;
  if (newWorkout.type === "running") {
    workout = new Running(
      state.position,
      newWorkout.duration,
      newWorkout.distance,
      condition,
      newWorkout.cadence
    );
  }
  if (newWorkout.type === "cycling") {
    workout = new Cycling(
      state.position,
      newWorkout.duration,
      newWorkout.distance,
      condition,
      newWorkout.elevation
    );
  }
  state.workouts.unshift(workout);
  console.log(state.workouts);
  persistWorkouts();
};

getWeather = async function () {
  const { latitude: lat, longitude: lng } = state.position;

  const geocodeData = await fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=-${lng}&localityLanguage=en`
  ).then((res) => res.json());
  if (!geocodeData) {
    throw new Error("Problem getting location data");
  }
  const weatherResponse = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${geocodeData.locality}&aqi=no`
  ).then((res) => res.json());

  const condition = weatherResponse.current.condition.icon.slice(2);
  console.log(condition);
  return condition;
};

const init = function () {
  const storage = localStorage.getItem("workouts");
  if (storage) state.workouts = JSON.parse(storage);
};

init();
