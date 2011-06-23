function executeScripts(scripts, index) {
	var element, script;
	if (!index)
		index = 0;
	if (index < scripts.length) {
		script = scripts[index];
		element = document.createElement("script");
		element.setAttribute("type", "text/javascript");
		if (script.file) {
			element.setAttribute("src", chrome.extension.getURL(scripts[index].file));
			element.addEventListener("load", function() {
				executeScripts(scripts, index + 1);
			});
			document.head.appendChild(element);
		} else if (script.code) {
			element.innerText = script.code;
			document.head.appendChild(element);
			executeScripts(scripts, index + 1);
		}
	}
}

executeScripts([ {
	code : "var CKEDITOR_BASEPATH = '" + chrome.extension.getURL("ckeditor/") + "';"
}, {
	file : "ckeditor/ckeditor.js"
}, {
	code : "[].forEach.call(document.querySelectorAll('textarea'), function(textarea) { CKEDITOR.replace(textarea); });"
} ]);