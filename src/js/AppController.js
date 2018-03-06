

export class AppController {

    constructor(selector, pubSub) {
        this.element = document.querySelector(selector);
        pubSub.subscribe('song:created', (event, song) => {
            console.log("AppController", song);
            this.toggleForm();
        });
    }

    toggleForm() {
        this.element.classList.toggle("show-form");
    }

}
