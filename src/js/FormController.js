

export class FormController {

    constructor(selector, songsService, pubSub) {
        this.element = document.querySelector(selector);
        this.songsService = songsService;
        this.pubSub = pubSub;
        this.loading = false;
        this.addEventListeners();
    }

    setLoading(loading) {
        this.loading = loading;
        this.element.querySelectorAll('input, button').forEach(item => { item.disabled = loading });
    }

    addEventListeners() {
        this.addInputListeners();
        this.addFormSubmitListener();
    }

    addFormSubmitListener() {
        this.element.addEventListener('submit', event => {
            event.preventDefault();
            if (this.loading) {
                return;  // si se está cargando, no hacemos nada más
            }
            this.setLoading(true);
            let song = this.buildSongData();
            this.songsService.save(song).then(createdSong => {
                console.log("CANCION CREADA", createdSong);
                this.element.reset();
                this.pubSub.publish('song:created', createdSong);
            }).catch(error => {
                console.error("SE HA PRODUCIDO UN ERROR");
                alert(`Se ha producido un error ${error}`);
            }).finally(() => {
                this.setLoading(false);
            })
        });
    }

    buildSongData() {
        return {
            artist: this.element.querySelector('#artist').value,
            title: this.element.querySelector('#title').value,
            cover: this.element.querySelector('#cover').value
        }
    }

    addInputListeners() {
        // en todos los input que hay en el formulario, los valido cuando se pierde el foco
        this.element.querySelectorAll('input').forEach(input => {

            input.addEventListener('blur', event => {
                // event.target sería lo mismo que input en este caso
                if (input.checkValidity() == false) {
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
                this.checkFormValidity();
            });

        });
    }

    checkFormValidity() {
        let button = this.element.querySelector('button');
        if (this.element.checkValidity()) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }

}
