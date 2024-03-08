// Initializing functions/methods

const mapEl = document.querySelector("#map");
const formEl = document.querySelector(".form");
const cadenceLabel = document.querySelector(".cadence-label");
const inputType = document.querySelector(".form-input-type");
const inputCadence = document.querySelector(".form-cadence");
const inputDistance = document.querySelector(".form-distance");
const inputElevation = document.querySelector(".input-elevation");
const elevationEl = document.querySelector(".form-elevation");
const inputDuration = document.querySelector(".form-duration");
const workoutContainer = document.querySelector(".workout");

// Classes

const workouts = [];
class App {
  constructor() {}
}

const app = new App();

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
  }
}

class Cycling extends Workout {
  type = "cycling";
  constructor(coords, duration, distance, elevationGain) {
    super(coords, duration, distance);
    this.elevationGain = elevationGain;
  }
}

console.log(formEl);

inputType.addEventListener("change", () => {
  cadenceLabel.classList.toggle("hidden");
  elevationEl.classList.toggle("hidden");
});

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

let map, marker, mapEvent;

const loadWorkouts = function () {
  workoutContainer.innerHTML = "";
  const workoutsLocal = JSON.parse(localStorage.getItem("workouts"));
  for (const workout of workoutsLocal) {
    console.log(workout);
    let html = `
    <div class="workout-inner-container ${workout.type}-workout-color">
    <div class="workout-message">${
      workout.type === "running" ? "Corrida" : "Pedalada"
    } | ${workout.date}</div>
    <div class="workout-stats">
      <div class="distance-stat">
        <span>${workout.type === "running" ? "🏃" : "🚴"} ${
      workout.distance
    }<span>km</span> </span>
      </div>
      <div class="duration-stat">
        <span>⏰ ${workout.duration}<span>min</span> </span>
      </div>
  `;

    if (workout.type === "running") {
      html += `<div class="pace-stat">
    <span>⚡ run <span>min/km</span> </span>
    </div>
    <div class="cadence-stat">
    <span>🦶 ${workout.cadence}<span>spm</span> </span>
    </div>
    </div>
    </div>`;
    }
    if (workout.type === "cycling") {
      html += `<div class="pace-stat">
    <span>⚡ cycling <span>km/h</span> </span>
    </div>
    <div class="cadence-stat">
    <span>⛰️ ${workout.elevationGain}<span>m</span> </span>
    </div>
    </div>
    </div>`;
    }
    workoutContainer.insertAdjacentHTML("afterbegin", html);
  }
};

loadWorkouts();

const addMarker = function (lat, lng, type) {
  const marker = L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        className: `marker--${type}`,
        autoClose: false,
        closeOnClick: false,
      })
    )
    .setPopupContent(type === "running" ? "🏃 Corrida" : "🚴 Pedalada")
    .openPopup();
};

const loadMap = function () {
  getPosition().then((res) => {
    //Getting current user coords
    const { latitude: lat, longitude: lng } = res.coords;

    //Creating map
    map = L.map("map").setView([lat, lng], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    // Add marker to map
    map.on("click", (e) => {
      console.log(e);
      mapEvent = e;
      formEl.classList.remove("hidden");
      inputDuration.focus();
    });
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      const { lat: latitude, lng: longitude } = mapEvent.latlng;
      createWorkout(latitude, longitude);
      setLocalStorage();
      loadWorkouts();
      hideForm();
      console.log(JSON.parse(localStorage.getItem("workouts")));

      console.log(localStorage);
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
    const cycling = new Cycling(
      [clickLat, clickLng],
      inputDuration.value,
      inputDistance.value,
      inputElevation.value
    );
    workouts.push(cycling);
    console.log(inputElevation);
    console.log("Pedalada");
  }
  addMarker(clickLat, clickLng, inputType.value);
};

const showForm = function () {
  formEl.classList.remove("hidden");
};

const hideForm = function () {
  formEl.classList.add("hidden");
};

const setLocalStorage = function () {
  const existingWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
  existingWorkouts.push(...workouts);
  localStorage.setItem("workouts", JSON.stringify(existingWorkouts));
};

loadMap();
console.log(JSON.parse(localStorage.getItem("workouts")));
