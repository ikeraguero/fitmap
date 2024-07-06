class FormView {
  #parentEl = document.querySelector(".form");
  inputDuration = document.querySelector(".form-duration");
  inputType = document.querySelector(".form-input-type");
  inputDistance = document.querySelector(".form-distance");
  cadenceLabel = document.querySelector(".cadence-label");
  cadenceForm = document.querySelector(".form-cadence");
  elevationForm = document.querySelector(".form-elevation");
  inputElevation = document.querySelector(".input-elevation");

  renderForm() {
    this.#parentEl.classList.remove("hidden");
    this.inputDuration.focus();
  }

  addEventHandler(handler) {
    this.#parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!Number.isInteger(+this.inputDuration.value)) {
        console.log("Error");
        return;
      }
      if (isNaN(+this.inputDistance.value)) {
        console.log("Error");
        return;
      }
      if (isNaN(+this.cadenceForm.value) && isNaN(+this.elevationForm.value)) {
        console.log(this.cadenceLabel);
        console.log("Error");
        return;
      }
      const dataArr = [...new FormData(this.#parentEl)];
      const data = Object.fromEntries(dataArr);
      handler(data);
      this.clearForm();
    });
  }

  clearForm() {
    this.inputDuration.value = "";
    this.inputDuration.value = "";
    this.inputDistance.value = "";
    this.cadenceForm.value = "";
    this.inputElevation.value = "";
  }

  addChangeEventHandler() {
    this.inputType.addEventListener("change", (e) => {
      this.cadenceLabel.classList.toggle("hidden");
      this.elevationForm.classList.toggle("hidden");
    });
  }

  hideForm() {
    this.#parentEl.classList.add("hidden");
  }
}

export default new FormView();
