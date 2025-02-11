const csrfToken = document.querySelector('meta[name="_token"]').content;
const tabs = document.querySelectorAll('.tabs-menu1 li a')
const activeTab = sessionStorage.getItem('tab')
const paymentForm = document.getElementById('edit_payment_selector')

const paymentTableTbody = document.querySelector("#paymentStatus tbody");
const paymentTable = document.getElementById('paymentTable')

const addStudentModal = new bootstrap.Modal(document.getElementById('addStudent'))
const recuModal = new bootstrap.Modal(document.getElementById('recuModal'))
const paymentStatusModal = new bootstrap.Modal(document.getElementById('paymentStatus'))
// const nombreTrancheRestant = document.getElementById('nombreTrancheRestant')
// const montantParTranche = document.getElementById('montantParTranche')
const editPaymentModal = document.getElementById('editPaymentModal')
const affectAnOrderModal = document.getElementById('affectAnOrder')
let clickedStudent;
let paymentsList;


document.querySelectorAll(".payment-status").forEach((btn) => {
    btn.addEventListener("click", async function () {
        clickedStudent = this.getAttribute('data-inscription')
        document.querySelector('#paymentStatus .modal-title').innerText = this.parentElement.parentElement.querySelector('.student-name').innerText
        // document.querySelector('#paymentStatus .modal-title').innerText = this.closest('.student-name').innerText

        const inscriptionId = this.getAttribute("data-inscription");
        const response = await fetch(`/inscriptions/${inscriptionId}/payments`);
        const { data: payments } = await response.json();
        paymentsList = payments
        paymentTableTbody.innerHTML = "";
        if(payments.length > 0) {
            payments.forEach((payment) => {
                paymentTableTbody.innerHTML += paymentTableRow(payment);
                initializeTooltip();
            });
        } else paymentTableTbody.innerHTML = `<tr><td colspan="4" class="text-dark">aucun paiement pour ces inscriptions</td></tr>`
    });
});


function paymentTableRow(payment) { 

    return `<tr>
                <td class="align-middle">${ (payment?.month != 0) ? payment?.month : ''}</td>
                <td class="align-middle">${payment?.num_transaction}</td>
                <td class="align-middle">${payment?.montant.toFixed(2)} DH</td>
                <td class="align-middle text-lowercase">${payment?.payment_method ?? '-'}</td>
                <td class="align-middle">${payment?.createdAt}</td>
                <td class="align-middle d-flex align-items-center justify-content-center">
                    <i class="fa fa-check text-primary me-1 ${payment?.verified ? '' : 'd-none'}" data-bs-toggle="tooltip" data-bs-original-title="vérifié à ${payment?.verifiedAt}"></i>
                    
                    <button 
                        data-bs-toggle="tooltip" data-bs-original-title="reçu"
                        class="btn btn-sm px-1 text-secondary" 
                        ${!payment?.pending && !payment?.verified ? "disabled" : `onclick="getRecu('${payment?.paymentId}')"`} 
                    >
                        <i class="fa fa-file-o"></i>
                    </button>

                    ${!!payment?.recu || payment?.payment_method === 'cmi' ? `
                        <button class="btn btn-sm px-1 text-secondary ${payment?.verified ? 'd-none' : ''}" 
                            ${!payment?.pending && !payment?.verified ? "disabled" : `onclick="validatePayment('${payment?.id}', this)"`}
                            data-bs-toggle="tooltip" data-bs-original-title="valider">
                            <i class="fa fa-check-square-o"></i>
                        </button>
                    ` : ''}
                    
                    <button class="btn btn-sm px-1 text-secondary" onclick="editPayment(${payment.id})" data-bs-toggle="tooltip" data-bs-original-title="modifier">
                        <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-sm px-1 text-secondary" onclick="replicatePayment(this, ${payment.id})" data-bs-toggle="tooltip" data-bs-original-title="dupliquer">
                        <i class="fa fa-clone"></i>
                    </button>
                    <button class="btn btn-sm px-1 text-secondary" onclick="showAffectAnOrderModal(${payment.id})" data-bs-toggle="tooltip" data-bs-original-title="nouveau paiement pour ce mois">
                        <i class="fa fa-tags"></i>
                    </button>

                    ${!payment?.verified ? `
                        
                        <button class="btn btn-sm px-1 text-secondary delete-payment ${payment?.verified ? 'd-none' : ''}" 
                            onclick="deletePayment(this, ${payment.id})"
                            data-bs-toggle="tooltip" data-bs-original-title="supprimer">
                            <i class="fa fa-close"></i>
                        </button>
                    ` : ''}
                </td>
            </tr>`;
}


function validatePayment(id, element) {
    Swal.fire({
        title: "Es-tu sûr?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#004298",
        cancelButtonColor: "#F07F19",
        confirmButtonText: "Oui!",
        cancelButtonText: 'Annuler'
    }).then(async (result) => {
        if (result.isConfirmed) {
            const response = await fetch("/payments/" + id + '/verify', {
                method: "PUT",
                headers: {
                    "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 200) {
                const { verifiedAt } = await response.json()
                // console.log('verifiedAt : ', verifiedAt)
                element.parentElement.querySelector('.fa-check').classList.remove("d-none");
                element.parentElement.querySelector('.fa-check').setAttribute('data-bs-original-title', "vérifié à " + verifiedAt)
                element.parentElement.querySelector('.fa-close').parentElement.remove();
                element.remove();
                initializeTooltip();
            }
        }
    });
}


function initializeTooltip() {
    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}


async function getRecu(id) {
    addStudentModal.hide()
    recuModal.show()
    document.getElementById('paymentId').value = id
    const response = await fetch(`/payments/${id}/recu`);
    const dropifyAttributes = {
        // defaultFile: recu,
        messages: {
            default: "",
            replace: "",
            remove: "Retirer",
            error: "Oups, quelque chose de mal s'est produit.",
        },
    };

    if (response.status === 200) {
        document.querySelector('#dropify-container').innerHTML = `<input type="file" onchange="uploadRecu(this)" class="dropify" name="recu" accept=".png, .jpg, .jpeg"
        id="fileInputRecu" data-show-errors="true" data-show-loader="true" />`

        setTimeout(() => {
            const dropifyRender = document.querySelector('.dropify-render')
            if(dropifyRender) {
                dropifyRender.parentElement.classList.add('d-block')
                dropifyRender.innerHTML = `<img src="${response.url}" />`
                // remove dropify file info
                dropifyRender.nextElementSibling.remove()
            }
        }, 100)
        
        $('.dropify').dropify(dropifyAttributes)
    } else {
        document.querySelector('#dropify-container').innerHTML = `<input type="file" onchange="uploadRecu(this)" class="dropify1" name="recu" accept=".png, .jpg, .jpeg"
        id="fileInputRecu" data-show-errors="true" data-show-loader="true" />`
        $('.dropify1').dropify(dropifyAttributes)
    }

}



async function uploadRecu(element) {
    const formData = new FormData();
    formData.append('recu', element.files[0]);
    formData.append('paymentId', document.getElementById('paymentId').value);

    try {
        const response = await fetch('/payments/upload-recu', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'accept': 'application/json',
            },
            body: formData,
        });

        // Handle response after upload
        if (response.status === 200) {
            const data = await response.json();  // Assume response contains a paymentId and other necessary data

            // Show success alert
            Swal.fire({
                title: 'Succès',
                text: 'Le reçu a été téléchargé avec succès.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            paymentStatusModal.hide();
            recuModal.hide();
        } else {
            Swal.fire({
                title: 'Erreur',
                text: "Une erreur est survenue lors du téléchargement du reçu.",
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Erreur',
            text: "Une erreur inconnue s'est produite.",
            icon: 'error',
            confirmButtonText: 'OK',
        });
        paymentStatusModal.hide();
        recuModal.hide();
    }
}




// nombreTrancheRestant.addEventListener('input', calcMontantPayer)
// montantParTranche.addEventListener('input', calcMontantPayer)

// function calcMontantPayer() {
//     const typePayment = document.querySelector('input[name="modality"]:checked').value
//     // console.log('typePayment : ', typePayment)
//     if (typePayment == 0) document.getElementById('montantPayer').value = montantParTranche.value
//     else document.getElementById('montantPayer').value = nombreTrancheRestant.value * montantParTranche.value
// }
// document.onload = calcMontantPayer()

// document.querySelectorAll('input[name="modality"]').forEach(radio => {
//     radio.addEventListener('click', calcMontantPayer)
// })


tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        console.log(this)
        sessionStorage.setItem('tab', this.getAttribute('href'))
    })
})
if (activeTab) {
    tabs.forEach(tab => tab.classList.remove('active'))
}


document.querySelectorAll('.stop-access')
        .forEach(btn => btn.addEventListener('click', async function () {
            const classes = this.closest('td').getAttribute('data-classes')
            const userId = this.closest('td').getAttribute('data-user')
            const groupId = this.closest('td').getAttribute('data-group');
            const response = await fetch(`/parcours/inscriptions/block`, {
                method: 'PUT',
                body: JSON.stringify({
                    classes,
                    userId,
                    groupId
                }),
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json'
                }
            })
            if(response.status === 200) {
                this.classList.add('d-none')
                this.nextElementSibling.classList.remove('d-none')
            }
}))

document.querySelectorAll('.enable-access')
        .forEach(btn => btn.addEventListener('click', async function () {
            const classes = this.closest('td').getAttribute('data-classes')
            const userId = this.closest('td').getAttribute('data-user')
            const groupId = this.closest('td').getAttribute('data-group');
            const response = await fetch(`/parcours/inscriptions/enable`, {
                method: 'PUT',
                body: JSON.stringify({
                    classes,
                    userId,
                    groupId
                }),
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                    'Content-Type': 'application/json'
                }
            })
            if(response.status === 200) {
                this.classList.add('d-none')
                this.previousElementSibling.classList.remove('d-none')
            }
}))

document.querySelectorAll('.archive-access')
    .forEach(btn => btn.addEventListener('click', async function () {
        const classes = this.closest('td').getAttribute('data-classes');
        const userId = this.closest('td').getAttribute('data-user');
        const groupId = this.closest('td').getAttribute('data-group');

        // SweetAlert confirmation
        Swal.fire({
            title: 'Es-tu sûr?',
            text: "Vous êtes sur le point d'archiver cet accès !",
            icon: 'warning',
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                // Perform the fetch request if user confirms
                const response = await fetch(`/parcours/inscriptions/archive`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        classes,
                        userId,
                        groupId
                    }),
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.status === 200) {
                        // Reload the page after successful archiving
                        window.location.reload();
                } else {
                    Swal.fire(
                        'Error!',
                        'Il y a eu un problème lors de l\'archivage de l\'accès.',
                        'error',
                    );
                }
            }
        });
    }));

document.querySelector(`a[href="${activeTab}"]`).classList.add('active')
document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'))
document.querySelector(activeTab).classList.add('active')


async function editPayment(id) {
    // console.log(do)
    paymentTable.classList.add('d-none');
    editPaymentModal.classList.remove('d-none');
    const selectedPayment = paymentsList.find(payment => payment.id === id);

    const paymentId = paymentForm.querySelector('.paymentId');
    const numTransaction = paymentForm.querySelector('.num_transaction');
    const montant = paymentForm.querySelector('.montant');
    const month = paymentForm.querySelector('.month');
    const paymentMethod = paymentForm.querySelector('.payment_method');
    const senderName = paymentForm.querySelector('.senderName');

    paymentId.value = selectedPayment.id;
    numTransaction.value = selectedPayment.num_transaction;
    montant.value = selectedPayment.montant;
    month.value = selectedPayment.month_number;
    senderName.value = selectedPayment.sender ?? '';
    switch(selectedPayment.payment_method?.toLowerCase()) {
        case 'virement': 
            paymentMethod.value = 1;
            break;
        case 'cmi': 
            paymentMethod.value = 2;
            break;
        case 'wafacash': 
            paymentMethod.value = 3;
            break;
        default:
            paymentMethod.value = 0;
    }
    // make num transaction readonly if payment is validated!
    // if(selectedPayment.verified) numTransaction.setAttribute('readonly', true)
    // else numTransaction.removeAttribute('readonly')

    // console.log('senderName : ', selectedPayment.sender)
    // console.log('selectedPayment : ', selectedPayment)
}

function hideUpdatePayment(e) {
    e.preventDefault()
    paymentStatusModal.hide();
    paymentTable.classList.remove('d-none');
    editPaymentModal.classList.add('d-none');
    affectAnOrderModal.classList.add('d-none');
    console.log('clickedStudent : ', document.querySelector(`button[data-inscription="${clickedStudent}"]`))
    setTimeout(() => {
        document.querySelector(`button[data-inscription="${clickedStudent}"]`).click()
    }, 330)

    paymentForm.querySelectorAll('input, select')
    .forEach(input => input.classList.remove('is-valid'))
}

async function updatePayment(e) {
    e.preventDefault()

    const paymentId = paymentForm.querySelector('.paymentId').value
    const numTransaction = paymentForm.querySelector('.num_transaction').value
    const montant = paymentForm.querySelector('.montant').value
    const month = paymentForm.querySelector('.month').value
    let paymentMethod = paymentForm.querySelector('.payment_method').value
    let senderName = paymentForm.querySelector('.senderName').value

    switch(paymentMethod) {
        case '1': 
            paymentMethod = 'vir';
            break;
        case '2': 
            paymentMethod = 'cmi';
            break;
        case '3': 
            paymentMethod = 'binga';
            break;
        default:
            paymentMethod = null;
    }
    try {
        const response = await fetch('/payments/'+paymentId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            },
            body: JSON.stringify({numTransaction, montant, month, paymentMethod, senderName})
        })
        if (response.status === 200) {
            paymentForm.querySelectorAll('input, select').forEach(input => {
                input.classList.add('is-valid');
            });
            
            setTimeout(() => {
                hideUpdatePayment(e)
                paymentTable.classList.remove('d-none');
                editPaymentModal.classList.add('d-none');
            }, 2000);
        }
    }
    catch(err) {
        //
    }
  
}


async function replicatePayment(element, id) {
    element = element.closest('tr')
    try {
        const response = await fetch('/payments/'+id+'/clone', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrfToken
            }
        })
        const { status, payment } = await response.json()
        paymentsList = [...paymentsList, payment]
        if(status) {
            element.insertAdjacentHTML('afterend', paymentTableRow(payment));
        }
    } catch(err) {
        //
    }
}

function deletePayment(element, id) {

    Swal.fire({
        title: "Es-tu sûr?",
        text: "Vous ne pourrez pas revenir en arrière!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#004298",
        cancelButtonColor: "#f07f19",
        confirmButtonText: "Oui, supprime-le!"
      }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch('/payments/'+id, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken
                    }
                })
                const { status } = await response.json()
                if(status) {
                    element.closest('tr').remove()
                }
            } catch(err) {
                //
            }
        }
      });
}

function showAffectAnOrderModal(id) {

    paymentTable.classList.add('d-none');
    affectAnOrderModal.classList.remove('d-none');
    const selectedPayment = paymentsList.find(payment => payment.id === id);
    const paymentIdField = document.querySelector('.orderPaymentId');
    paymentIdField.value = selectedPayment.id;
}

async function affectNewOrder(e) {
    e.preventDefault();

    const button = e.target;
    const paymentId = document.querySelector('.orderPaymentId').value;
    const newOrderMontant = document.querySelector('input[name="newOrderMontant"]').value;
    const newOrderMonth = document.querySelector('select[name="newOrderMonth"]').value;

    button.disabled = true;
    button.classList.add('disabled');

    try {
        const response = await fetch('/payments/' + paymentId + '/affect-order-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken 
            },
            body: JSON.stringify({ newOrderMontant, newOrderMonth })
        });

        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                icon: 'success',
                title: data.message || 'Succès',
                text: 'Le paiement a été ajouté avec succès !',
                showConfirmButton: false,
                timer: 1500
            });
            paymentTable.classList.remove('d-none');
            affectAnOrderModal.classList.add('d-none');
        } else {
            console.error('Failed to affect order:', response.statusText);
            Swal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Une erreur s\'est produite lors de l\'ajout du paiement.',
                showConfirmButton: true,
                confirmButtonText: 'OK'
            });
        }
    } catch (err) {
        console.error('Error affecting order:', err);
        Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Une erreur s\'est produite lors de l\'ajout du paiement.',
            showConfirmButton: true,
            confirmButtonText: 'OK'
        });
    } finally {
        button.disabled = false;
        button.classList.remove('disabled');
    }
}

async function affectOrderToAll() {

    const newOrderMontantForAll = document.querySelector('input[name="newOrderMontantForAll"]').value;
    const newOrderMonthForAll = document.querySelector('select[name="newOrderMonthForAll"]').value;
    const allStudents = JSON.parse(document.querySelector('input[name="allStudents"]').value);

    // Extract all inscription IDs
    const allInscriptionsId = allStudents.map(student => student.inscriptionId);

    // Display loading SweetAlert
    Swal.fire({
        text: 'Chargement en cours...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
        
    // Hide the modal after success
    let modalElement = document.getElementById('AffectOrderToAllModal');
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
        

    try {
        const response = await fetch('/payments/affect-all-order-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken 
            },
            body: JSON.stringify({ newOrderMontantForAll, allInscriptionsId, newOrderMonthForAll })
        });

        const result = await response.json();
        Swal.close(); // Close loading SweetAlert

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: result.message,
                text: 'Paiement ajouté avec succès !',
                showConfirmButton: false,
                timer: 1500
            });
        } else {
            console.error('Failed to affect order:', result);
        }
    } catch (err) {
        Swal.close(); // Close loading SweetAlert on error
        console.error('Error affecting order:', err);
    }
}

// --------------- NEW ------------------

function addRow() {
    var table = document.getElementById("body");
    var row = table.insertRow();
    row.setAttribute("data-id", "0");
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);

    cell1.innerHTML = '<input placeholder="Obj. FR" type="text" class="form-control" >';
    cell2.innerHTML = '<input placeholder="Obj. EN" type="text" class="form-control"  >';
    cell3.innerHTML =
        '<a class="btn btn-outline-light btn-sm waves-effect waves-light" data-bs-toggle="tooltip" href="#" onclick="deleteRow(this)" data-bs-original-title="Delete"><i class="fe fe-trash fs-16"></i></a>';
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("MyTable").deleteRow(i);
}

function AddTest() {
    Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous êtes sur le point d'envoyer le test de positionnement.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, envoyer",
        cancelButtonText: "Annuler"
    }).then((result) => {
        if (result.isConfirmed) {
            $.post(`/AddParcoursAll_Test/${GlobalParcoursId}/${GlobalGroupId}`, {
                _token: csrfToken
            }, function(data) {
                if (data == 1) {
                    Swal.fire(
                        "Succès !",
                        "Test de positionnement envoyé correctement.",
                        "success"
                    );
                } else {
                    Swal.fire(
                        "Erreur",
                        "Une erreur s'est produite lors de l'envoi.",
                        "error"
                    );
                }
            });
        }
    });
}


function publish() {
    document.getElementById('editor').value = editor.getData();
    document.getElementById('curriculum').value = curriculum.getData();

    var rows = document.getElementById('body').getElementsByTagName('tr');
    var array = [];
    for (let index = 0; index < rows.length; index++) {
        const element = rows[index].getElementsByTagName('td');
        const objfr = element[0].getElementsByTagName('input')[0].value;
        const objen = element[1].getElementsByTagName('input')[0].value;

        const row = {
            objfr: objfr,
            objen: objen
        };
        array.push(row);
    }

    document.getElementById('objectif').value = JSON.stringify(array);
    document.getElementById('submitButton').click();
}


function affectVoucherModal(voucherUserId, voucherUsername) {
    $('#voucherUserId').val(voucherUserId);
    $('#voucherUsername').text(voucherUsername);
}


// // get late students in active seance
// let selectedStudents = [];

// async function getLateStudents() {
//     let latestdBtnText = $('.latestdBtnText');
//     let refreshLateStd = $('.refreshLateStd');
//     try {
//         latestdBtnText.text('loading..');
//         refreshLateStd.text('loading..');
//         const groupId = GlobalGroupId;
//         const response = await fetch(`/parcourClasses/sessions/late-students?groupId=${groupId}`);
//         const data = await response.json();

//         if (data.status === 'error') {
//             Swal.fire({
//                 title: "Oops",
//                 text: data.message,
//                 confirmButtonColor: "#004298"
//             });
//             latestdBtnText.text('En retard');
//             refreshLateStd.text('Refresh');
//             return;
//         }

//         latestdBtnText.text('En retard');
//         refreshLateStd.text('Refresh');
//         const modalContent = document.getElementById('lateStudentsModalContent');
//         modalContent.innerHTML = '';

//         if (data.seance) {
//             modalContent.innerHTML += `
//                 <div class="alert alert-info">
//                     <p><strong>Course:</strong> ${data.seance.course_name}</p>
//                     <p><strong>Class:</strong> ${data.seance.class_name}</p>
//                     <p><strong>Time:</strong> ${data.seance.start} - ${data.seance.end}</p>
//                 </div>
//             `;
//         }

//         if (data.students && data.students.length > 0) {
//             modalContent.innerHTML += `
//                 <table class="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Phone</th>
//                             <th>Status</th>
//                             <th>Select</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         ${data.students.map((student, index) => `
//                             <tr>
//                                 <td>${index + 1}</td>
//                                 <td>${student.name}</td>
//                                 <td>${student.email}</td>
//                                 <td>${student.phone}</td>
//                                 <td class="text-center"><span class="badge bg-danger">Late</span></td>
//                                 <td class="text-center">
//                                     <input type="checkbox" 
//                                         class="student-checkbox form-check-input" 
//                                         value="${student.id}" 
//                                         data-phone="${student.phone}"
//                                         data-name="${student.name}"
//                                         onchange="updateSelectedStudents(this)">
//                                 </td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//                 <div class="mt-3">
//                     <button onclick="selectAllStudents()" class="btn btn-secondary btn-sm">Select All</button>
//                     <button onclick="deselectAllStudents()" class="btn btn-secondary btn-sm">Deselect All</button>
//                     <button onclick="sendSMSMessage(${data.seance.id})" class="btn btn-success btn-sm" id="sendSMSBtn" disabled>
//                         <i class="fa fa-whatsapp"></i> <span id="sendSMStext">Send SMS</span>
//                     </button>
//                 </div>
//             `;
//         } else {
//             modalContent.innerHTML += `
//                 <div class="alert alert-success">
//                     All students are present!
//                 </div>
//             `;
//         }

//         $('#lateStudentsModal').modal('show');
//     } catch (error) {
//         latestdBtnText.text('En retard');
//         refreshLateStd.text('Refresh');
//         console.error('Error fetching late students:', error);
//         alert('An error occurred while fetching late students');
//     }
// }

// function updateSelectedStudents(checkbox) {
//     const studentId = checkbox.value;
//     const studentPhone = checkbox.dataset.phone;
//     const studentName = checkbox.dataset.name;

//     if (checkbox.checked) {
//         selectedStudents.push({ id: studentId, phone: studentPhone, name: studentName });
//     } else {
//         selectedStudents = selectedStudents.filter(student => student.id !== studentId);
//     }

//     document.getElementById('sendSMSBtn').disabled = selectedStudents.length === 0;
// }

// function selectAllStudents() {
//     selectedStudents = [];
//     document.querySelectorAll('.student-checkbox').forEach(checkbox => {
//         checkbox.checked = true;
//         selectedStudents.push({
//             id: checkbox.value,
//             phone: checkbox.dataset.phone,
//             name: checkbox.dataset.name
//         });
//     });
//     document.getElementById('sendSMSBtn').disabled = selectedStudents.length === 0;
// }

// function deselectAllStudents() {
//     document.querySelectorAll('.student-checkbox').forEach(checkbox => {
//         checkbox.checked = false;
//     });
//     selectedStudents = [];
//     document.getElementById('sendSMSBtn').disabled = true;
// }

// async function sendSMSMessage(seanceId) {
//     if (selectedStudents.length === 0) {
//         Swal.fire({
//             title: "Error",
//             text: "Please select at least one student",
//             icon: "error",
//             confirmButtonColor: "#004298"
//         });
//         return;
//     }

//     try {
//         $('#sendSMStext').text("sending..");
//         const response = await fetch('/send-student-reminders', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'X-CSRF-TOKEN': csrfToken
//             },
//             body: JSON.stringify({
//                 students: selectedStudents,
//                 seance_id: seanceId,
//                 status: "late"
//             })
//         });

//         const result = await response.json();

//         if (result.status === 'completed') {
//             $('#sendSMStext').text("SMS messages sent successfully!");
//             setTimeout(() => {
//                 $('#sendSMStext').text("Send SMS");
//             }, 3000);
//         } else {
//             $('#sendSMStext').text("Some messages failed to send.");
//             $('#sendSMSBtn').removeClass("btn-success");
//             $('#sendSMSBtn').addClass("btn-danger");
//             setTimeout(() => {
//                 $('#sendSMStext').text("Send SMS");
//                 $('#sendSMSBtn').addClass("btn-success");
//                 $('#sendSMSBtn').removeClass("btn-danger");
//             }, 3000);
//         }
//     } catch (error) {
//         console.error("Error sending absent messages:", error);
//         // $('#sendSMStext').text("An error occurred while sending SMS messages.");
//         $('#sendSMStext').text("Cette option n’est pas disponible pour le moment.");
//         $('#sendSMSBtn').removeClass("btn-success");
//         $('#sendSMSBtn').addClass("btn-danger");
//     }
// }

function getStudent(decid) {
    $.post('/get-student', { idt: decid, _token: csrfToken }, function (data) {
        const obj = JSON.parse(data);
        document.getElementById('student_id').value = decid;
        document.getElementById('first_name').value = obj.nom;
        document.getElementById('last_name').value = obj.prenom;
        document.getElementById('codeMassar').value = obj.code_massar;
        document.getElementById('address').value = obj.adresse;
        document.getElementById('phone').value = obj.phone;
        document.getElementById('email').value = obj.email;
        document.getElementById('tutorPhone').value = obj.tutor_phone;
        $("#editStudentModal").modal("show");
    });
}