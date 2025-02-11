let examenId;
        document.querySelectorAll('.students-answers').forEach(btn => {
            btn.addEventListener('click', function() {
                examenId = this.getAttribute('data-examen-id')
                const examType = btn.getAttribute('data-exam-type') === 'document' ? 'document' : ''
            fetch(`/examens/${examenId}/answers${examType === 'document' ? '?type=document' : '' }`)
                    .then(res => res.json())
                    .then(result => {
                        const {
                            data
                        } = result
                        const modalBody = document.querySelector(
                            '#studentsAnswers .modal-body #studentsAnswersaAccordion')
                        if (data === null || data.length === 0) {
                            modalBody.innerHTML =
                                '<h6 class="text-muted text-secondary">Aucune réponse n\'a encore été apportée</h6>'
                            return null
                        }
                        modalBody.innerHTML = ''
                        let i = 1;
                        if (examType === 'document') {
                            // modalBody.parentElement.previousElementSibling.querySelector(
                            //     'h1')
                            // .innerHTML = data[0]?.examen?.titre_fr ?? 'réponses'
                            // console.log('data : ', data)
                            data.forEach(answer => {
                                const remis = new Date(answer.created_at);
                                const fin = new Date(answer.examen.fin)
                                modalBody.innerHTML += `<div class="accordion-item" data-user-id="${answer.user.id}">
                                                <h2 class="accordion-header">
                                                <button class="accordion-button ${answer?.points && "bg-light text-dark"}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="true" aria-controls="collapse-${i}">
                                                    ${answer.user.name}
                                                </button>
                                                </h2>
                                                <div id="collapse-${i}" class="accordion-collapse collapse" data-bs-parent="#studentsAnswersaAccordion">
                                                    <div class="accordion-body pb-0">
                                                        <div class="d-flex align-items-center">
                                                            <div class="w-75">
                                                                <input type="number" class="form-control form-control-sm mb-3 answer-note" min="0" value="${answer.points ?? answer.examen.points}" max="${answer.examen.points}"/>
                                                                <textarea type="text" class="form-control me-2 comment answer-comment">${answer.comment ?? ""}</textarea>
                                                                ${                                                    
                                                                    remis < fin ? 
                                                                    "<span class='text-white badge bg-success mt-2'>à l'heure</span>" : 
                                                                    "<span class='text-white badge bg-primary mt-2'>en retard</span>" 
                                                                }
                                                                ${answer.points ?  `<span class='text-white badge bg-info mt-2'>${answer.points}</span>` : ''}
                                                                </div>
                                                                <a href="${window.location.origin}/storage/${answer.answer_path}" class="w-25 text-center" download><i class="fa fa-download fa-2x"></i></a>
                                                                </div>
                                                                </div>
                                                                <div class="accordion-footer mx-4 mb-3 d-flex flex-column">
                                                                    <button class="btn btn-secondary w-25 mt-3" onclick="validateDocumentExamen(this)">validé</button>
                                                    </div>                                
                                                </div>
                                            </div>`
                                i++
                            })
                        } else {
                            data.forEach(user => {
                                const {
                                    name,
                                    id: userId
                                } = user
                                // console.log(user)
                                const remis = new Date(user?.examens[0]?.created_at);
                                const fin = new Date(user?.examens[0]?.examen?.fin)
                                const {
                                    deleted_at,
                                    titre_fr
                                } = user?.examens[0]?.examen
                                // modalBody.parentElement.previousElementSibling.querySelector(
                                //         'h1')
                                //     .innerHTML = titre_fr

                                modalBody.innerHTML += `<div class="accordion-item" data-user-id="${userId}">
                                                <h2 class="accordion-header">
                                                <button class="accordion-button ${user?.examens[0]?.points && "bg-light text-dark"}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${i}" aria-expanded="true" aria-controls="collapse-${i}">
                                                    ${name}
                                                </button>
                                                </h2>
                                                <div id="collapse-${i}" class="accordion-collapse collapse" data-bs-parent="#studentsAnswersaAccordion">
                                                    <div class="accordion-body">
                                                    </div>
                                                    ${
                                                        deleted_at === null ? `<div class="accordion-footer mx-4 mb-3 mt-3 d-flex flex-column align-items-start">
                                                                <textarea type="text" class="form-control me-2 comment">${user?.examens[0]?.comment ?? ""}</textarea>
                                                                <div>
                                                                    ${                                                    
                                                                        remis < fin ? 
                                                                        "<span class='text-white badge bg-success mt-2'>à l'heure</span>" : 
                                                                        "<span class='text-white badge bg-primary mt-2'>en retard</span>" 
                                                                    }
                                                                    ${user?.examens[0]?.points ?  `<span class='text-white badge bg-info mt-2'>${user?.examens[0]?.points}/${user?.examens[0]?.examen.points}</span>` : ''}
                                                                </div>
                                                                <button class="btn btn-secondary w-25 mt-3" onclick="validateExamen(this)">validé</button>
                                                            </div> ` : ''                                  
                                                }
                                                </div>
                                            </div>`
                                user.answers.forEach((answer, index) => {
                                    const {
                                        reponse: userAnswer,
                                        id: answerId,
                                        point: note
                                    } = answer

                                    const {
                                        question,
                                        reponse: questionAnswer,
                                        points,
                                        id_examen
                                    } = answer.question
                                    document.querySelector(
                                            `#collapse-${i} .accordion-body`)
                                        .innerHTML += `<div class="row ${index != user.answers.length - 1 ? "border-bottom pb-4 mb-4" : ''}">
                                                            <div class="col-lg-8">
                                                                <h6>
                                                                    Question 
                                                                    <button class="ms-2 btn btn-sm" title="afficher la réponse" onclick="showResponse(this)"><i class="fa fa-angle-down"></i></button>
                                                                </h6>
                                                                <div class="mb-3">${question}</div>
                                                                <div class="mb-3 std-response hide-response">    
                                                                    <h6>Reponse</h6>
                                                                    <div>${questionAnswer ?? 'pas de réponse'}</div>
                                                                </div>
                                                                <h6>Etudiant reponse</h6>
                                                                <div>${userAnswer}</div>
                                                            </div> 
                                                            <div class="col-lg-4 d-flex justify-content-center align-items-center">
                                                                ${
                                                                    deleted_at === null ? `<div class="d-flex w-50 mt-5 mt-lg-0" data-answer-id="${answerId}">
                                                                            <button class="btn btn-sm" onclick="decrementNote(this)">-</button>	
                                                                            <input type="text" class="form-control form-control-sm text-center mx-2 point" value="${note ?? points}" data-max-point="${points}" oninput="changeNoteInput(this)" />	
                                                                            <button class="btn btn-sm" onclick="incrementNote(this)">+</button>	
                                                                        </div>` : ''
                                                                }
                                                               
                                                            </div> 
                                                        </div>`
                                })
                                i++
                            })
                        }

                    })
                    .catch(err => Swal.fire('Failed! Please Try later'))
            })
        });