class FormView {
    #parentEl = document.querySelector(".form");
    inputDuration = document.querySelector(".form-duration");
    inputType = document.querySelector(".form-input-type")
    cadenceLabel = document.querySelector(".cadence-label");
    elevationEl = document.querySelector(".form-elevation");

    renderForm() {
      this.#parentEl.classList.remove("hidden");
      this.inputDuration.focus();
    }

    addEventHandler(handler) {
        this.#parentEl.addEventListener("submit", (e) => {
            e.preventDefault()
            console.log(this.#parentEl)
            const dataArr = [...new FormData(this.#parentEl)]
            const data = Object.fromEntries(dataArr)
            handler(data)
        })
    }
    
    addChangeEventHandler() {
        console.log(this.cadenceLabel)
        this.inputType.addEventListener("change", (e) => {
            this.cadenceLabel.classList.toggle("hidden");
            this.elevationEl.classList.toggle("hidden");
        })
    }

    hideForm() {
        this.#parentEl.classList.add("hidden");
    }
}

export default new FormView;