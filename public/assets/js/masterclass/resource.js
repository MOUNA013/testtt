document.addEventListener('DOMContentLoaded', function () {
    let editorInstance;

    ClassicEditor
        .create(document.querySelector('#question'), {
            ckfinder: {
                uploadUrl: `{{ route('ckeditor.upload', ['_token' => csrf_token() ]) }}`,
            }
        })
        .then(editor => {
            editorInstance = editor;

            editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                return {
                    upload: async function () {
                        try {
                            const file = await loader.file;
                            const formData = new FormData();
                            formData.append('upload', file);
                            formData.append('_token', '{{ csrf_token() }}');

                            const response = await fetch("{{ route('ckeditor.upload') }}", {
                                method: 'POST',
                                body: formData,
                                headers: {
                                    "X-CSRF-TOKEN": '{{ csrf_token() }}',
                                }
                            });

                            if (!response.ok) {
                                throw new Error('Failed to upload image');
                            }

                            const data = await response.json();

                            return {
                                default: data.url
                            };
                        } catch (error) {
                            console.error(error);
                            return {
                                error: error.message
                            };
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error(error);
        });

    document.getElementById('resourceQuestionForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        document.getElementById('resourceQuestionForm').style.display = 'none'
        const activityId = document.getElementById('activityId').value;

        const formData = new FormData(this);

        const questionContent = editorInstance.getData();

        const payload = {
            id: formData.get('id'),
            resource_title: formData.get('resource_title'),
            question: questionContent,
        };

        const apiUrl = `/forum/resourcespost/${activityId}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            document.getElementById('errorMessage').style.display = 'none';

            if (response.ok) {
                const successMessage = document.getElementById('successMessage');
                successMessage.style.display = 'block';

                this.reset();

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 2000);

                document.getElementById('submitBtn').disabled = false;
                document.getElementById('cancel').disabled = false;

            } else {
                document.getElementById('resourceQuestionForm').style.display = 'block';
                document.getElementById('errorMessage').innerText = result.error || 'An error occurred.';
                document.getElementById('errorMessage').style.display = 'block';
            }
        } catch (error) {
            document.getElementById('resourceQuestionForm').style.display = 'block';
            document.getElementById('errorMessage').innerText = 'An unexpected error occurred.';
            document.getElementById('errorMessage').style.display = 'block';
        }
    });

});

const repondreBtn = document.getElementById('repondreBtn');
if (repondreBtn) {
    repondreBtn.addEventListener('click', function () {
        const activityId = this.getAttribute('data-resource-id');
        const resourceTitle = this.getAttribute('data-resource-title');
        const resourceTags = JSON.parse(this.getAttribute('data-resource-tags'));

        window.location.href = `/forum/NewPost/?activityId=${activityId}&resource_title=${encodeURIComponent(resourceTitle)}&resource_tags=${encodeURIComponent(JSON.stringify(resourceTags))}`;
    });
}

const cancelBtn = document.getElementById('cancel');
const form = document.getElementById('resourceQuestionForm');

cancelBtn.addEventListener('click', () => {
    form.style.display = 'none';
})

function showAndFocusForm(element) {
    const modal = bootstrap.Modal.getInstance(element.closest('.modal'));
    if (modal) modal.hide();

    const form = document.getElementById('resourceQuestionForm');
    form.style.display = 'block';
    document.getElementById('question').focus();
}

$(document).ready(function () {

    $("input[type='radio']").click(function () {
        var sim = $("input[type='radio']:checked").val();
        if (sim < 3) {
            $('.myratings').css('color', 'red');
            $(".myratings").text(sim);
        } else {
            $('.myratings').css('color', 'green');
            $(".myratings").text(sim);
        }
    });
});

document.getElementById('feedbackForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const rating = document.querySelector('input[name="rating"]:checked').value;
    const message = document.getElementById('feedbackMessage').value;
    const classId = document.getElementById('classId').value;

    fetch("/ressources-pour-étudiant/submit-feedback", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
        },
        body: JSON.stringify({
            rating: rating,
            message: message,
            classId: classId
        })
    })
        .then(response => response.json())
        .then(data => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('feedbackModal'));
            modal.hide();

            // Disable 'terminer' button
            document.getElementById('terminer').disabled = true;

            // If there is a 'doneModal', show it after 1.5 seconds
            const doneModal = document.getElementById('doneModal');
            if (doneModal) {
                const modal2 = bootstrap.Modal.getOrCreateInstance(doneModal);
                setTimeout(function () {
                    modal2.show();
                }, 1500);
            }
        })

        .catch(error => {
            console.error('Error:', error);
        });
});