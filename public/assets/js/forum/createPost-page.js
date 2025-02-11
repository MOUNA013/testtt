// upload cover post image --input file and display the img  in preview box--

const dropAreaCover = document.getElementById('drop-area-cover');
const coverImageInput = document.getElementById('cover-img-input');
const coverImgView = document.getElementById('cover-img-view');
const previewContainer = document.getElementById('preview-container');

function uploadImages() {
    previewContainer.innerHTML = ''; // Clear the preview container

    // Check if any file is selected
    if (coverImageInput.files && coverImageInput.files.length > 0) {
        // Loop through the selected files
        for (let i = 0; i < coverImageInput.files.length && i < 5; i++) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const previewImg = document.createElement('img');
                previewImg.src = e.target.result;
                previewImg.classList.add('preview-img');
                previewContainer.appendChild(previewImg);
            };

            reader.readAsDataURL(coverImageInput.files[i]);
        }

        coverImgView.style.border = 'none'; // Remove the border if needed
        coverImgView.classList.add('shadow-sm');
    }
}

// Event listener for file input change
coverImageInput.addEventListener('change', uploadImages);

// Event listeners for drag and drop
dropAreaCover.addEventListener('dragover', function(e) {
    e.preventDefault();
});

dropAreaCover.addEventListener('drop', function(e) {
    e.preventDefault();
    coverImageInput.files = e.dataTransfer.files;
    uploadImages();
});



// tags & categiries ' multiple select'
$(document).ready(function() {
    $('#tag').select2({
        theme: 'bootstrap',
        placeholder: 'Ajouter jusqu’à 4 tags ',
        maximumSelectionLength: 4,
        dropdownCssClass: 'c-autocomplete--multi__popover rounded-3 shadow-sm border',
        templateResult: formatTagOption
    });

    $('#tag').on('select2:select', function (e) {
        // Restore the placeholder text and width
        $('#tag').next().find('.select2-search__field').attr('placeholder', 'Ajouter jusqu’à 4 tags').css('width', '100%');
        // Prevent closing the dropdown when a tag is selected
        e.stopPropagation();
    });

    $('#tag').on('select2:unselect', function (e) {
        // Keep the placeholder displayed and width at 100% when removing tags
        $('#tag').next().find('.select2-search__field').attr('placeholder', 'Ajouter jusqu’à 4 tags').css('width', '100%');
    });

    function formatTagOption(tag) {
        if (!tag.id) {
            return tag.text;
        }

        var $tag = $(
            '<div class="c-autocomplete--multi__tag-option">' +
            '<div class="c-autocomplete--multi__tag-option-title d-flex align-items-center">' +
            '<span class="c-autocomplete--multi__tag-option-name">' + tag.text + '</span>' +
            '</div>' +
            '<span class="truncate-at-2">Explorer les horizons éducatifs...</span>' +
            '</div>'
        );
        return $tag;
    }
});


// Revert new changes button
function revertChanges() {
    // Revert changes made to the title textarea
    var titleTextarea = document.getElementById('article-form-title');
    titleTextarea.value = ''; // Set the value to an empty string

    // Revert changes made to the tag select list (assuming using Select2 plugin)
    var tagSelect = $('#tag');
    tagSelect.val(null).trigger('change');

    // Revert changes made to the ClassicEditor editor
    var ClassicEditor = $('#default');
    ClassicEditor.value = '' // Set the content to an empty string

}

// Attach event listener to the Revert button
var revertButton = document.querySelector('#revertChanges'); // changed index to 2
revertButton.addEventListener('click', revertChanges);


$(function(e){
    'use strict';
  
      // Message
      $(document).on("click", "#deletePostBtn", function(e){
          var message = $("#message").val();
          if(message == ""){
              message  = "Your message";
          }
          swal(message);
      });
});

