class MapView {
    #parentEl = document.querySelector(".map")
    map;

    renderMap(position) {
        this.map = L.map("map").setView(position, 15);
        L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
    }

    addEventHandler(handler) {
        this.map.addEventListener("click", e => {
            const { lat: latitude, lng: longitude } = e.latlng;
            handler([latitude, longitude])
        })
    }

    renderMarkers(data) {
      console.log(data)
      if(data.length > 0) {
        data.forEach(workout => {
          L.marker(workout.coords)
      .addTo(this.map)
      .bindPopup(
        L.popup({
          className: `marker--${workout.type}`,
          autoClose: false,
          closeOnClick: false,
        })
      )
      .setPopupContent(workout.type === "running" ? "🏃 Corrida" : "🚴 Pedalada")
      .openPopup();
    })
  } return
    }
  }

export default new MapView;