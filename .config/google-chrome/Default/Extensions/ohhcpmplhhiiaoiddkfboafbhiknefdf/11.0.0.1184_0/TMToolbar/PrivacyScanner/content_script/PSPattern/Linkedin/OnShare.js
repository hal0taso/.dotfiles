(function(){var a=window.TMExt_$;a(document).ready(function(){var d=GetWording(),e=function(b,c,a){b[0]&&(b.attr("placeholder",a),b.text(a));c[0]&&(c[0].textContent=a)};(function(){var b=a("textarea#share-text"),c=a("#share-dialog-entity-highlighter");0!=b.length&&0!=c.length?(e(b,c,d),b.click(function(){a(this).unbind();e(b,c,d)})):setTimeout(arguments.callee,1E3)})()})})();
