

var urlSplitToken = "peter_pi_is_a_good_boy";

var bepDOMInspector = {
	getURLChain: function() {
		var currentURL = window.location.href;
		var urlChain = currentURL + "\n";
		var parentWindow = window.parent;
		var parentURL = parentWindow.location.href;
		while (1) {
			if (currentURL == parentURL) {
				break;
			}
			urlChain = parentURL + "\n" + urlChain;
			currentURL = parentURL;
			parentWindow = parentWindow.parent;
			parentURL = parentWindow.location.href;
		}
		var referer = parentWindow.document.referrer;
		urlChain = referer + "\n" + urlChain;

		return urlChain;
	},

	getTopURLAndRefer : function() {
		var currentURL = window.location.href;
		var parentWindow = window.parent;
		var parentURL = parentWindow.location.href;
		while(1) {
			if(currentURL == parentURL) {
				break;
			}
			currentURL = parentURL;
			parentWindow = parentWindow.parent;
			parentURL = parentWindow.location.href;
		}
		var referer = parentWindow.document.referrer;
		return {"top_url" : parentURL, "referrer" : referer};
	},

	domToString: function(documentRoot) {
		var html = '';
		var node = documentRoot.firstChild;
		while (node) {

			switch (node.nodeType) {

				case Node.ELEMENT_NODE:
					html += node.outerHTML;
					break;
				case Node.TEXT_NODE:
					html += node.nodeValue;
					break;
				case Node.CDATA_SECTION_NODE:
					html += '<![CDATA[' + node.nodeValue + ']]>';
					break;
				case Node.COMMENT_NODE:
					html += '<!--' + node.nodeValue + '-->';
					break;
				case Node.DOCUMENT_TYPE_NODE:
					// (X)HTML documents are identified by public identifiers
					html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
					break;
			}
			node = node.nextSibling;
		}
		return html;
	},

	getHTMLContent: function() {
		var currUrl = window.location.href;
		var htmlContent = "";
		htmlContent = this.domToString(window.document);
		return {"url" : currUrl, "html_content" : htmlContent};
	},

	getURLChainHTMLContent: function() {
		var urlChainHTMLContent = "";
		var token = "peter_pi_is_a_good_boy";
		var currentURL = window.location.href;
		var htmlContent = this.domToString(window.document);
		if (htmlContent && htmlContent.length > 0 && currentURL.indexOf(".pdf") == -1 && currentURL.indexOf(".swf") == -1) {

			urlChainHTMLContent += htmlContent;
			urlChainHTMLContent += token;
		} else {
			urlChainHTMLContent += " ";
			urlChainHTMLContent += token;
		}

		var parentWindow = window.parent;
		var parentURL = parentWindow.location.href;
		while (1) {
			if (currentURL == parentURL) {
				break;
			}
			htmlContent = this.domToString(parentWindow.document)
			if (htmlContent && 0 != htmlContent.length) {
				urlChainHTMLContent = htmlContent + token + urlChainHTMLContent;
			} else {
				urlChainHTMLContent = " " + token + urlChainHTMLContent;
			}
			currentURL = parentURL;
			parentWindow = parentWindow.parent;
			parentURL = parentWindow.location.href;
		}

		return urlChainHTMLContent;
	},

	isRelativeURL: function(url) {
		var httpToken = "http://";
		var httpsToken = "https://";
		if (url.length < httpToken.length) {
			return true;
		}
		if (0 == url.indexOf(httpToken) || 0 == url.indexOf(httpsToken)) {
			return false;
		}
		return true;
	},

	relativeURL2AbsoluteURL: function(path, subPath) {
		var aboUrl = "";
		if (this.isRelativeURL(subPath)) {
		    if (0 == subPath.indexOf("//")) {
		        aboUrl = "http:" + subPath;
		    } else {
		        if (0 == subPath.indexOf("/")) {
		            var sfirstPosition = path.indexOf("://");
		            if (sfirstPosition == -1) {
		                return aboUrl;
		            }
		            var sfirstPosition2 = path.indexOf('/', sfirstPosition + 3);
		            if (sfirstPosition2 == -1) {
		                return aboUrl;
		            }
		            aboUrl = path.substring(0, sfirstPosition2) + subPath;	// delete one '/'
		            return aboUrl;
		        }

		        var dir;
		        var pos = path.lastIndexOf("/");
		        if (pos < 8) {
		            dir = path + "/";
		        } else {
		            dir = path.substring(0, pos + 1);
		        }
		        aboUrl = dir + subPath;
		    }
			
		} else {
			aboUrl = subPath;
		}
		return aboUrl;
	},

	getJavaURLs: function(win, winURL) {
		var doc = win.document;
		var applets = doc.applets;
		var javaURLs = "";
		var encodeContent = "";

		var index = 0;

		if (applets) {
			bcLog("Java Applets Exists");
			for (index = 0; index < applets.length; index++) {
				var applet = applets[index];
				if (applet.archive) {
					bcLog("Java Applets Archive Exists");
					var appletArchiveURL = applet.archive;
					appletArchiveURL = this.relativeURL2AbsoluteURL(winURL, appletArchiveURL);
					javaURLs += appletArchiveURL;
					javaURLs += "\n";
				} else if(applet.code) {
					bcLog("Java Applets Code Exists ");
					var appletCodeURL = applet.code;
					appletCodeURL = this.relativeURL2AbsoluteURL(winURL, appletCodeURL);
					javaURLs += appletCodeURL;
					javaURLs += "\n";
				}
			}
		}

		var objects = doc.body.getElementsByTagName("object");
		if (objects) {
			for (index = 0; index < objects.length; index++) {
				var object = objects[index];
				if (object.archive) {
					var objectsURL = object.archive;
					objectsURL = this.relativeURL2AbsoluteURL(winURL, objectsURL);
					javaURLs += objectsURL;
					javaURLs += "\n";
				} else if (object.code) {
					var objectsURL = object.code;
					objectsURL = this.relativeURL2AbsoluteURL(winURL, objectsURL);
					javaURLs += objectsURL;
					javaURLs += "\n";
				}
			}
		}

		var params = doc.body.getElementsByTagName("param");
		if (params) {
			for (index = 0; index < params.length; index++) {
				var paramElement = params[index];
				var upperName = paramElement.name.toLocaleUpperCase();
				if (upperName == "ARCHIVE" || upperName == "CODE") {
					var paramURL = paramElement.value;
					var isFound = false;
					if ("ARCHIVE" == upperName && -1 != paramURL.indexOf(".jar")) {
						isFound = true;
					} else if ("CODE" == upperName && -1 != paramURL.indexOf(".class")) {
						isFound = true;
					}
					if (isFound) {
						paramURL = this.relativeURL2AbsoluteURL(winURL, objectsURL);
						javaURLs += paramURL;
						javaURLs += "\n";
					}
				} else if (upperName == "JNLP_HREF") {
					var paramURL = this.relativeURL2AbsoluteURL(winURL, paramElement.value);
					javaURLs += paramURL;
					javaURLs += "\n";

				} else if (upperName == "JNLP_EMBEDDED") {
					encodeContent = paramElement.value;
				}
			}
		}

		var embeds = doc.embeds;
		if (embeds) {
			bcLog("Java Embdes Exists , Length :" + embeds.length);
			for (index = 0; index < embeds.length; index++) {
				var embed = embeds[index];
				var archiveURL = embed.getAttribute("archive");
				if (archiveURL && archiveURL.length != 0) {
					archiveURL = this.relativeURL2AbsoluteURL(winURL, archiveURL);
					javaURLs += archiveURL;
					javaURLs += "\n";
				} else {
					var codeURL = embed.getAttribute("code");
					if (codeURL && codeURL.length != 0) {
						codeURL = this.relativeURL2AbsoluteURL(winURL, codeURL);
						javaURLs += codeURL;
						javaURLs += "\n";
					}
				}
			}
		}

		bcLog("getJavaURLs complete, java_urls : " + javaURLs);

		return {
			"java_urls": javaURLs,
			"encode_content": encodeContent
		};
	},

	getPDFURLs: function(win, winURL) {
		var doc = win.document;
		var pdfURLs = "";
		var objects = doc.body.getElementsByTagName("object");
		var index = 0;
		if (objects) {
			for (index = 0; index < objects.length; index++) {
				var object = objects[index];
				if (object.data) {
					var objectsURL = object.data;
					if (objectsURL.indexOf(".pdf") != -1) {
						objectsURL = this.relativeURL2AbsoluteURL(winURL, objectsURL);
						pdfURLs += objectsURL;
						pdfURLs += "\n";
					}
				}
			}
		}

		var params = doc.body.getElementsByTagName("param");
		if (params) {
			for (var index = 0; index < params.length; index++) {
				var paramElement = params[index];
				var upperName = paramElement.name.toLocaleUpperCase();
				if (upperName != "SRC") {
					continue;
				}
				var paramURL = paramElement.value;
				if (paramURL.indexOf(".pdf") != -1) {
					paramURL = this.relativeURL2AbsoluteURL(winURL, paramURL);
					pdfURLs += paramURL;
					pdfURLs += "\n";
				}
			}
		}

		var embeds = doc.embeds;
		if (embeds) {
			for (var index = 0; index < embeds.length; index++) {
				var embed = embeds[index];
				if (embed.src) {
					var embedsURL = embed.src;
					if (embedsURL.indexOf(".pdf") != -1) {
						embedsURL = this.relativeURL2AbsoluteURL(winURL, embedsURL);
						pdfURLs += embedsURL;
						pdfURLs += "\n";
					}
				}
			}
		}

		return pdfURLs;

	},

	getSWFURLs: function(win, winURL) {
		var doc = win.document;
		var swfURLs = "";
		var objects = doc.body.getElementsByTagName("object");
		var index = 0;
		if (objects) {
			for (index = 0; index < objects.length; index++) {
				var object = objects[index];
				if (object.data) {
					var objectsURL = object.data;
					if (objectsURL.indexOf(".swf") != -1) {
						objectsURL = this.relativeURL2AbsoluteURL(winURL, objectsURL);
						swfURLs += objectsURL;
						swfURLs += "\n";
					}
				}
			}
		}

		var params = doc.body.getElementsByTagName("param");
		if (params) {
			for (var index = 0; index < params.length; index++) {
				var paramElement = params[index];
				var upperName = paramElement.name.toLocaleUpperCase();
				if (upperName != "SRC" && upperName != "MOVIE") {
					continue;
				}
				var paramURL = paramElement.value;
				if (paramURL.indexOf(".swf" != -1)) {
					paramURL = this.relativeURL2AbsoluteURL(winURL, paramURL);
					swfURLs += paramURL;
					swfURLs += "\n";
				}
			}
		}

		var embeds = doc.embeds;
		if (embeds) {
			for (var index = 0; index < embeds.length; index++) {
				var embed = embeds[index];
				if (embed.src) {
					var embedsURL = embed.src;
					if (embedsURL.indexOf(".swf") != -1) {
						embedsURL = this.relativeURL2AbsoluteURL(winURL, embedsURL);
						swfURLs += embedsURL;
						swfURLs += "\n";
					}
				}
			}
		}

		return swfURLs;
	},

	getFrameSrc: function(win, winURL) {
		var frameURLs = "";
		var iframes = win.document.body.getElementsByTagName("iframe");
		var index = 0;
		if (iframes) {
			for (index = 0; index < iframes.length; index++) {
				var iframe = iframes[index];
				var srcName = iframe.src;
				if (-1 != srcName.indexOf(".swf") || -1 != srcName.indexOf(".pdf")) {
					srcName = this.relativeURL2AbsoluteURL(winURL, srcName);
					frameURLs += srcName;
					frameURLs += "\n";
				}
			}
		}

		var frames = win.document.body.getElementsByTagName("frame");
		if (frames) {
			for (index = 0; index < frames.length; index++) {
				var frame = frames[index];
				var srcName = frame.src;
				if (-1 != srcName.indexOf(".swf") || -1 != srcName.indexOf(".pdf")) {
					srcName = this.relativeURL2AbsoluteURL(winURL, srcName);
					//alert("getSwfUrls embeds embedsUrl = " + embedsUrl);
					frameURLs += srcName;
					frameURLs += "\n";
				}
			}
		}

		return frameURLs;
	},

	getTopWindow: function(win) {
		//var win = window;
		var currURL = win.location.href;
		var parentWindow = win.parent;
		var topWindow = parentWindow;
		var parentURL = parentWindow.location.href;
		while (true) {
			if (currURL == parentURL) {
				break;
			}
			currURL = parentURL;
			parentWindow = parentWindow.parent;
			topWindow = parentWindow;
			parentURL = parentWindow.location.href;

		}
		return topWindow;
	},

	extractJavaJNLPURLswithDocument: function(doc, url) {
		//var doc = document;
		var params = doc.body.getElementsByTagName("param");
		var javaJNLPURLs = "";
		var hasJNLPURLs = false;
		if (params) {
			for (var index = 0; index < params.length; index++) {
				var paramElement = params[index];
				var upperName = paramElement.name.toLocaleUpperCase();
				if (upperName != "APP" && "JNLP_EMBEDDED" != upperName) {
					continue;
				}
				hasJNLPURLs = true;
				if (upperName == "APP") {
					var paramURL = paramElement.value;
					paramURL = this.relativeURL2AbsoluteURL(url, srcName);
					javaJNLPURLs += paramURL;
					javaJNLPURLs += "\n";
				}

			}
		}

		return {
			"java_jnlp_urls": javaJNLPURLs,
			"has_jnlp_urls": hasJNLPURLs
		};
	}
};
