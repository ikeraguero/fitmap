// Initializing functions/methods

const mapEl = document.querySelector("#map");
const formEl = document.querySelector(".form");
const inputType = document.querySelector(".form-input-type");
const inputCadence = document.querySelector(".form-cadence");
const inputDistance = document.querySelector(".form-distance");
const inputElevation = document.querySelector(".form-elevation");
const inputDuration = document.querySelector(".form-duration");

// Classes

const workouts = [];
class App {
  constructor() {}
}

const app = new App();

class Workout {
  date = new Date();
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
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, duration, distance, elevationGain) {
    super(coords, duration, distance, cadence);
    this.elevationGain = elevationGain;
  }
}

console.log(formEl);

inputType.addEventListener("change", () => {
  inputCadence.classList.toggle("hidden");
  inputElevation.classList.toggle("hidden");
});

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

let map, marker, mapEvent;

const addMarker = function (lat, lng) {
  const marker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        className: "marker--running",
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent("Test")
    .openPopup();
};

const loadMap = function () {
  getPosition().then((res) => {
    //Getting current user coords
    const { latitude: lat, longitude: lng } = res.coords;

    //Creating map
    map = L.map("map").setView([lat, lng], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add marker to map
    map.on("click", (e) => {
      console.log(e);
      mapEvent = e;
      formEl.classList.remove("hidden");
    });
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const { lat: latitude, lng: longitude } = mapEvent.latlng;
      createWorkout(latitude, longitude);
      hideForm();
    });
  });
};

console.log(mapEvent);

// Creating workouts objects
const createWorkout = function (clickLat, clickLng) {
  if (inputType.value === "running") {
    const running = new Running(
      [clickLat, clickLng],
      inputDuration.value,
      inputDistance.value,
      inputCadence.value
    );
    workouts.push(running);
    console.log(workouts);
  }
  if (inputType.value === "cycling") {
    console.log("Pedalada");
  }
  addMarker(clickLat, clickLng);
};

const showForm = function () {
  formEl.classList.remove("hidden");
};

const hideForm = function () {
  formEl.classList.add("hidden");
};

loadMap();

console.log(map);
