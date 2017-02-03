var SS_Util=TrendMicro.TB.SAFESEARCHING;function getRealUrl(a){try{return decodeURIComponent(SS_Util.getParamFromURL(a,"imgrefurl"))}catch(b){return a}}function getRealUrlBasic(a){try{var b=SS_Util.getParamFromURL(a,"url")||SS_Util.getParamFromURL(a,"q");return decodeURIComponent(b)}catch(c){return a}}var isResizeCallbackReged=!1;
function foundImageCallback(a){isResizeCallbackReged||(TMExt_$(window).resize(function(){SS_Util.refreshBlockImages(function(a){var b=a.find("img").eq(0);a.removeAttr("class");a.css("display","inline-block");a.css("height","100%");a.css("text-decoration","none");a.css("width","100%");b.css("visibility","hidden")})}),isResizeCallbackReged=!0);TMExt_debug(a);var b=TMExt_$(a.FindInsertNode()).parent().find("a").eq(0),c=b.find("img").eq(0);b.attr("link_level",a.level);SS_Util.isNeedToBlock(a.level)?(TMExt_debug("==========================BLOCK THE ABOVE ONE==================================="),
SS_Util.checkImageBlockPopupExist(),b.removeAttr("class"),b.css("display","inline-block"),b.css("height","100%"),b.css("text-decoration","none"),b.css("width","100%"),c.css("visibility","hidden"),SS_Util.setBlockImage(b),SS_Util.bindMouseEnterEvent(b)):TMExt_debug("the image level is "+a.level+", no need to block (level 8 is parent control category)")}
function TSSRParseResult_Image(a){var b=new CreateTSRLocatedObject(null,null,"a",null),b=new CreateTSRLocatedObject(null,b,"DIV",null);a=new CreateTSRLocatedObject(a,b,"DIV","rg_s");b.multiMatches=!0;b.appendAttribute("class","rg_di");if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++){var c=getRealUrl(a[b].href);c&&CreateTSRResultObject(a[b],c,null,null,null,null,foundImageCallback,isImageNeedReRating)}}
function isImageNeedReRating(a){TMExt_debug("isImageNeedReRating");TMExt_debug(a);var b=TMExt_$(a.FindInsertNode());if(!SS_Util.isNeedToBlock(a.level))return TMExt_debug("the image level is "+a.level+", no need to re-evalute (level 8 is parent control category)"),!1;a=b.css("background-image");if("undefined"==typeof a)return TMExt_debug("No css background-image"),!0;TMExt_debug("bgimg="+a);if(0<=a.indexOf("img_image_block"))return!1;TMExt_debug("No img_image_block");return!0}
function isImageNeedReRatingBasic(a){TMExt_debug("isImageNeedReRating");TMExt_debug(a);var b=TMExt_$(a.FindInsertNode()).parent();if(!SS_Util.isNeedToBlock(a.level))return TMExt_debug("the image level is "+a.level+", no need to re-evalute (level 8 is parent control category)"),!1;a=b.css("background-image");if("undefined"==typeof a)return TMExt_debug("No css background-image"),!0;TMExt_debug("bgimg="+a);if(0<=a.indexOf("img_image_block"))return!1;TMExt_debug("No img_image_block");return!0}
var TIMEOUT_WAITING_GET_WIDTH_HEIGHT=500;
function foundImageCallbackBasic(a){function b(){c.attr("link_level",a.level);SS_Util.isNeedToBlock(a.level)?(TMExt_debug("==========================BLOCK THE ABOVE ONE==================================="),SS_Util.checkImageBlockPopupExist(),e.css("visibility","hidden"),SS_Util.setBlockImage(c),c.css("border","0px"),c.empty(),c.append(d),SS_Util.bindMouseEnterEvent(c)):TMExt_debug("the image level is "+a.level+", no need to block (level 8 is parent control category)")}TMExt_debug(a);var c=TMExt_$(a.FindInsertNode()).parent(),
d=c.find("a").eq(0),e=d.find("img").eq(0);0===c.width()||0===c.height()?setTimeout(b,TIMEOUT_WAITING_GET_WIDTH_HEIGHT):b()}
function TSSRParseResult_Image_Basic(a){var b=new CreateTSRLocatedObject(null,null,"a",null);a=new CreateTSRLocatedObject(a,b,"TABLE",null);a.appendAttribute("class","images_table");if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++){var c=getRealUrlBasic(a[b].href);c&&CreateTSRResultObject(a[b],c,null,null,null,null,foundImageCallbackBasic,isImageNeedReRatingBasic)}}TSRTagFlowID();TMExt_debug("URL matched, start safe searching function");
function TSRParse(){var a=g_oEnv.Parser.iResultNumber;TSSRParseResult_Image(document);TSSRParseResult_Image_Basic(document);TrendMicro.TB.ReduceImageNewNode(a+1);return g_oEnv.Parser.rgobjSearchResult};
