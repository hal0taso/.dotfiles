(function(){var a=window,b=a.TMExt_$;(function(){var c=b.toJSON(a.FullPSLocalization||a.PSLocalization);b("#PSL10NString").attr("value",c)})();a.GetPSL10NString=function(c){if(!a.jsonPSL10N){var d=b("#PSL10NString").attr("value");a.jsonPSL10N=b.parseJSON(d)}return"undefined"==typeof a.jsonPSL10N[c]?"undefined":a.jsonPSL10N[c]};a.GetPSL10NImage=function(a,b){return"locale/"+a+"/img/"+b}})();
