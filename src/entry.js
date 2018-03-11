import css from './scss/style.scss';
import { FormController } from './js/FormController';
import { CommentsService } from './js/CommentsService';
import { CommentsListController} from './js/CommentsListController';
import { PubSub } from 'pubsub-js';
import {Date} from './js/Date';

import 'bootstrap';

document.addEventListener("DOMContentLoaded", () => {

    // Solo realizará el querySelector si encuentra el formulario para comentarios (para evitar warnings)
    if (document.querySelector('.form-comment') != null) {

        let commentsService = new CommentsService('http://localhost:3001/comments/');

        let commentsListController = new CommentsListController(".comments-list", commentsService, PubSub);
        commentsListController.loadComments();

        let formController = new FormController('.form-comment', commentsService, PubSub);
    }
});