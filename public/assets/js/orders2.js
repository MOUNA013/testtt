const paymentStatusElem = document.getElementById("paymentStatusModal");
const virementElem = document.getElementById("virementModal");

let payRestModal = new bootstrap.Modal(document.getElementById("restModal"));
let virementModal = new bootstrap.Modal(virementElem);
let paymentStatusModal = new bootstrap.Modal(paymentStatusElem);
const uploadRecuModal = new bootstrap.Modal(
    document.getElementById("uploadRecuModal")
);

const _token = document.querySelector('meta[name="csrf-token"]').content;
let paymentId;

const virementBtn = document.getElementById("virement-btn")
const uploadRecuBtn = document.getElementById("uploadRecu");
const viewPaymentStatusBtn = document.querySelectorAll(".view-payment-status");
const validateVirementBtn = document.getElementById('validateVirement')

// payments status 
viewPaymentStatusBtn.forEach(
    (btn) =>
        btn.addEventListener("click", async function () {
            try {
                const response = await fetch(
                    "/inscriptions/et/" +
                        this.getAttribute("data-inscription-id") +
                        "/payments",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );
                const { payments, role } = await response.json();

            paymentStatusElem.querySelector("tbody").innerHTML = "";
            payments.forEach((payment) => {
                paymentStatusElem.querySelector("tbody").innerHTML += `
            <tr>
                <td>${payment.modality}</td>
                <td>${payment.montant}</td>
                <td>${payment.payment_method}</td>
                <td>${
                    payment.payment_method === "virement"
                        ? role === "ET"
                        ? payment.verified_at === null &&
                        payment.recu === null
                          ? `<button data-bs-toggle='modal' data-bs-target='#uploadRecuModal' class='btn btn-sm btn-outline-secondary' onclick='showUploadRecuModal(${payment.id})'>télécharger reçu</button>`
                          : payment.verified_at === null &&
                            payment.recu !== null
                          ? `
                              <span class='badge text-secondary me-1'>en attente confirmation</span>
                              <button class='btn btn-sm btn-outline-secondary' data-bs-toggle='modal' data-bs-target='#uploadRecuModal' onclick='showUploadRecuModal(${payment.id})'><i class='fe fe-upload-cloud' data-bs-toggle="tooltip" data-bs-original-title="télécharger une autre reçu"></i></button>
                          `
                          : `<span class='waves-effect waves-danger' data-bs-toggle='tooltip' data-bs-original-title='vérifié à ${payment.verified_at}'><i class=\"fa fa-check-circle-o fa-lg text-primary\"></i></span>`
                      : payment.verified_at === null
                      ?
                        `
                    <button class="btn btn-sm btn-outline-danger" onclick='handleOrder(this, ${
                        payment.id
                    }, "delete")' data-bs-toggle='tooltip' data-bs-original-title='Refuser'><i class='fa fa-times'></i></button>
                    <button class="btn btn-sm btn-outline-success" onclick='handleOrder(this, ${
                        payment.id
                    }, 1)' data-bs-toggle='tooltip' data-bs-original-title='Accepter'><i class='fa fa-check'></i></button>
                    <a  class="btn btn-sm btn-outline-secondary ms-2 ${
                        payment.recu === null ? "disabled" : ""
                    }" href="${
                            payment.recu ?? "#"
                        }" data-lightbox="image-1" data-title="reçu ${
                            payment.num_transaction
                        }">voir reçu</a>
                  `
                      : `<span class='waves-effect waves-danger' data-bs-toggle='tooltip' data-bs-original-title='vérifié à ${payment.verified_at}'><i class=\"fa fa-check-circle-o fa-lg text-primary\"></i></span>
                      <a  class="btn btn-sm btn-outline-secondary ms-2 ${
                        payment.recu === null ? "disabled" : ""
                    }" href="${
                            payment.recu ?? "#"
                        }" data-lightbox="image-1" data-title="reçu ${
                            payment.num_transaction
                        }">voir reçu</a>`
                        : `<span class='waves-effect waves-danger' data-bs-toggle='tooltip' data-bs-original-title='vérifié à ${payment.verified_at}'><i class=\"fa fa-check-circle-o fa-lg text-primary\"></i></span>
                    `
                }
                </td>
            </tr>
        `;
            });

            var tooltipTriggerList = [].slice.call(
                document.querySelectorAll('[data-bs-toggle="tooltip"]')
            );
            var tooltipList = tooltipTriggerList.map(function (
                tooltipTriggerEl
            ) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }
        catch(err) {
            // console.log(err)
        }
        })
);

// get left payments for clicked order
document.querySelectorAll(".restModal").forEach((btn, index) =>
    btn.addEventListener("click", async function () {
        const inscriptionId = this.getAttribute("data-inscription-id");
        try {
            const response = await fetch("/inscriptions/" + inscriptionId + '/leftPayments', {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            const payments = await response.json();
            const restModalBody = document.querySelector(
                "#restModal .modal-body .appends"
            );
            restModalBody.innerHTML = ''
            let pendingPayment = payments.find(payment => payment.pending)
            if(pendingPayment === undefined) pendingPayment = payments[0]
            // console.log('pending payment : ', pendingPayment)
            document.querySelector("input[name=inscription_id]").value = pendingPayment.inscription_id
            document.querySelector("input[name=shopurl]").value = "https://www.yool.education/Cart?transaction=" + pendingPayment.hashedNumTransaction;
    
            document.querySelector("input[name=oid]").value = pendingPayment.num_transaction;
                if(pendingPayment.pending) {
                    const bookingPaymentBtn = document.querySelector('button[name="bookingPayment"]')
                    const paypalBtn = document.querySelector('.paypal-selector')
                    const cashPlusBtn = document.querySelector('.cashplus-selector')

                    // disable all other payments method when there is pending method
                    bookingPaymentBtn.disabled = true
                    cashPlusBtn.disabled = true
                    paypalBtn.disabled = true

                    bookingPaymentBtn.addEventListener('click', e => e.preventDefault())
                    cashPlusBtn.addEventListener('click', e => e.preventDefault())
                    paypalBtn.addEventListener('click', e => e.preventDefault())

                    virementBtn.innerHTML = '<i class="fa fa-institution me-1"></i>' + 'en attente confirmation'
    
                    validateVirementBtn.innerHTML = '<i class="icon icon-minus me-2"></i>' + 'annuler le paiement'
                    validateVirementBtn.classList.replace('btn-secondary', 'btn-outline-danger')
                    validateVirementBtn.removeEventListener('click', VirementValidate)
                    validateVirementBtn.addEventListener('click', () => cancelPayment(pendingPayment.id))
                }
            // console.log('payments : ', payments)
            payments.forEach((payment, index) => {
                restModalBody.innerHTML += `
                <div 
                ${payment.id === pendingPayment.id || !pendingPayment.pending ? `onclick='checkModality(this, ${payment.inscription_id}, "${payment.hashedNumTransaction}", "${payment.num_transaction}", "${payment.montant}", "${payment.id}")'` : ''}
                class='${index === 0 ? 'active' : ''} modality-card card flex-row mb-2 me-2 text-secondary fw-bold shadow ps-2'
                >
                    <input type="hidden" value="${payment.modality}" name="modality" />
                    <input 
                        type="radio" 
                        class="form-check-input me-3" 
                        ${index === 0 ? 'checked' : ''} 
                        name="amount" 
                        value="${payment.montant}"
                        ${payment.id !== pendingPayment.id && pendingPayment.pending ? 'disabled' : ''}
                    />
                    <div>
                        <span class='me-1'>${payment.modality}</span>
                        <span>(${payment.montant}) DH</span>
                    </div>
                </div>`
            });
            restModalBody.querySelector('.active').click()
        }catch(err) {
            // console.log(err)
        }
    })
);

validateVirementBtn.addEventListener('click', VirementValidate)

uploadRecuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    uploadRecu();
});

// function allow admins to accept/refuse order
async function handleOrder(btn, id, action) {
    Swal.fire({
        title: "Es-tu sûr?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3571D5",
        cancelButtonColor: "#F07F19",
        cancelButtonText: "Annuler",
        confirmButtonText: "Oui",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`/payments/${id}/${action}`, {
                    method: "PATCH",
                    headers: {
                        "X-CSRF-TOKEN": _token,
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                });
                const {status, payment} = await response.json();
                if (status && action === 1) {
                    btn.parentElement.innerHTML = `
                    <span class='waves-effect waves-danger' data-bs-toggle='tooltip' data-bs-original-title='vérifié à ${payment.verifiedAt}'><i class=\"fa fa-check-circle-o fa-lg text-primary\"></i></span>
                    <a class="btn btn-sm btn-outline-secondary ms-2 ${
                        payment.recu === null ? "disabled" : ""
                    }" href="${
                            payment.recu ?? "#"
                        }" data-lightbox="image-1" data-title="reçu ${
                            payment.num_transaction
                        }">voir reçu</a>`;
                } else if (status && action === "delete") {
                    btn.parentElement.parentElement.remove();
                } else {
                    return true;
                }
            }
            catch(err) {
                console.log(err)
            }
        }
    });
}

async function showUploadRecuModal(paymentId) {
    paymentStatusModal.hide();
    document.getElementById("uploadRecuStatus").innerHTML = "";
    const response = await fetch(`/payments/${paymentId}/recu`);
    const recu = await response.json();

    const dropifyAttributes = {
        // defaultFile: recu,
        messages: {
            default: "Faites glisser et déposez un fichier ici ou cliquez sur",
            replace: "Glisser-déposer ou cliquer pour remplacer",
            remove: "Retirer",
            error: "Oups, quelque chose de mal s'est produit.",
        },
    };

    if (recu) {
        dropifyAttributes["defaultFile"] = recu;
        uploadRecuBtn.innerHTML = "télécharger une autre reçu";
    } else uploadRecuBtn.innerHTML = "télécharger";

    $(".dropify").dropify(dropifyAttributes);

    document.querySelector("#paymentRecu").value = paymentId;
}

// function execute when user click above payment card 
function checkModality(elem, _inscriptionId, _hashedNumTransaction, _numTransaction, _montant, _paymentId) {
    paymentId = _paymentId

    document.querySelector("input[name=inscription_id]").value = _inscriptionId
    document.querySelector("input[name=shopurl]").value = "https://www.yool.education/Cart?transaction=" + _hashedNumTransaction;
    document.querySelector("input[name=oid]").value =_numTransaction;

    // set data to virement modal
    virementElem.querySelector(".montant_vir").innerHTML = _montant + " DH";
    virementElem.querySelector(".vir_ref").innerHTML = _numTransaction;

    document.querySelectorAll('.modality-card').forEach(elem => elem.classList.remove('active'))
    elem.classList.add('active')
    elem.querySelector('input[type="radio"]').checked = true

}


async function VirementValidate() {
    try {
        // console.log({
        //     inscriptionId,
        //     numTransaction,
        //     montant,
        //     modality,
        // })
        // return
     const response = await fetch('/payments/' + paymentId + '/virement', {
         method: "PUT",
         headers: {
             "X-CSRF-TOKEN": _token,
             "Content-Type": "application/json",
             Accept: "application/json",
         },
         });
         const result = await response.json()
         if(result.status === 1) {
             location.reload()
         }
    } catch(err) {
     // console.log(err)
    }
 }

function uploadRecu() {

    const fileInput = document.getElementById("fileInputRecu");
    const uploadStatus = document.getElementById("uploadRecuStatus");

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append("_token", _token);
        formData.append("recu", file);
        formData.append(
            "paymentId",
            document.querySelector("#paymentRecu").value
        );

        // You can use the Fetch API to send the file to a server.
        fetch("/payments/upload-recu", {
            method: "POST",
            body: formData,
            // headers: {
            // 'Content-Type': 'application/json',
            // 'Accept': 'application/json',
            "X-CSRF-TOKEN": _token,
            // }
        })
            .then((response) => response.json())
            .then((data) => {

                if(data?.status) {
                    uploadRecuModal.hide();
                    Swal.fire({
                        // position: 'top-end',
                        icon: "success",
                        title: data?.message,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                } else {
                    uploadStatus.classList.add("text-warning");

                    uploadStatus.innerHTML = data?.errors;
                }
             
            })
            .catch((error) => {
                console.log("error : ", error);
                // uploadStatus.innerHTML = 'Error uploading file: ' + error;
            });
    } else {
        // uploadStatus.classList.remove("text-success", "text-danger");
        uploadStatus.classList.add("text-warning");

        uploadStatus.innerHTML =
            "Veuillez sélectionner un fichier à télécharger.";
    }
}


async function cancelPayment(id) {
    try {
        const response = await fetch('/payments/' + id + '/cancel', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': _token,
            }
        })
        const result = await response.json()
        if(response.status === 200) {
            location.reload()
        }
    } catch(err) {
        // console.log(err)
    }
}