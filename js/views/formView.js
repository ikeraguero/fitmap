class FormView {
    #parentEl = document.querySelector(".form");
    inputDuration = document.querySelector(".form-duration");

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

    hideForm() {
        this.#parentEl.classList.add("hidden");
    }
}

export default new FormView;