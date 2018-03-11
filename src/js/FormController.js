export class FormController {

    constructor(selector, commentsService, pubSub) {
        this.element = document.querySelector(selector);
        this.commentsService = commentsService;
        this.pubSub = pubSub;
        this.loading = false;
        this.addEventListener();
    };

    setLoading(loading) {
        this.loading = loading;
        this.element.querySelectorAll('input, button').forEach(item => {item.disabled = loading});
    }

    addEventListener() {
        this.addInputListener();
        this.addFormSubmitListener();
    }

    addFormSubmitListener() {
        this.element.addEventListener('submit', event => {
            event.preventDefault();

            if (this.loading) {
                return;
            }
            this.setLoading(true);
            let comment = this.buildCommentData();
            this.commentsService.save(comment).then(createdComment => {
                console.log("COMENTARIO CREADO", createdComment);
                this.element.reset();
                this.pubSub.publish('comment:created', createdComment);
            }).catch(error => {
                constructor.error("SE HA PRODUCIDO UN ERROR");
                alert(`Se ha producido un error ${error}`);
            }).finally(() => {
                this.setLoading(false);
            })
        });
    }

    buildCommentData() {

        return {
            name: this.element.querySelector('#name').value,
            surname: this.element.querySelector('#surname').value,
            email: this.element.querySelector('#email').value,
            message: this.element.querySelector('textarea').value
        }
    }

    addInputListener() {
        this.element.querySelectorAll('input').forEach(input => {

            input.addEventListener('blur', event => {

                if (input.checkValidity() == false) {
                    input.classList.add('is-invalid');
                    input.classList.remove('is-valid');
                }else{
                    input.classList.remove('is-invalid');
                    input.classList.add('is-valid');
                }

                this.checkFormValidity();
            });
        });

        let textArea = this.element.querySelector('textarea');

        textArea.addEventListener('blur', event => {

            let nWords = textArea.value.split(" ").length;

            if (textArea.value !== "" && nWords <= 120) {
                textArea.classList.add('is-valid');
                textArea.classList.remove('is-invalid');
            }else{
                textArea.classList.add('is-invalid');
                textArea.classList.add('is-invalid');
            }
            this.checkFormValidity();
        });
    }

    checkFormValidity() {
        const formElements = this.element.querySelectorAll('input');

        for(let formElement of formElements) {
            if (formElement.checkValidity() == false) {
                this.element.querySelector("button").disabled = true;
                return;
            }
        }

        let textArea = this.element.querySelector('textarea');
        let nWords = textArea.value.split(" ").length;

        if (textArea.value !== "" && nWords <= 120) {
            this.element.querySelector("button").disabled = false;
        }else{
            this.element.querySelector("button").disabled = true;
        }
        
    }
}
