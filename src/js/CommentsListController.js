export class CommentsListController {

    constructor(selector, commentsService, pubSub) {
        this.element = document.querySelector(selector);
        this.commentsService = commentsService;
        pubSub.subscribe('comment:created', (event, comment) => {
            console.log("CommentsListController", comment)
            this.loadComments();
            alert("Comentario enviado con éxito");
        })
    }

    showErrorMessage() {
        this.element.innerHTML = `<div class="alert alert-danger">
            Se ha producido un error.
        </div>`;
    }

    showNoCommentsMessage() {
        this.element.innerHTML = `<div class="jumbotron">
        <h3>No hay ningún comentario.</h3>
        </div>`;
    }

    renderComments(comments) {
        let html = '';
        for(let comment of comments) {
            html += `<div class="jumbotron">
            <p><b><i class="fas fa-user"></i> ${comment.name} ${comment.surname}</b> - ${comment.email}</p>
            <p>${comment.message}</p>
            </div>`;
        }
        this.element.innerHTML = html;
    }

    loadComments() {


        this.commentsService.list().then(data => {
            if (data.length == 0) {
                this.showNoCommentsMessage();
            }else{
                this.renderComments(data);
            }

        }, (error) => {
            console.error("ERROR RETRIEVING COMMENTS", error);
            this.showErrorMessage();
        })
    }
}