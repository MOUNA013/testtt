function confirmDelete(e) {
    e.preventDefault()
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
                if(e.target.tagName === 'I') e.target.parentElement.parentElement.submit()
                else e.target.parentElement.submit()
            }
        })
}
