const paymentTableTbody = document.querySelector("#paymentStatus tbody");
const paymentTable = document.getElementById('paymentTable')
const csrfToken = document.querySelector('meta[name="_token"]').content;
const paymentForm = document.getElementById('edit_payment_selector')
const paymentStatusModal = new bootstrap.Modal(document.getElementById('paymentStatus'))

const addStudentModal = new bootstrap.Modal(document.getElementById('addStudent'))
const recuModal = new bootstrap.Modal(document.getElementById('recuModal'))
let paymentsList;
let clickedStudent;

const editPaymentModal = document.getElementById('editPaymentModal')

document.querySelectorAll(".payment-status").forEach((btn) => {
    btn.addEventListener("click", async function () {
        document.querySelector('#paymentStatus .modal-title').innerText = this.parentElement.parentElement.querySelector('.student-name').innerText
        clickedStudent = this.getAttribute('data-inscription')
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
            <td class="align-middle">${payment?.modality}</td>
            <td class="align-middle">${payment?.montant.toFixed(2)} DH</td>
            <td class="align-middle text-lowercase">${
                payment?.payment_method ?? '-'
            }</td>
            <td class="align-middle d-flex align-items-center justify-content-center">
            <i class="fa fa-check text-primary me-1 ${ payment?.verified ? '' : 'd-none' }" data-bs-toggle="tooltip" data-bs-original-title="vérifié à ${ payment?.verifiedAt }"></i>
            <button 
                data-bs-toggle="tooltip" data-bs-original-title="reçu"
                class="btn btn-sm px-1 text-secondary" ${ !payment?.pending && !payment?.verified ? "disabled" : `onclick="getRecu('${payment?.paymentId}')"`} 
            ><i class="fa fa-file-o"></i>
            </button>
            <button class="btn btn-sm px-1 text-secondary ${ payment?.verified ? "d-none" : "" }" ${ !payment?.pending && !payment?.verified ? "disabled" : `onclick="validatePayment('${payment?.id}', this)"` } data-bs-toggle="tooltip" data-bs-original-title="valider"><i class="fa fa-check-square-o"></i></button>
            <button class="btn btn-sm px-1 text-secondary" onclick="editPayment(${payment.id})" data-bs-toggle="tooltip" data-bs-original-title="modifier"><i class="fa fa-pencil"></i></button>
            <button class="btn btn-sm px-1 text-secondary" onclick="replicatePayment(this,${payment.id})" data-bs-toggle="tooltip" data-bs-original-title="dupliquer"><i class="fa fa-clone"></i></button>
            ${!payment.verified ? `<button class="btn btn-sm px-1 text-secondary delete-payment" onclick="deletePayment(this,${payment.id})" data-bs-toggle="tooltip" data-bs-original-title="supprimer"><i class="fa fa-close"></i></button>` : ''}
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
            try {
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
            } catch(err) {
                //
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
    const formData = new FormData()
    formData.append('recu', element.files[0])
    formData.append('paymentId', document.getElementById('paymentId').value)
    try {
        await fetch('/payments/upload-recu', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': csrfToken,
                'accept': 'application/json'
            },
            body: formData
        })
    } catch(err) {
        //
    }
}

document.querySelectorAll('.stop-access')
        .forEach(btn => btn.addEventListener('click', async function () {
            const inscriptionId = this.closest('td').getAttribute('data-inscription')
            try {
                const response = await fetch(`/inscriptions/${inscriptionId}/block`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json'
                    }
                })
                if(response.status === 200) {
                    this.classList.add('d-none')
                    this.nextElementSibling.classList.remove('d-none')
                }
            } catch (err) {
                //
            }
}))

document.querySelectorAll('.enable-access')
        .forEach(btn => btn.addEventListener('click', async function () {
            const inscriptionId = this.closest('td').getAttribute('data-inscription')
            try {
                const response = await fetch(`/inscriptions/${inscriptionId}/enable`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json'
                    }
                })
                if(response.status === 200) {
                    this.classList.add('d-none')
                    this.previousElementSibling.classList.remove('d-none')
                }
            } catch(err) {
                //
            }     
}))

document.querySelectorAll('.archive-access')
    .forEach(btn => btn.addEventListener('click', async function () {
        const inscriptionId = this.closest('td').getAttribute('data-inscription');

        // Show confirmation dialog using SweetAlert2
        const result = await Swal.fire({
            title: 'tu es sûr ?',
            text: 'Vous êtes sur le point d’archiver cette inscription !',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, archivez-le !',
            cancelButtonText: 'Non, annuler',
            reverseButtons: true
        });

        // If the user confirms, proceed with the fetch request
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/inscriptions/${inscriptionId}/archive`, {
                    method: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    window.location.reload();
                } 
            } catch (err) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to archive the inscription. Please try again later.',
                    icon: 'error'
                });
            }
        }
    }));

async function editPayment(id) {
    // console.log(do)
    paymentTable.classList.add('d-none')
    editPaymentModal.classList.remove('d-none')
    const selectedPayment = paymentsList.find(payment => payment.id === id)

    const paymentId = paymentForm.querySelector('.paymentId')
    const numTransaction = paymentForm.querySelector('.num_transaction')
    const montant = paymentForm.querySelector('.montant')
    const modality = paymentForm.querySelector('.modality')
    const paymentMethod = paymentForm.querySelector('.payment_method')

    paymentId.value = selectedPayment.id
    numTransaction.value = selectedPayment.num_transaction
    montant.value = selectedPayment.montant
    modality.value = selectedPayment.modality
    switch(selectedPayment.payment_method?.toLowerCase()) {
        case 'virement bancaire': 
            paymentMethod.value = 1;
            break;
        case 'cmi': 
            paymentMethod.value = 2;
            break;
        case 'binga': 
            paymentMethod.value = 3;
            break;
        default:
            paymentMethod.value = 0;
    }
    // make num transaction readonly if payment is validated!
    // if(selectedPayment.verified) numTransaction.setAttribute('readonly', true)
    // else numTransaction.removeAttribute('readonly')

    console.log('selectedPayment : ', selectedPayment)
}
function hideUpdatePayment(e) {
    e.preventDefault()
    paymentStatusModal.hide()
    paymentTable.classList.remove('d-none')
    editPaymentModal.classList.add('d-none')
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
    const modality = paymentForm.querySelector('.modality').value
    let paymentMethod = paymentForm.querySelector('.payment_method').value

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
            body: JSON.stringify({numTransaction, montant, modality, paymentMethod})
        })
        if(response.status === 200) {
            paymentForm.querySelectorAll('input, select')
            .forEach(input => input.classList.add('is-valid'))
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