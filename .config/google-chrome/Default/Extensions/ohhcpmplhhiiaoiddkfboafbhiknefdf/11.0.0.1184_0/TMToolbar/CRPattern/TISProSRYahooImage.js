var SS_Util=TrendMicro.TB.SAFESEARCHING;
function foundImageCallback(a){TMExt_debug(a);var b=TMExt_$(a.FindInsertNode()).parent(),c=b.find("a").eq(0),d=c.find("img").eq(0);b.attr("link_level",a.level);SS_Util.isNeedToBlock(a.level)?(TMExt_debug("==========================BLOCK THE ABOVE ONE==================================="),SS_Util.checkImageBlockPopupExist(),c.css("display","inline"),d.hide(),SS_Util.setBlockImage(b),SS_Util.bindMouseEnterEvent(b)):TMExt_debug("the image level is "+a.level+", no need to block (level 8 is parent control category)")}
var getParamFromURL_yahoo_fr=function(a,b){try{if("string"==typeof a&&0<a.length)for(var c=a.split("/"),d=0;d<c.length;d++){var e=c[d].split("=");if(e[0]==b)return e[1]}return null}catch(f){return null}};function getRealUrl(a){try{var b=SS_Util.getParamFromURL(a,"rurl")||getParamFromURL_yahoo_fr(a,"RU");return decodeURIComponent(b)}catch(c){return a}}
function TSSRParseResult_Image(a){var b=new CreateTSRLocatedObject(null,null,"a",null),b=new CreateTSRLocatedObject(null,b,"LI",null);a=new CreateTSRLocatedObject(a,b,"UL","sres");b.multiMatches=!0;b.appendAttribute("class","ld");if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++){var c=getRealUrl(a[b].href);c&&CreateTSRResultObject(a[b],c,null,null,null,null,foundImageCallback)}}
function foundImageCallbackBasic(a){TMExt_debug(a);var b=TMExt_$(a.FindInsertNode()).parent(),c=b.find("a").eq(0),d=c.find("img").eq(0);b.attr("link_level",a.level);SS_Util.isNeedToBlock(a.level)?(TMExt_debug("==========================BLOCK THE ABOVE ONE==================================="),SS_Util.checkImageBlockPopupExist(),c.css("display","inline"),d.hide(),SS_Util.setBlockImage(b),SS_Util.bindMouseEnterEvent(b)):TMExt_debug("the image level is "+a.level+", no need to block (level 8 is parent control category)")}
function getRealUrlBaic(a){try{var b=TMExt_$(a).parent().find("a").eq(0).find("img").eq(0).attr("rel"),c=b.substr(b.indexOf("**")+2),d=c.substr(c.indexOf("**")+2);return d.substr(0,d.indexOf("?"))}catch(e){return null}}
function TSSRParseResult_ImageBasic(a){var b=new CreateTSRLocatedObject(null,null,"a",null),b=new CreateTSRLocatedObject(null,b,"DIV",null);a=new CreateTSRLocatedObject(a,b,"DIV","gridlist");b.multiMatches=!0;b.appendAttribute("class","gridmodule");if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++){var c=getRealUrlBaic(a[b]);c&&CreateTSRResultObject(a[b],c,null,null,null,null,foundImageCallbackBasic)}}TSRTagFlowID();TMExt_debug("URL matched, start safe searching function");TMExt_$(window).resize(function(){SS_Util.refreshBlockImages()});
function TSRParse(){var a=g_oEnv.Parser.iResultNumber;TSSRParseResult_Image(document);TSSRParseResult_ImageBasic(document);TrendMicro.TB.ReduceNewNode(a+1);return g_oEnv.Parser.rgobjSearchResult};
