class WorkoutsView {
    #parentEl = document.querySelector(".workouts-container");
    workouts;

    renderWorkouts(workouts) {
        this.workouts = workouts
        const markup = this.generateMarkup()
        this.#parentEl.insertAdjacentHTML("beforeend", markup)
    }

    generateMarkup() {
        let markup = "";
        this.workouts.forEach(workout=>{
            markup += `
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
              markup += `<div class="pace-stat">
            <span>⚡ ${Math.round(workout.pace * 10) / 10} <span>min/km</span> </span>
            </div>
            <div class="cadence-stat">
            <span>🦶 ${workout.cadence}<span>spm</span> </span>
            </div>
            </div>
            </div>`;
            }
            if (workout.type === "cycling") {
              markup += `<div class="pace-stat">
            <span>⚡ ${Math.round(workout.speed * 10) / 10} <span>km/h</span> </span>
            </div>
            <div class="cadence-stat">
            <span>⛰️ ${workout.elevationGain }<span>m</span> </span>
            </div>
            </div>
            </div>`;
            }
        })
        return markup;
    }
}

export default new WorkoutsView;