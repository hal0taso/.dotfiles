var I18n={messages:null,init:function(){I18n.messages=I18n.readMessages()},buildMessages:function(){var b="\n";$("*[i18n-content]").each(function(d,a){b+='"'+a.getAttribute("i18n-content")+'": { "message": "'+a.innerHTML.replace(/[ \r\n\t]+/g," ")+'" },\n'});$("*[i18n-values]").each(function(d,a){$(a.getAttribute("i18n-values").split(";")).each(function(d,l){var k=l.split(":");2==k.length&&"."!=k[0].charAt(0)&&(b+='"'+k[1]+'": { "message": "'+a.getAttribute(k[0]).replace(/[\r\n]/g,"\\n")+'" },\n')})});
return b},readMessages:function(b){var d=void 0!=b,a=null,c=new XMLHttpRequest;c.open("GET",chrome.extension.getURL("_locales/en/messages.json"),d);c.onreadystatechange=function(){this.readyState==XMLHttpRequest.DONE&&(a=this.responseText,a=JSON.parse(a.replace(/[\r\n\t]+/g," ")),d&&b(a))};c.send();return a},getMessage:function(b,d){var a=chrome.i18n.getMessage(b,d);if(void 0==a||0==a.length){var c=I18n.messages[b];void 0!=c&&(a=c.message,void 0!=a&&(a=a.replace("$1",d)))}return a},process:function(b){return I18nTemplate.process(b)}};
I18n.init();
var I18nTemplate=function(){function b(b){b=b.querySelectorAll(l);for(var c,m=0;c=b[m];m++)for(var g=0;g<a.length;g++){var f=a[g],e=c.getAttribute(f);if(null!=e)d[f](c,e)}}var d={"i18n-content":function(a,b){a.innerHTML=I18n.getMessage(b)},"i18n-values":function(a,c){for(var d=c.replace(/\s/g,"").split(/;/),g=0;g<d.length;g++){var f=d[g].match(/^([^:]+):(.+)$/);if(f){var e=f[1],f=I18n.getMessage(f[2]);if("."==e.charAt(0)){for(var e=e.slice(1).split("."),h=a;h&&1<e.length;)h=h[e.shift()];h&&(h[e]=
f,"innerHTML"==e&&b(a))}else a.setAttribute(e,f)}}}},a=[],c;for(c in d)a.push(c);var l="["+a.join("],[")+"]";return{process:b}}();
