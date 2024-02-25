// Initializing functions/methods

const getPosition = function () {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const loadMap = function () {
  getPosition().then((res) => {
    console.log(res);
    const { latitude: lat, longitude: lgn } = res.coords;
    console.log(lat, lgn);
    const map = L.map("map").setView([lat, lgn], 13);
    const marker = L.marker([lat, lgn]).addTo(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
  });
};

loadMap();
