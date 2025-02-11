
let messageRequestBody = new FormData();
const conversation = document.querySelector("#chat-box .conversation");
const chatBox = document.querySelector("#chat-box");
const chatBoxBtn = document.querySelector("#chat-box-btn");
const filePreview = document.getElementById('file-upload-preview')
console.log('===  >' , chatBoxBtn)

// if(chatBoxBtn) {

    chatBoxBtn.addEventListener("click", function () {    
        this.style.right = "-100%";
        chatBox.style.right = "0%";
        if(conversation) conversation.scrollTop = conversation.scrollHeight;
    });
    
    document.getElementById("close-chatbox").addEventListener("click", closeChatbox);
    
    function closeChatbox() {
        chatBoxBtn.style.right = "0%";
        chatBox.style.right = "-100%";
    }
    
    document.body.addEventListener('click', function (e) {
        if(chatBoxBtn.contains(e.target) || chatBox === e.target) return 
        // console.log(chatBoxBtn.contains(e.target))
        // console.log('hello world !')
        if(!chatBox.contains(e.target)) closeChatbox()
    })
    
    // open new ticket
    async function openNewTicket(csrf) {
        chatBox.querySelectorAll(".invalid-feedback").forEach((input) => {
            input.previousElementSibling.classList.remove("is-invalid");
            input.classList.add("d-none");
        });
    
        const requestBody = JSON.stringify({
            topic: document.querySelector("#ticket-topic").value,
            description: document.querySelector("#ticket-description").value,
            page: window.location.pathname
        });
    
        try {
            const response = await fetch("/tickets", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrf,
                },
                body: requestBody,
            });
            const result = await response.json();
    
            if (response.status === 201) {
                document.querySelector(".start-ticket").remove();
                chatBox.querySelector(
                    ".card-body"
                ).innerHTML = `<div class="conversation py-3">
                <div class="px-2">
                    <div class="card ticket-detail p-2 border-bottom mb-4 shadow-none">
                        <div class="card-body p-2">
                            <h6>${result.data.topic}</h6>
                            <p class="mb-1">${result.data.topic}</p>
                            <small>${result.data.created_at}</small>
                        </div>
                        <div class="card-footer p-2">
                            <small><i class="fa fa-circle text-warning"></i> pending</small>
                        </div>
                    </div>
                </div>
            </div>`;
            document.querySelector('#chat-input-area').classList.remove('d-none')
            document.getElementById('conversation-input').setAttribute('data-ticket-id', result.data.id)
            } else if (response.status === 422) {
                if (result?.errors?.topic) {
                    document
                        .querySelector(".ticket-topic-errors")
                        .previousElementSibling.classList.add("is-invalid");
                    document
                        .querySelector(".ticket-topic-errors")
                        .classList.remove("d-none");
                    document.querySelector(".ticket-topic-errors").innerHTML =
                        result?.errors?.topic;
                }
                if (result?.errors?.description) {
                    document
                        .querySelector(".ticket-description-errors")
                        .previousElementSibling.classList.add("is-invalid");
                    document
                        .querySelector(".ticket-description-errors")
                        .classList.remove("d-none");
                    document.querySelector(".ticket-description-errors").innerHTML =
                        result?.errors?.description;
                }
            } else return;
        } catch (err) {
            alert('failed, please try later')
        }
    }
    
    async function sendMessage(conversationInput, ticket_id, csrf) {
        handleMessageErrors()
        messageRequestBody.append('body', conversationInput.value)
        messageRequestBody.append('ticket_id', ticket_id)
    try {
        const response = await fetch("/messages", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "X-CSRF-TOKEN": csrf,
            },
            body: messageRequestBody,
        });
        const data = await response.json()
        if (response.status === 201) {
            const {message} = data
            const conversation = document.querySelector("#chat-box .conversation");
            conversation.innerHTML += `<div class="mb-3 user-msg">
            <p class="ms-3 border p-3 rounded m-1 bg-light">
            ${message.body || ''}
            ${message.attachment ? ` <small class="mt-1 d-block">
                <a class="badge bg-success" href="/storage/${message.attachment}" target="_blank">
                <i class="fa fa-folder-o"></i>
                </a>
            </small>` : ''}
        </p>
            </div>`;
            conversation.scrollTop = conversation.scrollHeight;
            conversationInput.value = ''
            cancelAttachment()
        }
        else if(response.status === 422) handleMessageErrors(data?.errors?.attachment, 'show')
        else {
            return
        }
        } catch(err) {
            alert('failed, please try later') 
        }
    }
    
    if(document.getElementById('file-input')) {
        document.getElementById('file-input').onchange = function () {
            handleMessageErrors()
            document.getElementById('upload-icon').classList.replace('text-muted', 'text-primary')
            messageRequestBody.append('attachment', this.files[0])
            filePreview.innerHTML = this.files[0].name
            filePreview.parentElement.classList.replace('d-none', 'd-flex')
        }
    }
    
    function cancelAttachment() {
        messageRequestBody.delete('attachment')
        filePreview.parentElement.classList.replace('d-flex', 'd-none')
        document.getElementById('upload-icon').classList.replace('text-primary', 'text-muted')
    }
    
    
    function handleMessageErrors(errorMessage = '', visibility = 'hide') {
        if(visibility === 'show') {
            document.getElementById('msg-errors').classList.remove('d-none')
            document.getElementById('msg-errors').innerHTML = errorMessage
        }
        else document.getElementById('msg-errors').classList.add('d-none')
    }
// }

// async function fetchMessages($ticketId, userId) {
//     const response = await fetch('/api/ticketsMessages/'+$ticketId)
//     const data = await response.json()
//     console.log('messages : ', data)

//     data.forEach((message, index) => {
        
//         // if(message.user_id !== userId) {
//             // $lastMessage = !array_key_exists($key + 1, $ticket->messages->toArray()) || 
//                             // $ticket->messages->toArray()[$key + 1]['user_id'] === decrypt(session('id'));
//             // const lastMessage = 
//         // }
//         // conversation.innerHTML += ``
//     })
//     // console.log('uueeeeeeeeeeeeeeeeeeeeee')
// }