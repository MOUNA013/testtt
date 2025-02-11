let qs;
const lang = "<?= Cookie::get('locale') ?>"
        const initClassicEditor = (questionIndex) => {
            ClassicEditor.create(document.querySelector('.question' + questionIndex), {
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'bold',
                            'italic',
                            'link',
                            'bulletedList',
                            'numberedList',
                            '|',
                            'outdent',
                            'indent',
                            '|',
                            'imageUpload',
                            'blockQuote',
                            'insertTable',
                            'mediaEmbed',
                            'undo',
                            'redo'
                        ]
                    },
                    language: 'en',
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            'imageStyle:inline',
                            'imageStyle:block',
                            'imageStyle:side'
                        ]
                    },
                    table: {
                        contentToolbar: [
                            'tableColumn',
                            'tableRow',
                            'mergeTableCells'
                        ]
                    },
                    licenseKey: '',
                })
                .then(editor => {
                    window.editor = editor;
                })
                .catch(error => {
                    console.error('Oops, something went wrong!');
                    console.error(
                        'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:'
                    );
                    console.warn('Build id: fgydboej4r6a-nohdljl880ze');
                    console.error(error);
                });
        }

if(document.getElementById('qs')) {
    qs = document.getElementById('qs').value;
    for (let index = 1; index <= qs; index++) {
        initClassicEditor(index)
    }
}

        function publish() {
            var qs = document.getElementById('qs').value || '';
            // var body = document.getElementById('questions');
            let point = 0;
            let error;
            if (qs < 1) error = lang == 'fr' ? "Il doit y avoir au moins une question saisie" :
                'There should at least be one question entered'
            document.querySelectorAll('#questions .form-group').forEach(question => {
                question.querySelector('.question').value = question.querySelector('.ck-content').innerHTML
                if (!question.querySelector('.point').value.trim()) {
                    error = lang == 'fr' ? "remplissez toutes les questions et tous les points s'il vous plaît" :
                        "fill up all questions and points please"
                }
                point += +question.querySelector('.point').value
            });
            if (point !== +document.getElementById('points').value) error = lang == 'fr' ?
                'La somme des notes est différente au points totaux' :
                'The sum of the marks is different from the total points'
            // by defaults error value is undefined which means false when something not okay it's gonna take a value 
            if (error) return Swal.fire(error)
            document.getElementById('submitButton').click();
        }

        // const questionsCount = document.getElementById('qs')
        const points = document.getElementById('points')

        function removeQuestion(elem) {
            points.value -= elem.parentElement.parentElement.querySelector('.point').value
            // questionsCount.value--
            elem.parentElement.parentElement.remove()
            // document.querySelector('input[name="nbQuestions"]').value--
            document.querySelector('input[name="question"]').value--
        }

        function addQuestion(e) {
            e.preventDefault()
            const questions = document.getElementById('questions')
            let questionIndex = 1;
            if (+questions.childElementCount) questionIndex = +questions.lastElementChild.querySelector('label span')
                .textContent.split(' ').at(-1) + 1

            questions.insertAdjacentHTML('beforeend', `<div class="form-group"
                                        style="border-bottom: 2px solid #d1d1d6 !important; padding-bottom: 3%;">
                                        <label class="form-label text-dark d-flex justify-content-between my-4"><span>Question
                                                ${questionIndex}</span><i class="fa fa-close ms-auto"
                                                role="button" onclick="removeQuestion(this)"></i></label>
                                        <div class="question${questionIndex}"></div>
                                        <input type="hidden" name="question${questionIndex}" class="question"
                                            id="question${questionIndex}">
                                        <br>
                                        <textarea name="reponse${questionIndex}" onchange="this.setAttribute('value', this.value)" value="tesrt" class="form-control" id="reponse${questionIndex}"
                                            placeholder="Reponse"></textarea>
                                        <br><input type="number" class="form-control point"
                                            name="point${questionIndex}" placeholder="Points"
                                            min="0">
                                    </div>`)
            initClassicEditor(questionIndex) +
                document.querySelector('input[name="question"]').value++
        }

        function responseInput(elem) {
            elem.setAttribute('value', elem.value)
        }