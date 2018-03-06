import css from './scss/style.scss';
import { SongsListController } from './js/SongsListController';
import { AppController } from './js/AppController';
import { HeaderController } from './js/HeaderController';
import { FormController } from './js/FormController';
import { SongsService } from './js/SongsService';
import { PubSub } from 'pubsub-js';

import 'bootstrap';
import './scss/style.scss';

document.addEventListener("DOMContentLoaded", () => {

    let appController = new AppController("body", PubSub);
    let headerController = new HeaderController(".web-header", appController);

    let songsService = new SongsService('http://localhost:3001/songs/');

    let songsListController = new SongsListController(".songs-list", songsService, PubSub);
    songsListController.loadSongs();

    let formController = new FormController('.songs-form', songsService, PubSub);

});
