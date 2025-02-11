
const _token = document.querySelector('meta[name="csrf-token"]').content;
// const restPaymentsButtons = document.querySelectorAll('.rest-payments')
const restModalBody = document.querySelector("#restModal .modal-body .appends");
const paymentBtn = document.getElementById("virement-btn")
const validatePaymentBtn = document.getElementById('validateVirement')
const viewPaymentStatusBtn = document.querySelectorAll(".payment-status");
const noPaymentsModal = new bootstrap.Modal(document.getElementById('noPaymentsModal'))
const paymentsStatusModal = new bootstrap.Modal(document.getElementById('paymentStatusModal'))
const recuModal = new bootstrap.Modal(document.getElementById('recuModal'))
const restPaymentsModal = new bootstrap.Modal(document.getElementById('restModal'))

const paymentTable = document.querySelector("#paymentStatusModal tbody");

let restPayments;
let selectedPayment;

async function restPaymentsButtons (inscriptionId, paymentId) {
    // const inscriptionId = this.getAttribute('data-inscription-id')
    

    const response = await fetch('/inscriptions/'+inscriptionId+'/leftPayments?paymentId='+paymentId) //GET THE LAST UNVERIFIED PAYMENTS PRICE PAYEMENT ID
    restPayments = await response.json()
    restModalBody.innerHTML = ''
    if(restPayments.length === 0) {
        restPaymentsModal.hide()
        noPaymentsModal.show()
        // console.log('no payments! ', restPayments.length)
        
    } else {
        
        const pendingPayment = restPayments.find(payment => payment.pending)
        // console.log('pendingPayment : ', pendingPayment)
        restPayments.forEach((payment, index) => {
            restModalBody.innerHTML += `
            <div 
                data-payment-id="${payment.id}" 
                class='modality-card card mt-2 mb-0 me-2 text-secondary fw-bold shadow ps-5 position-relative overflow-hidden ${payment.pending ? 'active' : ''}' 
                ${ pendingPayment ? (payment.pending ? `onclick='chooseSlice(this, ${payment.id})'` : '') : `onclick='chooseSlice(this, ${payment.id})'` }
            >
                <input
                    type="radio" 
                    class="form-check-input me-3 visually-hidden" 
                    ${ pendingPayment && !payment.pending ? 'disabled' : '' }
                    name="amount" 
                    value="${payment.montant}"
                />
                <div>
                    <span class="h2">${payment.montant} DH</span>
                </div>
                <input type="hidden" id="leftnumTransactionValue" value="${payment.hashedNumTransaction}"/>
                <input type="hidden" id="leftMontantValue" value="${payment.montant}"/>
                <small>${payment.createdAt}</small>
            </div>`
        });
    
        if(pendingPayment) {
            const bookingPaymentBtn = document.querySelector('button[id="bookingPayment"]')
            // const paypalBtn = document.querySelector('.paypal-selector')
            // const cashPlusBtn = document.querySelector('.cashplus-selector')
            // console.log('bookingPaymentBtn : ', bookingPaymentBtn)
            // disable all other payments method when there is pending method
            bookingPaymentBtn.disabled = true
            // cashPlusBtn.disabled = true
            // paypalBtn.disabled = true
    
            bookingPaymentBtn.addEventListener('click', e => e.preventDefault())
            // cashPlusBtn.addEventListener('click', e => e.preventDefault())
            // paypalBtn.addEventListener('click', e => e.preventDefault())
    
            paymentBtn.innerHTML = '<i class="fa fa-institution me-1"></i>Virement bancaire (en attente confirmation)'
            validatePaymentBtn.innerHTML = '<i class="icon icon-minus me-2"></i>' + 'annuler le paiement'
            validatePaymentBtn.classList.replace('btn-secondary', 'btn-outline-warning')
    
            validatePaymentBtn.removeEventListener('click', payByPayment)
            validatePaymentBtn.addEventListener('click', () => cancelPayment(pendingPayment.encryptedId))
    
            // console.log('pending payment: ', document.querySelector(`div[data-inscription-id="${pendingPayment.id}"]`))
            // if there is pending payment (payment_method NOT NULL) then select it
            document.querySelector(`div[data-payment-id="${pendingPayment.id}"]`).click()
        }
        else {
            // console.log('else pending payment: ', document.querySelector('.modality-card'))
            // if there is no pending payment (payment_method IS NULL) then select first slice (tranche)
            document.querySelector('.modality-card').click()
        }
        restPaymentsModal.show()
    }
}

function chooseSlice(element, paymentId) {
    selectedPayment = restPayments.find(payment => payment.id === paymentId)
    const {inscription_id, hashedNumTransaction, num_transaction: numTransaction, montant} = selectedPayment

    document.querySelector("input[name=inscription_id]").value = inscription_id
    document.querySelector("input[name=shopurl]").value = "https://www.yool.education/Orders";
    document.querySelector("input[name=oid]").value = numTransaction;
    // set data to virement modal
    document.querySelector(".montant_vir").innerHTML = montant;
    document.querySelector(".vir_ref").innerHTML = numTransaction;

    element.querySelector('input').checked = true
    document.querySelectorAll('.modality-card').forEach(element => element.classList.remove('active'))
    element.classList.add('active')
    // console.log('element: ', element)
    // console.log('inscription id : ', )
}

validatePaymentBtn.addEventListener('click', payByPayment)

async function payByPayment() {
    // console.log('payByPayment executed')
    // console.log('===> ', selectedPayment.id)
    // return null
    try {
     const response = await fetch('/payments/' + selectedPayment.id + '/virement', {
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
    //  console.log(err)
    }
 }


 async function cancelPayment() {
    
    try {
        const response = await fetch('/payments/' + selectedPayment.encryptedId + '/cancel', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': _token,
            }
        })
        // console.log('===> ', response)
        // return
        if(response.status === 200) {
            location.reload()
        }
    } catch(err) {
        // console.log(err)
    }
}


// payments status 
viewPaymentStatusBtn.forEach(
    (btn) =>
        btn.addEventListener("click", async function () {
            // console.log('---> ', this.getAttribute("data-inscription-id"))
            try {
                const response = await fetch(
                    "/inscriptions/" +
                        this.getAttribute("data-inscription-id") +
                        "/payments?pending=check",
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json",
                        },
                    }
                );
                const { data: payments, role } = await response.json();
                    // console.log('payments test : ', payments)
                // const paymentTable = paymentStatusElem.querySelector("tbody")
                paymentTable.innerHTML = "";
                if(payments.length > 0) {
                    // console.log('payments count : ', payments)
                    payments.forEach((payment) => {
                        paymentTable.innerHTML += paymentTableRow(payment, role);
                        initializeTooltip();
                });
                } else paymentTable.innerHTML = `<tr><td colspan="4" class="text-dark">aucun paiement pour ces inscriptions</td></tr>`
            } 
            catch(err) {
                // console.log('err : ', err)
            }
        })
);

// function paymentTableRow(payment) {
//     return `<tr>
//                 <td>${payment.modality}</td>
//                 <td>${payment.montant}</td>
//                 <td>${payment.payment_method}</td>
//                 <td>${payment.verified ? '<i class="fa fa-check-circle-o fa-lg text-primary"></i>' : (payment.pending ? '<i class="fa fa-hourglass"></i>' : 'nothing')}</td>
//             </tr>`;
//     }

function paymentTableRow(payment, role) {
    return `<tr>
                <td class="align-middle">${payment?.modality}</td>
                <td class="align-middle">${payment?.montant} ${payment.currency}</td>
                <td class="align-middle text-lowercase">${
                    payment?.payment_method
                }<br>${payment?.num_transaction} </td>
                <td class="align-middle">${payment?.createdAt}</td>
                <td class="align-middle d-flex align-items-center justify-content-center">
                ${
                    payment.verified ? 
                    `<span data-bs-toggle="tooltip" data-bs-original-title="vérifié à ${ payment?.verifiedAt }" class="ms-1 ${ payment?.verified ? "" : "d-none" }"><i class="fa fa-check-circle-o fa-lg text-primary"></i></span>` 
                    : (payment.pending ? `
                        <div class="d-flex justify-content-between gap-2">
                            <button class="btn btn-sm btn-outline-light" onclick="getRecu('${payment?.paymentId}')">
                                ${role === 'ET' ? 'Importer votre reçu ici <i class="fa fa-clock-o"></i>' : 'reçu'}
                            </button>
                            <button class="btn btn-outline-light btn-sm waves-effect waves-light" data-bs-toggle="tooltip" data-bs-original-title="recommancer" onclick="changeOrderPaymentMethod('${payment?.paymentId})"><i class="fa fa-refresh fs-16"></i></button>
                            <button class="btn btn-danger btn-sm waves-effect waves-light" data-bs-toggle="tooltip" data-bs-original-title="anuller" onclick="cancelOrder('${payment?.num_transaction}', this)" data-row-id="${payment?.num_transaction}"><i class="fa fa-trash fs-16"></i></button>
                        </div>
                        ` 
                        : 'en cours')
                }                 
                </td>
            </tr>`;
}
    
    // Add this CSS to your stylesheet
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .table-row-fade {
            animation: fadeOut 0.5s;
        }
    `;
    document.head.appendChild(style);

async function uploadRecu(element) {
    const formData = new FormData()
    formData.append('recu', element.files[0])
    formData.append('paymentId', document.getElementById('paymentId').value)

    const response = await fetch('/payments/upload-recu', {
        method: 'POST',
        headers: {
            'X-CSRF-TOKEN': _token,
            'accept': 'application/json'
        },
        body: formData
    })
}

async function getRecu(paymentId) {
    // paymentsStatusModal.hide()
    recuModal.show()
    document.getElementById('paymentId').value = paymentId
    const response = await fetch(`/payments/${paymentId}/recu`);
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

function initializeTooltip() {
    var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// document.querySelectorAll(".payment-status").forEach((btn) => {
//     btn.addEventListener("click", async function () {
//         // document.querySelector('#paymentStatusModal .modal-title').innerText = this.parentElement.parentElement.querySelector('.student-name').innerText

//         const inscriptionId = this.getAttribute("data-inscription-id");
//         const response = await fetch(`/inscriptions/${inscriptionId}/payments`);
//         const { data: payments } = await response.json();
//         paymentTable.innerHTML = "";
//         if(payments.length > 0) {
//             payments.forEach((payment) => {
//                 paymentTable.innerHTML += paymentTableRow(payment);
//                 initializeTooltip();
//             });
//         } else paymentTable.innerHTML = `<tr><td colspan="4" class="text-dark">aucun paiement pour ces inscriptions</td></tr>`
//     });
// });

async function fetchPaymentStatus(orderId, paymentId,montantCell, modePaiementCell, dateCell, paymentStatusCell, role) {
    try {
        const response = await fetch(
            `/inscriptions/${orderId}/payments?pending=check&paymentId=${paymentId}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        );
        const { data: payments } = await response.json();

        // console.log(payments);
        

        if (payments.length > 0) {
            let montantHtml = '';
            let modePaiementHtml = '';
            let datehtml = '';
            let statusHtml = '';

            payments.forEach((payment) => {
                montantHtml += `${payment?.montant} ${payment.currency}`;
                modePaiementHtml += `<center>${payment?.payment_method} <br> <b>${payment?.num_transaction}</b> <br> <b>${!payment?.verified ? (payment?.binga_code ? `${payment?.binga_code} <br> <span class="badge badge-${payment?.expired ? 'danger' : 'success'} badge-pill">${payment?.expired ? 'Expiré' : 'Actif'}</span>` : '') : ''}</b></center>`;
                datehtml += `${payment?.createdAt}`;
                statusHtml += `
                    <span>${payment?.verified ? 
                        `<i class="fa fa-check-circle text-success me-2" title="vérifié à ${payment?.verifiedAt}"></i>vérifié à ${payment?.verifiedAt}` : 
                        // (payment?.pending ? 
                        (
                            (payment?.recu ? 
                                `<button class="btn btn-sm btn-outline-warning" onclick="getRecu('${payment?.paymentId}')">
                                    En cours de vérification  <i class="fa fa-clock-o"></i>
                                </button>` :
                                (payment?.payment_method == 'non séléctionné' ? 
                                    `
                                    <div class="d-flex justify-content-between gap-2">
                                        <button class="btn btn-sm btn-outline-light rest-payments" onclick="restPaymentsButtons('${payment?.inscription_id}', '${payment?.paymentId}')">
                                            ${role === 'ET' ? 'Payer le mois suivant' : 'reçu'}
                                        </button>
                                        <button class="btn btn-danger btn-sm waves-effect waves-light" data-bs-toggle="tooltip" data-bs-original-title="anuller" onclick="cancelOrder('${payment?.num_transaction}', '${payment?.paymentId}')"><i class="fa fa-trash fs-16"></i></button>
                                    </div>
                                    ` : `
                                    <div class="d-flex justify-content-between gap-2">
                                        <button class="btn btn-sm btn-outline-light" onclick="getRecu('${payment?.paymentId}')">
                                            ${role === 'ET' ? 'Importer votre reçu ici' : 'reçu'}
                                        </button>
                                        <button class="btn btn-outline-light btn-sm waves-effect waves-light" data-bs-toggle="tooltip" data-bs-original-title="restartPayment" onclick="restartPayment('${payment?.num_transaction}', '${payment?.paymentId}')" data-row-id="${payment?.num_transaction}"><i class="fa fa-refresh fs-16"></i></button>
                                        <button class="btn btn-danger btn-sm waves-effect waves-light" data-bs-toggle="tooltip" data-bs-original-title="anuller" onclick="cancelOrder('${payment?.num_transaction}', '${payment?.paymentId}')"><i class="fa fa-trash fs-16"></i></button>
                                    </div>
                                    `
                                ))
                            // ) : 
                            // 'en cours'
                        )
                    }</span>
                `;
            });

            montantCell.innerHTML = montantHtml;
            modePaiementCell.innerHTML = modePaiementHtml;
            dateCell.innerHTML = datehtml;
            paymentStatusCell.innerHTML = statusHtml;
        } else {
            montantCell.innerHTML = 'N/A';
            modePaiementCell.innerHTML = 'N/A';
            dateCell.innerHTML = 'Unknown';
            paymentStatusCell.innerHTML = '<span>Aucun paiement</span>';
        }
    } catch (err) {
        montantCell.innerHTML = '<span class="text-danger">Erreur de chargement</span>';
        modePaiementCell.innerHTML = '<span class="text-danger">Erreur de chargement</span>';
        dateCell.innerHTML = '<span class="text-danger">Erreur de chargement</span>';
        paymentStatusCell.innerHTML = '<span class="text-danger">Erreur de chargement</span>';
    }
}

document.querySelectorAll('.commandes-tr').forEach(row => {
     
        const paymentStatusCell = row.querySelector('.payment-status-cell');
        const montantCell = row.querySelector('.montant-cell');
        const modePaiementCell = row.querySelector('.mode-paiement-cell');
        const dateCell = row.querySelector('.date-cell');
        
        // Check if the necessary elements are found in the row
        if (paymentStatusCell && montantCell && modePaiementCell && dateCell) {
            const orderId = paymentStatusCell.getAttribute('data-inscription-id');
            const paymentId = paymentStatusCell.getAttribute('data-payment-id');
            
            // Fetch and update payment status only if orderId exists
            if (orderId) {
                fetchPaymentStatus(orderId, paymentId, montantCell, modePaiementCell, dateCell, paymentStatusCell, 'ET'); // Update the role dynamically if needed
            }
        } else {
            console.error('Required cells are missing in this row:', row);
        }
    
});

async function cancelOrder(numTransaction, paymentId) {
    try {
        const result = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Voulez-vous vraiment annuler cette commande?",
            icon: "warning",
            // animation: false,
            showCancelButton: true,
            confirmButtonColor: "#004298",
            cancelButtonColor: "#F07F19",
            cancelButtonText: 'Non',
            confirmButtonText: "Oui, annuler!",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await fetch(`/inscriptions/cancel-order?numTransaction=${numTransaction}&paymentId=${paymentId}`, {
                        method: "PUT",
                        headers: {
                            "X-CSRF-TOKEN": _token,
                            "Content-Type": "application/json",
                        },
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    return data;
                } catch (error) {
                    Swal.showValidationMessage(
                        `Erreur de requête: ${error.message}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });

        if (result.isConfirmed) {
            const data = result.value;
            if (data.status === 200) {
                Swal.fire({
                    title: "Annulé!",
                    text: "La commande a été annulée avec succès.",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });

                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: "Erreur!",
            text: "Une erreur est survenue lors de l'annulation de la commande.",
            icon: "error",
            confirmButtonColor: "#004298"
        });
    }
}

async function restartPayment(numTransaction, paymentId) {
    try {
        const result = await Swal.fire({
            title: "Êtes-vous sûr?",
            text: "Voulez-vous vraiment réinitialiser ce paiement?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#004298",
            cancelButtonColor: "#F07F19",
            cancelButtonText: 'Non',
            confirmButtonText: "Oui, redémarrer!",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                try {
                    const response = await fetch(`/inscriptions/restart-order`, {
                        method: "POST",
                        headers: {
                            "X-CSRF-TOKEN": _token,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            numTransaction,
                            paymentId
                        })
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json();
                    return data;
                } catch (error) {
                    Swal.showValidationMessage(
                        `Erreur de requête: ${error.message}`
                    );
                }
            },
            allowOutsideClick: () => !Swal.isLoading()
        });

        if (result.isConfirmed) {
            const data = result.value;
            if (data.status === 200) {
                Swal.fire({
                    title: "Paiement réinitialisé!",
                    text: data.message,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    location.reload();
                }, 2000);
            }
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: "Erreur!",
            text: "Une erreur est survenue lors de la réinitialisation du paiement.",
            icon: "error",
            confirmButtonColor: "#004298"
        });
    }
}


function payerParBinga() {
    const leftMontantValue = document.getElementById("leftMontantValue").value;
    const leftnumTransactionValue = document.getElementById("leftnumTransactionValue").value;

    // Show loading spinner while waiting for response
    Swal.fire({
        text: 'Chargement en cours...',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => Swal.showLoading()
    });

    $.ajax({
        url: '/get-binga-code',
        type: 'POST',
        data: {
            amount: leftMontantValue,
            tr: leftnumTransactionValue
        },
        headers: {
            'X-CSRF-TOKEN': _token, 
            'accept': 'application/json'
        },
        success: function(response) {
            Swal.close(); 

            if (response) {
                Swal.fire({
                    title: 'Votre code Binga',
                    html: `
                        <p>Code: <strong>${response}</strong></p>
                        <button id="copyBingaCode" class="swal2-confirm swal2-styled" style="background-color: #3085d6;">
                            Copier le code
                        </button>
                    `,
                    icon: 'info',
                    showConfirmButton: false,
                    didRender: function() {
                        // Add click event to copy button
                        document.getElementById('copyBingaCode').addEventListener('click', function() {
                            navigator.clipboard.writeText(response).then(function() {
                                Swal.fire({
                                    title: 'Copié!',
                                    text: 'Le code a été copié dans le presse-papiers',
                                    icon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500
                                }).then(() => {
                                    location.reload();
                                });
                            }, function(err) {
                                Swal.fire('Erreur', 'Impossible de copier le code', 'error');
                            });
                        });
                    }
                });
            } else {
                Swal.fire("OooOps", 'Erreur lors de la récupération du code', "warning");
            }
        },
        error: function() {
            Swal.fire("OooOps", 'Erreur de connexion', "error");
        }
    });
}

