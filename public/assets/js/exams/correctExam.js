function incrementNote(el) {
    const answerId = el.parentElement.getAttribute('data-answer-id')
    let point = +el.previousElementSibling.value
    const max = el.previousElementSibling.getAttribute('data-max-point')
    const pointElem = el.previousElementSibling
    if (pointElem.value < max) {
        point += 0.5
        pointElem.value = point
        updateAnswer(answerId, point)
    }
}

function decrementNote(el) {
    const answerId = el.parentElement.getAttribute('data-answer-id')
    let point = el.nextElementSibling.value
    const pointElem = el.nextElementSibling
    if (pointElem.value > 0) {
        point -= 0.5
        pointElem.value = point
        updateAnswer(answerId, point)
    }
}

function changeNoteInput(el) {
    const answerId = el.parentElement.getAttribute('data-answer-id')
    const max = el.getAttribute('data-max-point')
    let point = max
    if (+el.value > max) return el.value = max
    else if (+el.value < 0) return el.value = 0
    else point = +el.value
    if (point >= 0 && point <= max) updateAnswer(answerId, point)
}

function updateAnswer(answerId, point) {
    setTimeout(async () => {
        try {
            const response = await fetch('/answers/' + answerId, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
                },
                body: JSON.stringify({
                    point,
                })
            })
        } catch (err) {
            Swal.fire('Failed! Please Try later')
        }
    }, 2000)
}


async function validateExamen(elem) {
    elem.parentElement.parentElement.parentElement.querySelector('.accordion-button').classList.contains(
            'bg-light') ? '' : elem.parentElement.parentElement.parentElement.querySelector('.accordion-button')
        .classList.add('bg-light')
    let userAnswersNotes = []
    let userId;
    let comment;
    const points = elem.parentElement.parentElement.parentElement.querySelectorAll('.point')
    points.forEach(point => {
        userId = point.parentElement.parentElement.parentElement.parentElement.parentElement
            .parentElement.getAttribute('data-user-id')
  
            
        comment = point.parentElement.parentElement.parentElement.parentElement.parentElement
            .querySelector('.comment').value
        const note = point.value
        const answerId = point.parentElement.getAttribute('data-answer-id')
        userAnswersNotes.push({
            note,
            answerId
        })
    });

    
    const response = await fetch('/answers/valid', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
        },
        body: JSON.stringify({
            data: userAnswersNotes,
            userId,
            examenId,
            comment
        })
    })
    const result = await response.json()
    if (result.status) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'examen corrigé avec succès',
            showConfirmButton: false,
            timer: 1500,
        })
    }
}

async function validateDocumentExamen(elem) {
    const comment = elem.parentElement.previousElementSibling.querySelector('.answer-comment')
    const note = elem.parentElement.previousElementSibling.querySelector('.answer-note')
    const user_id = elem.parentElement.parentElement.parentElement.getAttribute('data-user-id')
    const response = await fetch(`/exams/${examenId}/correction?type=document`, {
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="_token"]').content
        },
        method: 'PATCH',
        body: JSON.stringify({
            comment: comment.value,
            note: note.value,
            user_id
        })
    })
    const result = await response.json()
    if (response.status === 200) {
        if (result.status) {
            if (result.status) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'examen corrigé avec succès',
                    showConfirmButton: false,
                    timer: 1500,
                })
            }
        }
    }
}

function showResponse(el) {
    el.parentElement.nextElementSibling.nextElementSibling.classList.toggle('hide-response')
}


function deleteExam(btn) {
    Swal.fire({
        title: 'Es-tu sûr?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimez-le !'
    }).then((result) => {
        if (result.isConfirmed) {
            btn.parentElement.submit()
            Swal.fire(
                'Supprimé!',
                'l\'examen a été supprimé.',
                'success'
            )
        }
    })
}