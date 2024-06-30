class FormView {
    #parentEl = document.querySelector(".form");
    inputDuration = document.querySelector(".form-duration");

    renderForm() {
      this.#parentEl.classList.remove("hidden");
      this.inputDuration.focus();
    }
}

export default new FormView;