//
var BEP_NATIVE_MESSAGE_HOST_NAME = "com.trendmicro.bep.chrome.host";
var bepNMHost = null;
var isBEPNMHostOK = false;

var bepConfig = {};
bepConfig.enable = false;
bepConfig.enableContributionFeedback = true;
bepConfig.ttlContributionFeedback = 1500;
bepConfig.enableConsoleLog = false;

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function(str) {
		return this.slice(0, str.length) == str;
	};
}

if (typeof String.prototype.endsWith != 'function') {
	String.prototype.endsWith = function(str) {
		return this.slice(-str.length) == str;
	};
}

/*****************************************************************************/
var bepConBrowse = {

	isConBrowseURL: function(cbURL) {
		if (cbURL.startsWith("http://localhost:37848") || cbURL.startsWith("http://127.0.0.1:37848")) {
			return true;
		}
		return false;
	},


	isBEPConBrowseURL: function(cbURL) {
		if (this.isConBrowseURL(cbURL)) {
			if (cbURL.indexOf("Source=BEP") != -1) {
				return true;
			}
		}
		return false;
	},

	getOrginURL: function(cbURL) {
		var orginURL = cbURL;
		do {
			var indexPath = cbURL.indexOf("?");
			if (indexPath == -1) {
				break;
			}

			var urlPath = cbURL.substr(indexPath);
			var urlPaths = urlPath.split("&");
			for (var index = 0; index < urlPaths.length; index++) {
				if (urlPaths[index].startsWith("URL=")) {
					orginURL = urlPaths[index].replace("URL=", "");
					break;
				}
			}

		} while (0);

		return decodeURIComponent(orginURL);
	}
};

/*****************************************************************************/


function readBEPConfig() {
	sendBEPNativeMessage({
		"msg_type": BEP_B2H_MSG_READ_CONFIG
	});
}


function initBEPExtension() {
	connectBEPNativeMessage();
	readBEPConfig();
}
window.addEventListener("load", initBEPExtension, false);

/*****************************************************************************/
function onBEPNMHostDisconnected() {
	bcLog("Failed to connect: " + chrome.runtime.lastError.message);
	bepNMHost = null;
	isBEPNMHostOK = false;
}

function connectBEPNativeMessage() {
	bcLog("connect " + BEP_NATIVE_MESSAGE_HOST_NAME);
	bepNMHost = chrome.runtime.connectNative(BEP_NATIVE_MESSAGE_HOST_NAME);
	bepNMHost.onMessage.addListener(onBEPNativeMessage);
	bepNMHost.onDisconnect.addListener(onBEPNMHostDisconnected);
	isBEPNMHostOK = true;
}

function sendBEPNativeMessage(message) {
	bcLog("last error : " + chrome.runtime.lastError);
	bcLog("sendBEPNativeMessage :  " + message.msg_type);

	if (isBEPNMHostOK) {
		//
		var need_filter = false;
		if (message.tab_url) {
			if (message.tab_url.length > 1023) {
				need_filter = true;
			}
		}
		if (!need_filter) {
			bepNMHost.postMessage(message);
		}
	} else {
		//
	}
}

function onBEPGetHostResMsgCheckURL(res) {

	bcLog("onBEPGetHostResMsgCheckURL scanresult : " + res.scan_result + " need_show : " + res.need_show_alert_page + " tabid : " + res.tab_id);

	var need_show_alert_page = res.need_show_alert_page;
	if (need_show_alert_page) {
		var alert_page_content;
		try {
			alert_page_content = bepDecryptMsg(res.alert_page_content);
		} catch (err) {
			alert_page_content = res.alert_page_content;
		}
		
		alartpage="data:text/html;charset=utf-8," + alert_page_content;
		chrome.tabs.update(res.tab_id, {url: alartpage});

	} else {
		setTimeout(function() {
			timerGetJPSURLsByDom(res.tab_url, res.tab_id, 0);
		}, 300);
	}
	//
	sendBEPNativeMessage({
		"msg_type": BEP_B2H_MSG_DOC_COMPLETE,
		"tab_url": res.tab_url
	});
}

function onBEPGetHostResMsgReadConfig(res) {
	bcLog("onBEPGetHostResMsgReadConfig " + res);
	bepConfig.enable = res.is_bep_enable;
	bepConfig.enableContributionFeedback = res.is_cb_fb_enable;
	bepConfig.ttlContributionFeedback = res.ttl_cb_fb;
	bepConfig.enableConsoleLog = res.is_enable_console_log;
	bcSetLogEnable(bepConfig.enableConsoleLog);
}


function onBEPGetHostResMsgHandleContinueBrowse(res) {

}

function bepDecryptMsg(message) {

	//console.log("bepDecryptMsg raw : " + message);

	var hex_bytes = [];
	for (var index = 0; index < message.length - 1; index += 2) {
		hex_bytes.push(parseInt(message.substr(index, 2), 16));
	}
	var inflate = new Zlib.Inflate(hex_bytes);
	var inflate_content = inflate.decompress();
	//to string
	var out_string = "";
	for (var i = 0; i < inflate_content.byteLength; i++) {
		out_string += String.fromCharCode(inflate_content[i])
	}

	// console.log("bepDecryptMsg : out_string : " + out_string);
	bcLog("DecrptyMsg Over.");

	return out_string;
}

function onBEPGetHostResGetAlertPageContent(res) {

	bcLog("onBEPGetHostResGetAlertPageContent");

	//console.log("alert page content : " + res.alert_page_content);
	var alert_page_content = bepDecryptMsg(res.alert_page_content);
	//console.log("decrtpt :" + alert_page_content);
	bcLog("alert page tab id : " + res.tab_id);

	chrome.tabs.sendMessage(res.tab_id, {
		"msg_type": BEP_B2C_MSG_SHOW_ALERT_PAGE,
		"url": res.url,
		"alert_page_content": alert_page_content
	}, function(res) {
		bcLog(chrome.runtime.lastError)
	});
}


function onBEPGetHostResCheckJPSURLs(res) {
	bcLog("onBEPGetHostResCheckJPSURLs");
	//
	var has_checked_count = res.check_count;

	if (res.need_show_alert_page) {

		var alert_page_content;
		try {
			alert_page_content = bepDecryptMsg(res.alert_page_content);
		} catch (err) {
			alert_page_content = res.alert_page_content;
		}

		chrome.tabs.sendMessage(res.tab_id, {
			"msg_type": BEP_B2C_MSG_SHOW_ALERT_PAGE,
			"tab_url": res.tab_url,
			"alert_page_content": alert_page_content
		}, function(res) {
			bcLog(chrome.runtime.lastError)
		});
	} else {
		//
		bcLog("Not Malicious Go On Checking... ");
		if (res.check_count < 10) {
			setTimeout(function() {
				timerGetJPSURLsByDom(res.tab_url, res.tab_id, res.check_count);
			}, 300);
		}
	}

}


function onBEPNativeMessage(message) {

	var msg = message;
	bcLog("onBEPNativeMessage : " + msg.msg_type);

	if (msg.msg_type == BEP_HOST_MSG_RES_HB) {
		onBEPGetHostResMsgHB(msg);
	} else if (msg.msg_type == BEP_B2H_RES_MSG_CHECK_URL) {
		onBEPGetHostResMsgCheckURL(msg);
	} else if (msg.msg_type == BEP_B2H_RES_MSG_HANDLE_CONTINUE_BROWSING) {
		onBEPGetHostResMsgHandleContinueBrowse(msg);
	} else if (msg.msg_type == BEP_B2H_RES_MSG_GET_ALERT_PAGE_CONTENT) {
		onBEPGetHostResGetAlertPageContent(msg);
	} else if (msg.msg_type == BEP_B2H_RES_MSG_CHECK_JPS_URLS) {
		onBEPGetHostResCheckJPSURLs(msg);
	} else if (msg.msg_type == BEP_B2H_RES_MSG_READ_CONFIG) {
		onBEPGetHostResMsgReadConfig(msg);
	}
}



//----------------------------------------------------------------------------------------------------
//
function timerGetJPSURLsByDom(windowURL, tabId, checkCount) {
	bcLog("timerGetJPSURLsByDom" + "winurl : " + windowURL + " tabId : " + tabId + " checkCount " + checkCount);
	if (checkCount < 10) {
		chrome.tabs.sendMessage(
			tabId, {
				"msg_type": BEP_B2C_MSG_GET_JPS_URLS_BY_DOM,
				"tab_id": tabId,
				"check_count": checkCount,
				"tab_url": windowURL
			},
			function(response) {});
	}
}

function timerCheckContributionFeedback(checkCount) {

	bcLog("timerCheckContributionFeedback, check count: " + checkCount);

	if (checkCount >= 5) {
		return;
	}

	chrome.tabs.query({
		active: true,
		currentWindow: true
	}, function(tabs) {
		if (tabs == undefined || tabs.length == 0) {
			return;
		}

		var firstTab = tabs[0];
		if (firstTab == undefined) {
			return;
		}

		var tabURL = tabs[0].url;
		if (tabURL == undefined || tabURL.indexOf("New Tab") == 0) {
			checkCount += 1;
			setTimeout(function() {
				timerCheckContributionFeedback(checkCount);
			}, bepConfig.ttlContributionFeedback);
		}


		var tabTitle = tabs[0].title;
		if (tabURL.indexOf("chrome") == 0) {
			return;
		}

		/* fix chrome gdb alert page no http:// */
		var urlSchemaPos = tabURL.indexOf("://");
		if (urlSchemaPos == -1) {
			return;
		}
		var urlWithoutSchema = tabURL.substring(urlSchemaPos + 3);
		if (tabTitle.indexOf(urlWithoutSchema)) {
			checkCount += 1;
			setTimeout(function() {
				timerCheckContributionFeedback(checkCount);
			}, bepConfig.ttlContributionFeedback);
		}
		//
		sendBEPNativeMessage({
			"msg_type": BEP_B2H_MSG_CHECK_CONTRIBUTION_FB,
			"tab_id": tabs[0].tabId,
			"tab_title": tabTitle,
			"tab_url": tabURL
		});
	});
}

/* http://developer.chrome.com/extensions/webNavigation.html#event-onBeforeNavigate */
function onBEPWebNavBeforeNavigate(details) {
	//
	bcLog("[WebNav][BeforeNavigate] " + details.url + " " + details.title + " " + details.tabId);


	if (!bepConfig.enable) {
		return;
	}
	//
	if (!details.url.startsWith("http://") && !details.url.startsWith("https://")) {
		return;
	}
	//
	if (bepConfig.enableContributionFeedback) {
		setTimeout(function() {
			timerCheckContributionFeedback(0);
		}, bepConfig.ttlContributionFeedback);
	}
	//
	sendBEPNativeMessage({
		"msg_type": BEP_B2H_MSG_DOC_START,
		"tab_id": details.tabId,
		"tab_title": details.title,
		"tab_url": details.url
	});

	return;
}

function onBEPWebNavCommitted(details) {
	bcLog("[WebNav][NavCommitted] " + details.url + " " + details.title + " " + details.tabId);

	if (!bepConfig.enable) {
		return;
	}
	//
	if (!details.url.startsWith("http://") && !details.url.startsWith("https://")) {
		return;
	}

	chrome.tabs.sendMessage(details.tabId, {
		"msg_type": BEP_B2C_MSG_GET_HTML_CONTENT
	}, function(res) {});
	
}

function onBEPWebNavDOMContentLoaded(details) {
	bcLog("[WebNav][DOMContentLoaded] " + details.url + " " + details.title + " " + details.tabId);

	if (!bepConfig.enable) {
		return;
	}
	//
	if (!details.url.startsWith("http://") && !details.url.startsWith("https://")) {
		return;
	}

	chrome.webNavigation.getAllFrames({
		"tabId": details.tabId
	}, function(frame_details) {
		var frameInfos = [];
		if(!frame_details) {
			return;
		}
		for (var index = 0; index < frame_details.length; index++) {
			var detailItem = frame_details[index];
			var frameInfo = {
				"frame_url": detailItem.url,
				"frame_id": detailItem.frameId,
				"parent_frame_id": detailItem.parentFrameId
			}
			frameInfos.push(frameInfo);
		}
		sendBEPNativeMessage({
			"msg_type": BEP_B2H_MSG_UPDATE_FRAME_URL_INFO,
			"frame_url_infos": frameInfos
		});

		bcLog(JSON.stringify(frameInfos));
	});

	chrome.tabs.sendMessage(details.tabId, {
		"msg_type": BEP_B2C_MSG_GET_HTML_CONTENT
	}, function(res) {});
}

function onBEPWebNavCompleted(details) {
	bcLog("[WebNav][NavCompeleted] " + details.url + " " + details.title + " " + details.tabId);

	if (!bepConfig.enable) {
		return;
	}

	if (details == null || details.tabId == -1) {
		bcLog("invalid tab");
		return;
	}

	if (!details.url.startsWith("http://") && !details.url.startsWith("https://")) {
		return;
	}

	chrome.tabs.sendMessage(details.tabId, {
		"msg_type": BEP_B2C_MSG_GET_HTML_CONTENT
	}, function(res) {});



	/* get java chain */
	chrome.tabs.sendMessage(details.tabId, {
		"msg_type": BEP_B2C_MSG_GET_JAVA_CHAIN,
		"url": details.url
	}, function(res) {});
	//
	var tabTitle = details.title | "";


	sendBEPNativeMessage({
		"msg_type": BEP_B2H_MSG_CHECK_URL,
		"tab_id": details.tabId,
		"tab_title": tabTitle,
		"tab_url": details.url,
		"is_check_sal": true
	});

	/*
	sendBEPNativeMessage({"msg_type":BEP_B2H_MSG_DOC_COMPLETE,
    		"tab_id": details.tabId, "tab_url": details.url});
	*/
}

chrome.webNavigation.onBeforeNavigate.addListener(onBEPWebNavBeforeNavigate);
chrome.webNavigation.onCommitted.addListener(onBEPWebNavCommitted);
chrome.webNavigation.onDOMContentLoaded.addListener(onBEPWebNavDOMContentLoaded);
chrome.webNavigation.onCompleted.addListener(onBEPWebNavCompleted);


function onBEPWebRequestBeforeRequest(details) {
	bcLog("onBEPWebRequestBeforeRequest " + details.url);
	if (bepConBrowse.isBEPConBrowseURL(details.url)) {
		var orginURL = bepConBrowse.getOrginURL(details.url);
		if (orginURL.length != 0) {
			bcLog("will nav to new url : " + orginURL);
			//
			sendBEPNativeMessage({
				"msg_type": BEP_B2H_MSG_HANDLE_CONTINUE_BROWSING,
				"url": orginURL
			});

			return {
				"cancel": false
			};
		}
	}

}
chrome.webRequest.onBeforeRequest.addListener(onBEPWebRequestBeforeRequest, {
	urls: ["<all_urls>"]
}, ["blocking"]);


function onBEPWebRequestErrorOccurred(details) {
	bcLog("onBEPWebRequestErrorOccurred ");
	bcLog("url : " + details.url + " error : " + details.error);

	if (!bepConfig.enable) {
		return;
	}

	if (details == null || details.tabId == -1) {
		bcLog("invalid tab");
		return;
	}

	if (!details.url.startsWith("http://") && !details.url.startsWith("https://")) {
		return;
	}

	/*
	if (-1 != details.url.indexOf(".pdf") || -1 != details.url.indexOf(".swf")) {
        console.log('It is swf/pdf just return.');
        return;
    }*/

	var tabTitle = "";

	sendBEPNativeMessage({
		"msg_type": BEP_B2H_MSG_CHECK_URL,
		"tab_id": details.tabId,
		"tab_title": tabTitle,
		"tab_url": details.url,
		"is_check_sal": true
	});
}

chrome.webRequest.onErrorOccurred.addListener(onBEPWebRequestErrorOccurred, {
	urls: ["<all_urls>"]
});



function onBEPGetCSResMsgGetJavaChain(msg) {
	if (msg.urls.length > 0 || msg.encode_contents.length > 0) {
		sendBEPNativeMessage({
			"msg_type": BEP_B2H_MSG_FIND_JAVA_URL_CHAIN,
			"encode_content": msg.encode_content,
			"window_url": msg.window_url,
			"urls": msg.urls,
			"url_chain": msg.url_chain
		});
	}
}

function onBEPGetCSResMsgGetJPSURLsByDOM(msg) {
	bcLog("onBEPGetCSResMsgGetJPSURLsByDOM  jps_urls : " + msg.jps_urls);

	if (msg.jps_urls.length == 0) {
		return;
	}

	sendBEPNativeMessage({
		"msg_type": BEP_B2H_MSG_CHECK_JPS_URLS,
		"tab_id": msg.tab_id,
		"tab_url": msg.tab_url,
		"jps_urls": msg.jps_urls,
		"url_chain": msg.url_chain,
		"html_content": msg.html_content,
		"check_count": msg.check_count,
		"top_url": msg.top_url,
		"referrer": msg.referrer
	});

}

function onBEPGetCSResMsgGetHtmlContent(msg) {
	bcLog("onBEPGetCSResMsgGetHtmlContent  url : " + msg.url);
	sendBEPNativeMessage({
		"msg_type": BEP_B2H_MSG_UPDATE_HTML_CONTENT,
		"url": msg.url,
		"html_content": msg.html_content
	});
}

function onBEPRuntimeGetContentScriptMessaage(message, sender, sendResponse) {
	if (message.msg_type == BEP_B2C_RES_MSG_GET_JAVA_CHAIN) {
		onBEPGetCSResMsgGetJavaChain(message);
	} else if (message.msg_type == BEP_B2C_RES_MSG_GET_JPS_URLS_BY_DOM) {
		onBEPGetCSResMsgGetJPSURLsByDOM(message);
	} else if (message.msg_type == BEP_B2C_RES_MSG_GET_HTML_CONTENT) {
		onBEPGetCSResMsgGetHtmlContent(message);
	}
}
chrome.runtime.onMessage.addListener(onBEPRuntimeGetContentScriptMessaage);


/*
chrome.webRequest.onBeforeRequest.addListener(
  callback, filter, opt_extraInfoSpec);
 */