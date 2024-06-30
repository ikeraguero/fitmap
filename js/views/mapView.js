class MapView {
    #parentEl = document.querySelector(".map")
    map;

    renderMap(position) {
        this.map = L.map("map").setView(position, 13);
        L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
    }

    addEventHandler(handler) {
        this.map.addEventListener("click", handler)
    }

    addMarkers() {
        
    }
}

export default new MapView;