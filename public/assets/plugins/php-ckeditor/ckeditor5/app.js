import { ClassicEditor, Essentials, Paragraph, Bold, Italic, Alignment, Image, Underline, Link } from "ckeditor5";

// New CKEditor5 import method (42.0.0)
import "ckeditor5/ckeditor5.css";

// We removed the MathType for CKEditor5 dependency to avoid having duplicated modules error.
// On build time, we copy the html-integrations MathType for CK5 build file to the output folder of this demo.
import MathType from './index.js';

window.editor = null;
window.editor1 = null;
window.editor2 = null;

/**
 * Creates a CKEditor instance on "example" div.
 * @param  {string} lang CKEditor language. MathType read this variable to set the editor lang.
 * @param  {string} wiriseditorparameters JSON containing MathType Web parameters.
 */
function createEditorInstance(lang, wiriseditorparameters) {

    // Defines editor language, 'en' by default
    if (typeof lang == 'undefined') {
        lang = 'en';
    }

    // It language isn't English, we must add the translation script
    if (lang != 'en') {

        const head = document.head;
        const languageScriptId = 'language_script';

        // First we remove any old language script tags
        let scriptOld = document.getElementById(languageScriptId);
        if (scriptOld) {
            head.removeChild(scriptOld);
        }

        // Then we add the new one
        let scriptNew = document.createElement('script');
        scriptNew.id = languageScriptId;
        scriptNew.type = 'text/javascript';
        scriptNew.src = `https://cdn.ckeditor.com/ckeditor5/11.0.1/classic/translations/${lang}.js`;
        head.appendChild(scriptNew);

    }

    // If wiriseditorparameters is not defined, an empty JSON as parameter.
    // This config parameter is not mandatory. Only use them when you want to change
    // any editor params from the client side.
    // It is recommended to define editor params on configuration.ini.
    if (typeof wiriseditorparameters === 'undefined') {
        wiriseditorparameters = {};
    }

    // Instantiate the editor
    ClassicEditor
        .create( document.querySelector( '#example' ), {
            plugins: [ Essentials, Paragraph, MathType, Image, Bold, Italic, Underline, Alignment ],
            toolbar: {
                items: [
                    // No source feature in CKEditor 5
                    //'|',
                    // No clipboard buttons in CKEditor 5.
                    // They are mostly useless anyways, can't paste without using Ctrl+V
                    //'|',
                    'undo',
                    'redo',
                    '|',
                    // No find feature in CKEditor 5
                    //'|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'alignment:left',
                    'alignment:center',
                    'alignment:right',
                    '|',
                    'MathType',
                    'ChemType',
                ]
            },
            language: lang,
            mathTypeParameters: {
                editorParameters: wiriseditorparameters,
                serviceProviderProperties: {
                    URI: process?.env?.SERVICE_PROVIDER_URI ?? 'https://www.wiris.net/demo/plugins/app',
                    server: process?.env?.SERVICE_PROVIDER_SERVER ?? 'java',
                },
            },
        } )
        .then( editor => {
            // Expose the editor for debugging
            window.editor = editor;

            // contenteditable property is used by some tests to select the editing area
            document.querySelector( '#example' ).removeAttribute( 'contenteditable' );

            // Focusing CKEditor when the instance is ready. Only for demo purposes.
            editor.editing.view.focus();
            updateFunction();
        } )
        .catch( error => {
            console.error( error.message, error.stack );
        } );

}

document.onreadystatechange = () => {
    //* The EditorInstance is created as soon as the document is interactive. This prevents the mathType script from being loaded before the editor is created. Avoiding errors.
    if (document.readyState === "interactive") {
        // Expose createEditorInstance
        window.createEditorInstance = createEditorInstance;

        // Creating CKEditor demo instance.
        if (typeof _wrs_int_langCode !== 'undefined') {
            createEditorInstance(_wrs_int_langCode, {});
        } else {
            createEditorInstance('en', {});
        }
    }
};

if (document.getElementById('editor1') !== null) {
    ClassicEditor
            .create( document.querySelector( '#editor1' ), {
                plugins: [ Essentials, Paragraph, MathType, Image, Bold, Italic, Underline, Alignment ],
                toolbar: {
                    items: [
                        // No source feature in CKEditor 5
                        //'|',
                        // No clipboard buttons in CKEditor 5.
                        // They are mostly useless anyways, can't paste without using Ctrl+V
                        //'|',
                        'undo',
                        'redo',
                        '|',
                        // No find feature in CKEditor 5
                        //'|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'alignment:left',
                        'alignment:center',
                        'alignment:right',
                        '|',
                        'MathType',
                        'ChemType',
                    ]
                },
                language: 'en',
                // Custom Wiris parameters
                mathTypeParameters : {
                    'editorParameters' : {'fontSize' : '26px'}
                }
            } )
            .then( editor => {
                // Expose the editor for debugging
                window.editor1 = editor;

                // contenteditable property is used by some tests to select the editing area
                document.querySelector( '#editor1' ).removeAttribute( 'contenteditable' );

                // Focusing CKEditor when the instance is ready. Only for demo purposes.
                editor.editing.view.focus();
            } )
            .catch( error => {
                console.error( error.message, error.stack );
    } );
}

if (document.getElementById('editor2') !=null) {
    ClassicEditor
            .create( document.querySelector( '#editor2' ), {
                plugins: [ Essentials, Paragraph, MathType, Image, Bold, Italic, Underline, Alignment ],
                toolbar: {
                    items: [
                        // No source feature in CKEditor 5
                        //'|',
                        // No clipboard buttons in CKEditor 5.
                        // They are mostly useless anyways, can't paste without using Ctrl+V
                        //'|',
                        'undo',
                        'redo',
                        '|',
                        // No find feature in CKEditor 5
                        //'|',
                        'bold',
                        'italic',
                        'underline',
                        '|',
                        'alignment:left',
                        'alignment:center',
                        'alignment:right',
                        '|',
                        'MathType',
                        'ChemType',
                    ]
                },
                language: 'en',
                // Custom Wiris parameters
                mathTypeParameters : {
                    'editorParameters' : {'toolbar' : 'quizzes'}
                }
            } )
            .then( editor => {
                // Expose the editor for debugging
                window.editor2 = editor;

                // contenteditable property is used by some tests to select the editing area
                document.querySelector( '#editor2' ).removeAttribute( 'contenteditable' );

                // Focusing CKEditor when the instance is ready. Only for demo purposes.
                editor.editing.view.focus();
            } )
            .catch( error => {
                console.error( error.message, error.stack );
    } );
}

if (document.getElementById('editorImage') != null) {
    ClassicEditor
        .create( document.querySelector( '#editorImage' ), {
            plugins: [ Essentials, Paragraph, MathType, Image, Bold, Italic, Underline, Alignment ],
            toolbar: {
                items: [
                    // No source feature in CKEditor 5
                    //'|',
                    // No clipboard buttons in CKEditor 5.
                    // They are mostly useless anyways, can't paste without using Ctrl+V
                    //'|',
                    'undo',
                    'redo',
                    '|',
                    // No find feature in CKEditor 5
                    //'|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'alignment:left',
                    'alignment:center',
                    'alignment:right',
                    '|',
                    'MathType',
                    'ChemType',
                ]
            },
            language: 'en',
        } )
        .then( editor => {
            // Expose the editor for debugging
            window.editorImage = editor;

            // contenteditable property is used by some tests to select the editing area
            document.querySelector( '#editorImage' ).removeAttribute( 'contenteditable' );

            // Focusing CKEditor when the instance is ready. Only for demo purposes.
            editor.editing.view.focus();
        } )
        .catch( error => {
            console.error( error.message, error.stack );
        } );
}

if (document.getElementById('editorAttr') != null) {
    ClassicEditor
        .create( document.querySelector( '#editorAttr' ), {
            plugins: [ Essentials, Paragraph, MathType, Image, Bold, Italic, Underline, Alignment, Link ],
            toolbar: {
                items: [
                    // No source feature in CKEditor 5
                    //'|',
                    // No clipboard buttons in CKEditor 5.
                    // They are mostly useless anyways, can't paste without using Ctrl+V
                    //'|',
                    'undo',
                    'redo',
                    '|',
                    // No find feature in CKEditor 5
                    //'|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'alignment:left',
                    'alignment:center',
                    'alignment:right',
                    '|',
                    'link',
                    '|',
                    'MathType',
                    'ChemType',
                ]
            },
            language: 'en',
        } )
        .then( editor => {
            // Expose the editor for debugging
            window.editorImage = editor;

            // contenteditable property is used by some tests to select the editing area
            document.querySelector( '#editorAttr' ).removeAttribute( 'contenteditable' );

            // Focusing CKEditor when the instance is ready. Only for demo purposes.
            editor.editing.view.focus();
        } )
        .catch( error => {
            console.error( error.message, error.stack );
        } );
}