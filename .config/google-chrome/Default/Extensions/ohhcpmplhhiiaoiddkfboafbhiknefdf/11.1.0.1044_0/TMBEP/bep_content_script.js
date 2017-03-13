//
function onGetBGMsgShowAlertPage(message) {
	bcLog("onGetBGMsgShowAlertPage")

	var alertPageContent = message.alert_page_content;
	var url = message.tab_url;
	bcLog("url: " + message.tab_url + " location: " + window.location.href);
	if(url != window.location.href) {
		return;
	} 
	bepAlertPage.showAlertPage(alertPageContent);
}

function bepStrEndsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

function onGetBGMsgGetJPSURLsByDOM(message) {
	
	bcLog("onGetBGMsgGetJPSURLsByDOM");

	var url = message.tab_url;
	bcLog("url : " + url + " location :  " + window.location.href);
	var pdfURLs;
	var swfURLs;
	var frameURLs;
	var jpsURLs = "";
	if (url != window.location.href) {
		return;
	}
	if (-1 != url.indexOf(".pdf") || -1 != url.indexOf(".swf")) {
		jpsURLs = url + "\n";
	} else {
		var win = window;
		var javaURLs = bepDOMInspector.getJavaURLs(win, url);
		pdfURLs = bepDOMInspector.getPDFURLs(win, url);
		swfURLs = bepDOMInspector.getSWFURLs(win, url);

		jpsURLs = javaURLs.java_urls + pdfURLs + swfURLs;

		if(bepStrEndsWith(jpsURLs,"\n")) {
			jpsURLs = jpsURLs.substring(0,jpsURLs.length-1);
		}

		bcLog("jpsurls : " + jpsURLs);

		if (jpsURLs.length != 0) {
			var urlChain = bepDOMInspector.getURLChain();
			var urlChainHTMLContent = bepDOMInspector.getURLChainHTMLContent();
			
			if(bepStrEndsWith(urlChain,"\n")) {
				urlChain = urlChain.substring(0,urlChain.length-1);
			}

			if(bepStrEndsWith(urlChainHTMLContent,"\n")) {
				urlChainHTMLContent = urlChainHTMLContent.substring(0,urlChainHTMLContent.length-1);
			}

			var topURLAndRefer = bepDOMInspector.getTopURLAndRefer();
			chrome.runtime.sendMessage({
				"msg_type": BEP_B2C_RES_MSG_GET_JPS_URLS_BY_DOM,
				"tab_id": message.tab_id,
				"tab_url": message.tab_url,
				"url_chain": urlChain,
				"jps_urls": jpsURLs,
				"html_content": urlChainHTMLContent,
				"window_url": url,
				"check_count": message.check_count,
				"top_url" : topURLAndRefer.top_url,
				"referrer" : topURLAndRefer.referrer
			}, function(response) {});
		} else {

		}
	}
}

function onGetBGMsgGetJavaChain(message) {
	var url = message.url;
	if (url != window.location.href) {
		return;
	}
	var win = window;
	var javaURLAndContent = bepDOMInspector.getJavaURLs(win, url);
	if (javaURLAndContent.java_urls.length != 0 && javaURLAndContent.encode_content.length != 0) {
		var urlChain = bepDOMInspector.getURLChain();
		chrome.runtime.sendMessage({
			"msg_type": BEP_B2C_RES_MSG_GET_JAVA_CHAIN,
			"tab_id": message.tab_id,
			"url_chain": urlChain,
			"java_urls": javaURLAndContent.java_urls,
			"encode_content": javaURLAndContent.encode_content,
			"window_url": url
		}, function(response) {});
	}
}

function onGetBGMsgGetHtmlContent(message) {
	//return {"url" : currUrl, "html_content" : htmlContent};
	var htmlContentInfo = bepDOMInspector.getHTMLContent();
	//console.log("!!! URL=" + htmlContentInfo.url);
	//console.log("!!! Content=" + htmlContentInfo.html_content);
	chrome.runtime.sendMessage({
			"msg_type": BEP_B2C_RES_MSG_GET_HTML_CONTENT,
			"url": htmlContentInfo.url,
			"html_content": htmlContentInfo.html_content
	}, function(response) {});
}


function onGetBackGroundMessage(message, sender, sendResponse) {

	bcLog("onGetBackGroundMessage: " + message.msg_type);

	if (message.msg_type == BEP_B2C_MSG_SHOW_ALERT_PAGE) {
		onGetBGMsgShowAlertPage(message);
	} else if (message.msg_type == BEP_B2C_MSG_GET_JPS_URLS_BY_DOM) {
		onGetBGMsgGetJPSURLsByDOM(message);
	} else if (message.msg_type == BEP_B2C_MSG_GET_JAVA_CHAIN) {
		onGetBGMsgGetJavaChain(message);
	} else if (message.msg_type == BEP_B2C_MSG_GET_HTML_CONTENT){
		onGetBGMsgGetHtmlContent(message);
	}
}

//console.log("hello, i'm content script");
chrome.runtime.onMessage.addListener(onGetBackGroundMessage);
