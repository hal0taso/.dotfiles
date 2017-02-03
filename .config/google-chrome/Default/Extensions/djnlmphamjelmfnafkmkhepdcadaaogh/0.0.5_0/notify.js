Deferred.define(this);
var http = Deferred.http;

Hatena = {};
Hatena.Notify = {};
Hatena.Notify.API = {
    pull : function () {
       return this.withCookieDomain().next(function (tld) {
           console.log('cookie domain:' + tld);
           return http.get('https://www.hatena.' + tld + '/notify/api/pull?via=chromeextension&format=i&lang=' + window.navigator.language).next(function (r) { return JSON.parse(r.responseText) });
       });
    },

    read : function () {
       localStorage['lastNotified'] = new Date().getTime();
       return this.withCookieDomain().next(function (tld) {
           console.log('cookie domain:' + tld);
           return http.post('https://www.hatena.' + tld + '/notify/api/read?via=chromeextension').next(function (r) { return JSON.parse(r.responseText) });
       });
    },

    getRk : function (tld) {
        if (!tld) tld = 'ne.jp';
        var ret = new Deferred();
        chrome.cookies.get(
            {
                url : "http://www.hatena." + tld + "/",
                name: "rk",
            },
            function (cookie) {
                ret.call(cookie ? cookie.value : null);
            }
        );
        return ret;
    },

    withCookieDomain : function ()  {
        return Hatena.Notify.API.getRk("ne.jp").next(function (cookie) {
            if (cookie) {
                return "ne.jp";
            } else {
                return Hatena.Notify.API.getRk("com").next(function (cookie) {
                    if (cookie) {
                        return "com";
                    } else {
                        throw "fail to get rk";
                    }
                })
            }
        })
    }
};

Hatena.Notify.updateBadge = function (data) {
    var lastSeen = data.last_seen || 0;
    var unread = data.notices.filter(function (i) { return i.modified > lastSeen }).length;
    chrome.browserAction.setBadgeText({ text: (unread > 0) ? String(unread) : "" });
    chrome.browserAction.setBadgeBackgroundColor({ color: [244, 177, 40, 200] });
};

function hloc (msgid) {
    var args = Array.prototype.slice.call(arguments, 1);
    var text = args.length ? chrome.i18n.getMessage(msgid, args) : chrome.i18n.getMessage(msgid);

    var scripts = document.getElementsByTagName('script');
    var ref = scripts[scripts.length-1];
    ref.parentNode.replaceChild(document.createTextNode(text), ref);
}

Hatena.Notify['background'] = function () {
    loop(Infinity, function () {
        return Hatena.Notify.API.pull().
        next(function (data) {
            Hatena.Notify.updateBadge(data);
            var lastNotified = +localStorage['lastNotified'];
            if (lastNotified) {
                var notices = data.notices.filter(function (i) { return +i.modified * 1000 > lastNotified });
                if (notices.length) {
                    var notification = webkitNotifications.createHTMLNotification('notification.html');
                    notification.show();

                    Hatena.Notify.notification = notices;

                    setTimeout(function () {
                        notification.cancel();
                    }, 15 * 1000);
                }
            }
            localStorage['lastNotified'] = new Date().getTime();
            return wait(30);
        }).
        error(function (e) {
            console.log(e);
            return wait(30);
        });
    });

    chrome.extension.onRequest.addListener(function (req, sender, callback) {
        if (req.action == 'tld') {
            Hatena.Notify.API.withCookieDomain().
            next(function (tld) {
                callback({ tld : tld });
            }).
            error(function (e) {
                callback({ error : e });
            });
        }
    });
};

Hatena.Notify['popup'] = function () {
    var parent = document.body;
    Hatena.Notify.updateBadge({ notices: [] });
    var loading = document.getElementById('loading');
    loading.parentNode.removeChild(loading);

    chrome.extension.sendRequest({'action' : 'tld'}, function (data) {
        var tld = data.tld;
        if (tld) {
            var iframe = document.createElement('iframe');
            iframe.src = "https://www.hatena." + tld + "/notify/notices.iframe?via=chromeextension&lang=" + window.navigator.language;
            document.body.appendChild(iframe);
        } else {
            var logincontainter = document.getElementById('logincontainer');
            logincontainer.style.display='block';
            // i18n
            var elems = document.getElementsByClassName("locale");
            for(var i = 0; i < elems.length; i++){
                classes = elems[i].className.split(" ");
                var string = chrome.i18n.getMessage(classes[1]);
                if(string){
                    elems[i].innerHTML = chrome.i18n.getMessage(classes[1]);
                }
            }
            // make 'a' tags enable
            elems = document.getElementsByTagName("a");
            for(var i = 0; i < elems.length; i++){
              elems[i].onclick = function(e){
                chrome.tabs.create({url: this.getAttribute('href')});
                return false;
              };
            }            
        }
    });
};

Hatena.Notify['notification'] = function () {
    chrome.extension.sendRequest({'action' : 'tld'}, function (data) {
        var tld = data.tld;

        var notices = chrome.extension.getBackgroundPage().Hatena.Notify.notification;
        var parent = document.getElementById('window-star');
        for (var i = 0, it; (it = notices[i]); i++) {
            var icon    = it.icon;
            var content = it.content;
            var li = document.createElement('li');
            li.className = 'highlight';
            var a = document.createElement('a');
            a.href = it.subject;
            a.target = '_blank';
            li.appendChild(a);
            var img = document.createElement('img');
            img.src = it.icon;
            img.className = 'profile-image';
            a.appendChild(img);

            var container = document.createElement('div');
            container.className = 'notify-container';
            li.appendChild(container);

            var body = document.createElement('div');
            body.className = 'notify-body';

            for (var j = 0, len = content.length; j < len; j++) {
                var o = content[j];
                if (o.type == 'user') {
                    a = document.createElement('a');
                    a.href = 'http://profile.hatena.' + tld  + '/' + o.name + '/';
                    a.target = '_blank';
                    a.appendChild(document.createTextNode(o.name));
                    body.appendChild(a);
                } else
                if (o.type == 'guest') {
                    body.appendChild(document.createTextNode(o.name));
                } else
                if (o.type == 'link') {
                    a = document.createElement('a');
                    a.href = o.href;
                    a.target = '_blank';
                    a.appendChild(document.createTextNode(o.text));
                    body.appendChild(a);
                } else
                if (o.type == 'star') {
                    img = document.createElement('img');
                    img.src = "http://s.hatena." + tld + "/images/star" + (o.color == 'yellow' ? '' : '-' + o.color) + '.gif';
                    img.className = 'star';
                    img.alt = '☆';
                    body.appendChild(img);
                } else {
                    body.appendChild(document.createTextNode(o));
                }
            }

            container.appendChild(body);
            parent.appendChild(li);
        }
        delete chrome.extension.getBackgroundPage().Hatena.Notify.notification;
    });
};

window.onload = function () {
    var title = document.title;
    try {
        Hatena.Notify[title]();
    } catch (e) { 
        //alert(e)
        console.log(e);
    }
};
