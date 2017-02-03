function bepExecBodyScripts(bodyElement) {
	function nodeName(elem, name) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	}

	function evalScript(elem) {
		var data = elem.text || elem.textContent || elem.innerHTML || "";
		var head = document.getElementsByTagName("head")[0] || document.documentElement;
		var script = document.createElement("script");
		script.type = "text/javascript";
		try {
			script.appendChild(document.createTextNode(data));
		} catch (e) {
			script.text = data;
		}
		head.insertBefore(script, head.firstChild);
	}
	var scripts = [];
	var childrenNodes = bodyElement.childNodes;
	var index = 0;
	for (index = 0; childrenNodes[index]; index++) {
		var child = childrenNodes[index];
		if (nodeName(child, "script") && (!child.type || child.type.toLowerCase() === "text/javascript")) {
			scripts.push(child);
		}
	}

	for (index = 0; scripts[index]; index++) {
		var eScript = scripts[index];
		if (eScript.parentNode) {
			eScript.parentNode.removeChild(eScript);
		}
		evalScript(scripts[index]);
	}

	var body = document.getElementsByTagName("body")[0] || document.documentElement;
	var cScript = document.createElement("script");
	var exeData = "try{init();}catch(e){}";
	cScript.type = "text/javascript";

	try {
		cScript.appendChild(document.createTextNode(exeData));
	} catch (e) {
		cScript.text = exeData;
	}
	body.appendChild(cScript);
}


var bepAlertPage = {
	execScriptOfAlertPage: function() {
		bepExecBodyScripts(document.getElementsByTagName("body")[0]);
		bepExecBodyScripts(document.getElementsByTagName("head")[0]);
	},

	showAlertPage: function(alertPageContent) {
		bcLog("showAlertPage ");
		document.documentElement.innerHTML = alertPageContent;
		setTimeout(this.execScriptOfAlertPage, 300);
	}
};