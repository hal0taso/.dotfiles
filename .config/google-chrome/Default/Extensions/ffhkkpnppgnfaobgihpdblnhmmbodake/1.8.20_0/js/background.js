﻿function runAppStart() {
	var n = localStorage.uaSettings,
		t = localStorage.uaStorage;
	settings = n != undefined ? JSON.parse(n) : JSON_Settings;
	userAgents = t != undefined ? JSON.parse(t) : JSON_UserAgentsList;
	settings.Remember == "1" && (selectedUserAgent.Id = settings.LastUsed_Id, selectedUserAgent.Name = settings.LastUsed_Name, selectedUserAgent.UserAgent = settings.LastUsed_UserAgent);
	localStorage.uaSettings = JSON.stringify(settings);
	localStorage.uaStorage = JSON.stringify(userAgents);
	createContextMenu()
}

function createContextMenu() {
	chrome.contextMenus.removeAll();
	chrome.contextMenus.create({
		id: "Default",
		contexts: ["all"],
		onclick: function() {
			setUserAgent("Default", !0, "ContextMenu")
		},
		title: "Default",
		type: "checkbox",
		checked: selectedUserAgent.Id == "Default"
	});
	chrome.contextMenus.create({
		contexts: ["all"],
		type: "separator"
	});
	userAgents.forEach(function(n) {
		if (n.UserAgents.length != 0) var t = chrome.contextMenus.create({
				id: n.Id,
				contexts: ["all"],
				title: n.Name,
				type: "normal"
			}),
			i = n.UserAgents.forEach(function(i) {
				chrome.contextMenus.create({
					id: i.Id,
					parentId: n.Id,
					contexts: ["all"],
					onclick: function() {
						setUserAgent(i.Id, !0, "ContextMenu")
					},
					title: i.Name,
					type: "checkbox",
					checked: selectedUserAgent.Id == i.Id
				});
				selectedUserAgent.Id == i.Id && chrome.contextMenus.update(t, {
					contexts: ["all"],
					title: "[ " + n.Name + " ]",
					type: "normal"
				})
			})
	});
	chrome.contextMenus.create({
		contexts: ["all"],
		type: "separator"
	});
	chrome.contextMenus.create({
		contexts: ["all"],
		onclick: function() {
			return chrome.tabs.create({
				url: "options.html"
			}), !1
		},
		title: "Options",
		type: "normal"
	});
	chrome.contextMenus.create({
		contexts: ["all"],
		onclick: function() {
			return chrome.tabs.create({
				url: "http://www.esolutions.se/whatsmyinfo"
			}), !1
		},
		title: "Show User-agent",
		type: "normal"
	})
}

function setUserAgent(n, t, i, r) {
	for (var f, u = 0; u < userAgents.length; u++)
		for (userAgents[u].Id == n && (selectedUserAgent.Id = userAgents[u].Id, selectedUserAgent.Name = userAgents[u].Name, selectedUserAgent.UserAgent = userAgents[u].UserAgent), f = 0; f < userAgents[u].UserAgents.length; f++) userAgents[u].UserAgents[f].Id == n && (selectedUserAgent.Id = userAgents[u].UserAgents[f].Id, selectedUserAgent.Name = userAgents[u].UserAgents[f].Name, selectedUserAgent.UserAgent = userAgents[u].UserAgents[f].UserAgent);
	settings.LastUsed_Id = selectedUserAgent.Id;
	settings.LastUsed_Name = selectedUserAgent.Name;
	settings.LastUsed_UserAgent = selectedUserAgent.UserAgent;
	localStorage.uaSettings = JSON.stringify(settings);
	createContextMenu();
	setIconAndText();
	t == !0 && chrome.tabs.reload();
	r && typeof r == "function" && r()
}

function setIconAndText() {
	selectedUserAgent.UserAgent != "" ? (chrome.browserAction.setIcon({
		path: "img/active.png"
	}), chrome.browserAction.setBadgeText({
		text: "On"
	})) : (chrome.browserAction.setIcon({
		path: "img/icon19.png"
	}), chrome.browserAction.setBadgeText({
		text: ""
	}))
}
var selectedUserAgent = JSON_DefaultUserAgent,
	userAgents = JSON_UserAgentsList,
	settings = JSON_Settings;
handler = function(n) {
	if (selectedUserAgent.UserAgent != "") {
		for (var t = 0, i = n.requestHeaders.length; t < i; ++t)
			if (n.requestHeaders[t].name === "User-Agent") {
				n.requestHeaders[t].value = selectedUserAgent.UserAgent;
				break
			}
		return {
			requestHeaders: n.requestHeaders
		}
	}
};
chrome.webRequest.onBeforeSendHeaders.addListener(handler, {
	urls: ["<all_urls>"]
}, ["blocking", "requestHeaders"]);
chrome.runtime.onMessage.addListener(function(n, t, i) {
	i({
		userAgent: selectedUserAgent.UserAgent
	})
});
runAppStart();
setIconAndText();