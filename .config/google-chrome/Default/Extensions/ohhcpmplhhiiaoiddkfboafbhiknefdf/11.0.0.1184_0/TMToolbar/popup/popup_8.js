function init(){var f=function(){var a="null";try{var b=navigator.userAgent.toLowerCase(),d=b.indexOf("chrome"),c=b.substring(d),d=c.indexOf(" safari"),c=c.substring(7,d),b=[],b=c.split("."),a=b[0]+"."+b[1]+"."+b[2]+"."+b[3]}catch(g){}return a};TMExt_$("#menu").append('<div id="pagerating" name="pagerating" class="item checked" title="_not_localized" i18n-values="title:pagerating">          <div class="icon"></div>                                                                                                         <span i18n-content="pagerating">_not_localized</span>                                                                          </div>                                                                                                                             <div id="umsrating" name="umsrating" class="item checked" title="_not_localized" i18n-values="title:umsrating">            <div class="icon"></div>                                                                                                         <span i18n-content="umsrating">_not_localized</span>                                                                           </div>                                                                                                                             <div class="separator"></div>                                                                                                    <div id="facebookscanner" name="facebookscanner" class="item" title="_not_localized" i18n-values="title:facebookscanner">  <div class="icon"></div>                                                                                                         <span i18n-content="facebookscanner">_not_localized</span>                                                                     </div>                                                                                                                             <div id="setting" name="setting" class="item" title="_not_localized" i18n-values="title:Setting">                          <div class="icon"></div>                                                                                                         <span i18n-content="setting">_not_localized</span>                                                                             </div>                                                                                                                             <div id="help" name="help" class="item" title="_not_localized" i18n-values="title:help">                                   <div class="icon"></div>                                                                                                         <span i18n-content="help">_not_localized</span>                                                                                </div>                                                                                                                             ');
var e=function(a){var b=function(){I18n.process(document);a.Settings.EnableRating?TMExt_$("#pagerating").addClass("checked"):TMExt_$("#pagerating").removeClass("checked");a.Settings.EnableManualRating?TMExt_$("#umsrating").addClass("checked"):TMExt_$("#umsrating").removeClass("checked");a.Settings.WTPEnable?(TMExt_$("#pagerating").removeClass("disabled").click(function(){a.getPluginTB().SetEnableRatingStatus(!a.Settings.EnableRating);window.close();return!0}),TMExt_$("#umsrating").removeClass("disabled").click(function(){a.getPluginTB().SetEnableManualRatingStatus(!a.Settings.EnableManualRating);
window.close();return!0})):(TMExt_$("#pagerating").addClass("disabled"),TMExt_$("#umsrating").addClass("disabled"));a.Settings.EnableFBScannerFeatureSKU?a.Settings.WTPEnable&&a.Settings.EnableFBScanner?TMExt_$("#facebookscanner").removeClass("disabled").click(function(){var b=f(),c=a.Settings.BrowserStatus;url=chrome.extension.getURL("TMToolbar\\PrivacyScanner\\local_page\\index.html?locale="+getCurrentLocale()+"&browser_id=0&browser_version="+b+"&from=TI8,BROWSER_TOOLBAR&status="+c);chrome.tabs.query({},
function(b){var c=!1,d;for(d in b){var e=b[d];/local_page\/index.html/i.test(e.url)&&(chrome.tabs.update(e.id,{active:!0}),c=!0)}c||(a.getPluginTB().SendPSUsageInfoData(4),chrome.tabs.create({url:url}));window.close()});return!0}):TMExt_$("#facebookscanner").addClass("disabled"):TMExt_$("#facebookscanner").remove();TMExt_$("#setting").click(function(){a.getPluginTB().OpenSetting();window.close();return!0});TMExt_$("#help").click(function(){a.getPluginTB().OpenHelp();window.close();return!0});document.body.style.visibility=
"visible"};setTimeout(function(){void 0===a.GlobalExtensionProxy.isTiInstalled()?setTimeout(arguments.callee,CONST_WAIT_BACKGROUND_TIME_OUT):b()},0)};"undefined"!=typeof chrome.extension&&"undefined"!=typeof chrome.extension.getBackgroundPage?(console.log("chrome.extension.getBackgroundPage get called"),bgPages=chrome.extension.getBackgroundPage(),e(bgPages)):"undefined"!=typeof chrome.runtime&&"undefined"!=typeof chrome.runtime.getBackgroundPage?(console.log(" chrome.runtime.getBackgroundPage get called"),
chrome.runtime.getBackgroundPage(e)):console.log("Toolbar, ERROR cannot get background page")}TMExt_$(document).ready(function(){init()});
