export class SongsListController {

    constructor(selector, songsService, pubSub) {
        this.element = document.querySelector(selector);
        this.songsService = songsService;
        pubSub.subscribe('song:created', (event, song) => {
            console.log("SongsListController", song);
            this.loadSongs();
        });
    }

    showLoadingMessage() {
        this.element.innerHTML = '<div class="loading">Cargando...</div>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error">Se ha producido un error</div>';
    }

    showNoSongsMessage() {
        this.element.innerHTML = '<div class="info">No hay ninguna canción</div>';
    }

    renderSongs(songs) {
        let html = '';
        for (let song of songs) {
            html += `<article class="song">
                <div class="cover">
                    <img src="${song.cover}" alt="${song.artist} - ${song.title}">
                </div>
                <div class="info">
                    <div class="title">${song.title}</div>
                    <div class="artist">${song.artist}</div>
                </div>
            </article>`;
        }
        this.element.innerHTML = html;
    }

    loadSongs() {
        this.showLoadingMessage();
        this.songsService.list().then(songs => {
            if (songs.length == 0) {
                this.showNoSongsMessage();
            } else {
                this.renderSongs(songs);
            }
        }).catch((error) => {
            console.error("ERROR RETRIEVING SONGS", error);
            this.showErrorMessage();
        });

    }

}
