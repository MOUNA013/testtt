// Global variables. For demo purposes.
// This variables should be configurated on configuration.ini file.
// Fore more information about custom configuration see http://www.wiris.com/plugins/docs/resources/configuration-table
// We overwrite them in order to show the changes.

// Specifies how the formulas are stored in the database.
// On configuration.ini the name of the variable is wiriseditorsavemode.
var saveMode;

// Specifies how the images are displayed on the editor.
// On configuration.ini the name of variable is wiriseditoreditmode.
var editMode;

/**
 * This method simulates how the formula rendering on a non editable area using JsPluginViewer (Preview tab)
 * and formulas are stored in the database (HTML tab).
 */
 function updateFunction() {
 	updatePreview();
 	updateHTMLCode();
 }

 function updatePreview() {
	// Using plugin custom method for retreving data.
	// This data is a raw data with the format defined by save mode (xml, image or base64 images).
	var data = getEditorData();

	// This div simulates a render page without any editor.
	var preview_div = document.getElementById("preview_div");
	// Setting data on preview div.
	preview_div.innerHTML = data;
	// Rendering data on preview using JsPluginViewer.
	if ('com' in window && 'wiris' in window.com && 'js' in window.com.wiris && 'JsPluginViewer' in window.com.wiris.js) {
		// With this method all non-editable objects are parsed.
		// com.wiris.js.JsPluginViewer.parseElement(element) can be used in order to parse a custom DOM element.
		// com.wiris.JsPluginViewer are called on page load so is not necessary to call it explicitly (I'ts called to simulate a custom render).
		com.wiris.js.JsPluginViewer.parseDocument();
	}
	// Set titles for images. For demo purposes.
	imgSetTitle(preview_div);
}

function updateHTMLCode(){
	var data = getEditorData();
	// Copy raw data to html view and formatting it. For demo porpouses.
	var data_code = (data.replace(/</g, "&lt;")).trim();;
	var htmlcode_div = document.getElementById("htmlcode_div");


	// This texts shows how WIRISplugins.js should be included.
	// Is text not javascript.
	// For demo purposes only.
	var jsExampleScript = '';
	if (saveMode == "xml") {
		jsExampleScript += 'var js = document.createElement("script");\n';
		jsExampleScript += 'js.type = "text/javascript";\n';
		jsExampleScript += 'js.src = "WIRISplugins.js?viewer=image";\n';
		jsExampleScript += 'document.head.appendChild(js);\n\n';
	}

	data_code =  jsExampleScript + data_code;
	htmlcode_div.innerHTML = htmlcode_div.innerHTML = "<pre class='wrs_inline'><code id='code_block' style='color:#e0e0e0'>" + data_code + "</code></pre>";
	highlightCode(data);
}


/**
 * Changes MathType integration save mode.
 * 1.- xml: default mode, stores formulas as mathml.
 * 2.- image: stores formulas as images.
 * 3.- base64: stores formulas as base64 images.
 *
 * This method is only for demo purposes. In order to
 * change save mode edit the configuration.ini file (wiriseditorsavemode variable).
 * See http://www.wiris.com/plugins/docs/resources/configuration-table for more information.
 */
 function changeMode(mode) {
	// Mathml mode.
	if (mode == 'xml') {
		saveMode = 'xml';
	}
	// Image mode.
	else if (mode == 'image') {
		saveMode = 'image';
	}
	// Base64 mode.
	else if (mode == 'base64') {
		saveMode = 'base64';
		// With this variable, formulas are stored as a base64 image on the database but showed with
		// a showimage src on the editor.
		editMode = "image";
	}
	// Updating Preview and HTML tabs.
	updateFunction();
}

/**
 * Reder params can be configured on the server side using configuration.ini file and //TODO @Manuel, what is 'Reder'?
 * wiriseditorparameters variable or on the client side using javascript. // TODO @Manuel, this is ok?
 * wiriseditorparameters is a valid JSON using the key and value parameters referenced here: http://www.wiris.com/editor/docs/reference/parameters
 * For example {toolbar:'quizzes',fontsize:'20px',backgroundColor:'#3B653D',color:'#FEFEFE'} changes the editor toolbar, the fontsize,
 * the background color and the formula color.
 */
 function setParameters() {
	// We set MathType Web parameters on editor_parameters textarea.
	var e = document.getElementById("editor_parameters");

	if (typeof _wrs_modalWindow != undefined) {
		_wrs_modalWindow = undefined;
	}

	// Auxiliary method to check a valid JSON. For demo purposes only.
	if (checkValidJson()) {
		var jsonParams = eval('[' + e.value + '][0]');
		// Each text editor has a specific method. // TODO @Manuel, this is ok?
		setParametersSpecificPlugin(jsonParams);
	}
}

/**
* This code sets body in rtl mode when language is rtl
**/
if(typeof _wrs_int_langCode !== 'undefined') {
	if (_wrs_int_langCode == "ar" || _wrs_int_langCode == "he" ) {
		document.body.style.direction = 'rtl';
	}
}
/**
* When body is load, we set language value to select language element.
**/
window.addEventListener('DOMContentLoaded', function() {
    // When lang code is setted
    if (typeof _wrs_int_langCode !== 'undefined') {
        var selectLang = document.getElementById('lang_select');
        // If select exists
        if (selectLang != 'undefined') {
            selectLang.value = _wrs_int_langCode;
        }
    }
}, false);

/**
 * Auxiliary functions. For demo purposes.
 */

/**
 * Shows HTML tab. For demo purposes.
 */
 function displayHTML() {
 	var preview_div = document.getElementById("preview_div");
 	preview_div.style.display = "none";
 	var htmlcode_div = document.getElementById("htmlcode_div");
 	htmlcode_div.style.display = "block";
 }

/**
 * Shows Preview tab. For demo purposes.
 */
 function displayPreview() {
 	var preview_div = document.getElementById("preview_div");
 	preview_div.style.display = "block";
 	var htmlcode_div = document.getElementById("htmlcode_div");
 	htmlcode_div.style.display = "none";
 }

/**
 * Shows or hide demo advanced options. For demo purposes.
 */
 function advancedOptions() {
 	if (document.getElementById('advanced_options_checkbox').checked) {
 		document.getElementById('advanced_options').style.display = "inherit";
 	}
 	else {
 		document.getElementById('advanced_options').style.display = "none";
 	}
 }


/**
 * Changes MathType integration language and - if it possible - WYSIWYG editor language. For demo purposes.
 */
 function changeLanguage() {
 	var e = document.getElementById("lang_select");
 	var lang = e.options[e.selectedIndex].value;
 	var prevBox = document.getElementById('preview_div');

	// Choosing between rtl and ltr languages.
	if (lang == 'ar' || lang == 'he') {
		prevBox.setAttribute('dir', 'rtl');
	} else {
		prevBox.setAttribute('dir', 'ltr');
	}

	// We need to reset the WYSIWYG editor to change the language.
	// resetEditor(lang, getWirisEditorParameters());
	window.location.search = 'language=' + lang;
}

/**
 * Returns true if JSON declared on editor_parameters textarea is a valid JSON. If not
 * returns false. For demo purposes.
 * @return {bool}
 */
 function checkValidJson() {

 	var notification = document.getElementById("notification_set_parameters");
 	var button_set = document.getElementById("set_parameters");
 	var text_area = document.getElementById("editor_parameters");
 	var error = isValidJson(text_area.value);

 	if (error == "") {
 		notification.className = "wrs_notification_valid";
 		notification.innerHTML = "Done";
 		return true;
 	}
 	else {
 		notification.className = "wrs_notification_invalid";
 		notification.innerHTML = "This is not a valid JSON";
 		return false;
 	}
 }

/**
 * Auxiliary function. Returns an empty string if a JSON has a valid format.
 * If not returns an error message. For demo purposes.
 * @param  {string}  json 	JSON string.
 * @return {string}
 */
 function isValidJson(json) {
 	try {
 		var v1 = JSON.parse(JSON.stringify(eval('[' + json + '][0]')));
 		return "";
 	}
 	catch (e) {
 		return e.message;
 	}
 }

/**
 * Auxiliary function. Highlights demo technology logo. For demo purposes.
 */
 function activateTechLogo() {
	var wrs_tech = "php";
	var logo = document.getElementById(wrs_tech + "_logo");
 	if (logo !== null) {
		logo.style.opacity = 0.9;
	};
 }

/**
 * Format database data in HTML tab. For demo porpouses.
 */
 function highlightCode() {

 	var htmlcode_div = document.getElementById("htmlcode_div");

 	var html_content = htmlcode_div.innerHTML;
 	var open_highlight = "<pre class='language-xml wrs_inline' style='word-wrap:break-word;background-color:white'><code>";
 	var close_highlight = "</code></pre>";

 	if (saveMode == "xml") {

 		/* Format the MATH tags */

 		var indexs_end = html_content.getMatchIndices("&lt;/math&gt;");

 		for (var i = indexs_end.length - 1; i >= 0; i--) {
 			var actual_index_end = indexs_end[i] + 13;
 			html_content = html_content.splice(actual_index_end, 0, close_highlight);
 		}

 		var indexs_start = html_content.getMatchIndices("&lt;math");

 		for (var i = indexs_start.length - 1; i >= 0; i--) {
 			var actual_index_start = indexs_start[i];
 			html_content = html_content.splice(actual_index_start, 0, open_highlight);
 		}


 	}
 	else if (saveMode == "image" || saveMode == "base64") {

 		/* Format the IMG and BASE64 */
 		console.log("IMAGE MODE");

 		var indexs_start = html_content.getMatchIndices("&lt;img");
 		if (indexs_start == 0){
 			indexs_start = html_content.getMatchIndices("&lt;IMG");
 		}
 		var indexs_end = [];

 		for (var i = indexs_start.length - 1; i >= 0; i--) {
 			var actual_index_start = indexs_start[i];

 			for (var j = actual_index_start; j < html_content.length - 4; j++) {
 				if (html_content[j] == "&" && html_content[j+1] == "g" && html_content[j+2] == "t" && html_content[j+3] == ";"){
 					html_content = html_content.splice(j+4, 0, close_highlight);
 					break;
 				}
 			}

 			html_content = html_content.splice(actual_index_start, 0, open_highlight);
 		}

 	}

 	htmlcode_div.innerHTML = html_content;

	// Prism library. For demo purposes.
	Prism.highlightAll();
}

/**
 * Set atitles for images. For demo purposes.
 *
 */
 function imgSetTitle(preview_div) {
 	var imgs = preview_div.getElementsByTagName("img");
 	for (var i = 0; i < imgs.length; i++) {
 		imgs[i].title = imgs[i].alt;

 	}
 }

 String.prototype.splice = function splice (idx, rem, str) {
 	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
 };

 String.prototype.getMatchIndices = function (find) {
 	var indices = [], data, exp = (typeof find == 'string' ? new RegExp(find, 'g') : find);

 	while ((data = exp.exec(this))) {
 		indices.push(data.index);
 	}

 	return indices.length ? indices : [];
 };

// Set demo's initial state.
try {
	// Use error-handling in case some resource is not available at the moment.
	activateTechLogo();	
	advancedOptions();
	displayPreview();
   } catch (error) {
	console.log('demo activation', error);
} 
/**
 * Getting data from editor using getData CKEditor method.
 * formulas are parsed to save mode format (mathml, image or base64)
 * For more information see: http://www.wiris.com/es/plugins/docs/full-mathml-mode.
 * @return {string} CKEditor parsed data.
 */
function getEditorData() {
    return window.editor.getData();
}

/**
 * Changes dynamically wiriseditorparameters CKEditor config variable.
 * @param {json} json_params MathType Web editor parameters.
 */
function setParametersSpecificPlugin(wiriseditorparameters) {
    const lang = window.editor.config.get('language');
    resetEditor(lang, wiriseditorparameters);
}

/**
* Resets CKEDITOR instance.
* @param  {lang} lang CKEditor language.
* @param  {json} wiriseditorparameters JSON containing MathType Web parameters.
*/
function resetEditor(lang, wiriseditorparameters){
    if (typeof wiriseditorparameters === 'undefined') {
        var wiriseditorparameters = {}
    }
   // Destroying CKEditor instance.
   window.editor.destroy();
   // New CKEditor instance.
   createEditorInstance(lang, wiriseditorparameters);
   // Reset modal window.
   _wrs_modalWindow = undefined;
}


/**
* Gets wiriseditorparameters from CKEditor.
* @return {object} MathType web parameters as JSON. An empty JSON if is not defined.
*/
function getWirisEditorParameters() {
    if (typeof window.editor.config != 'undefined' && typeof window.editor.config.get('wiriseditorparameters') != 'undefined') {
        return window.editor.config.get('wiriseditorparameters');
    }
    return {};
}