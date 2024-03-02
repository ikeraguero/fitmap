// Initializing functions/methods

const mapEl = document.querySelector("#map");
const formEl = document.querySelector(".form");
const inputType = document.querySelector(".form-input-type");
const inputCadence = document.querySelector(".form-cadence");
const inputElevation = document.querySelector(".form-elevation");

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

let map, marker;

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
      const { lat: clickLat, lng: clickLng } = e.latlng;
      formEl.classList.remove("hidden");
      formEl.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("submit");
        addMarker(clickLat, clickLng);
      });
    });
  });
};

loadMap();

console.log(map);

// Classes

class App {
  workouts = [];
  constructor() {}
}

class Workout {
  constructor(type, duration, distance) {
    this.type = type;
    this.duration = duration;
    this.distance = distance;
  }
}

class Running extends Workout {
  constructor() {}
}

class Cycling extends Workout {
  constructor() {}
}
