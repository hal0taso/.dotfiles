(function(){window.get_browserHelper=function(f){switch(f){case CHROME:return new l;case FIREFOX:return new m;case INTERNET_EXPLORER:return new n}return new g};var g=function(f){BaseScannerHelper.call(this);var e=this;this.openNewTabWithURL=function(b){SendRequestToBackground_Website(null,null,"login","ContentPage_Background",null,null,b,!0,!1)};this.open_help_link=function(b){SendRequestToBackground_openFaqPage("ALL",b);DCA_UTIL.lstHelpUsageInfo(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[e.Browser],b,1)};
this.alertMessageInTabContent_titaniumNotExist=function(){this.alertMessageInTabContent(this.ConstructAlertMessageInContent({title:this.LAUNCH_TI_FIRST}));DCA_UTIL.lstErrorPageUsageInfo(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[this.Browser],DCA_CONSTANTS.ERROR_ID.BROWSER_TITANIUM_NOT_EXIST,1)};this.alertMessageInTabContent_IEVersionLow=function(){var b=this;b.alertMessageInTabContent(b.ConstructAlertMessageInContent({title:GetPSL10NString("ERROR_IE_VERSION_TOO_LOW"),button_content:GetPSL10NString("ALERT_TRY_AGAIN_BUTTON"),
callback:function(){b.ForceScan()}}));DCA_UTIL.lstErrorPageUsageInfo(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[b.Browser],DCA_CONSTANTS.ERROR_ID.BROWSER_IE_VERSION_LOW,1)};this.alertMessageInTabContent_defaultError=function(){var b=this;b.alertMessageInTabContent(b.ConstructAlertMessageInContent_titleLink({title:{wording:b.DEFAULT_ERROR_TITLE,learnMore:b.DEFAULT_ERROR_LEARN_MORE,link_clickEvent:function(){b.open_help_link(DCA_CONSTANTS.HELP_ID.BPS_SOMETHING_WRONG)}},button_content:GetPSL10NString("ALERT_TRY_AGAIN_BUTTON"),
callback:function(){b.ForceScan()}}));DCA_UTIL.lstErrorPageUsageInfo(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[b.Browser],DCA_CONSTANTS.ERROR_ID.BROWSER_DEFAULT_ERROR,1)};this.alertMessageInTabContent_ChromeAccountLoggedIn=function(){var b=this;b.alertMessageInTabContent(b.ConstructAlertMessageInContent_titleLink({title:{wording:GetPSL10NString("ALERT_CHROME_ACCOUNT_LOGGED_IN_TITLE"),learnMore:GetPSL10NString("ALERT_CHROME_ACCOUNT_LOGGED_IN_LEARN_MORE"),link_clickEvent:function(){b.open_help_link(DCA_CONSTANTS.HELP_ID.GOOGLE_ACCOUNT_LOGGED_IN)}}}));
DCA_UTIL.lstErrorPageUsageInfo(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[b.Browser],DCA_CONSTANTS.ERROR_ID.BROWSER_CHROME_ACCOUNT_LOGGED_IN,1)};this.fixAllPopupClickEvent=function(){for(var b=[],a=e.contentDom.find(".overlay_quickFix_content_ul li:visible"),c=0;c<a.length;c++){var d=TMExt_$.parseJSON(a.eq(c).find(".Setting_display_none").text());b.push({Browser:e.Browser,id:d.ID,fix_to:d.Suggestion,FixRelatedData:d.FixRelatedData[d.Suggestion]})}e.removeMessageOverTabContent();e.alertMessageOverTabContent_loading();
e.UI_FixAllSetting(b)};this.alertMessageOverTabContent_confirmRestart=function(b,a,c){var d=this;c.restart?(c.title=d.RESTART_TITLE,c.button_do=GetPSL10NString("ALERT_RESTART_NOW"),c.button_cancel=GetPSL10NString("OVERLAY_CANCEL")):c.stop&&(c.title=d.STOP_TITLE,c.button_do=GetPSL10NString("ALERT_APPLY_CLOSE_BUTTON"),c.button_cancel=GetPSL10NString("OVERLAY_CANCEL"));d.alertMessageOverTabContent(ConstructAlertMessageOverContent({closeButton:!0,closeEvent:d.removeMessageOverTabContent,title:c.title,
buttons:[{title:c.button_do,callback:function(){d.removeMessageOverTabContent();d.alertMessageOverTabContent_loading();a(b)}},{title:c.button_cancel,callback:function(){d.removeMessageOverTabContent()}}]}))};this.alertMessageOverTabContent_confirmRestartLater=function(b){var a=this;a.alertMessageOverTabContent(ConstructAlertMessageOverContent({closeButton:!0,closeEvent:function(){a.ForceScan()},title:a.RESTART_LATER_OR_NOT_TITLE,buttons:[{title:a.RESTART_NOW_BUTTON,callback:function(){a.removeMessageOverTabContent();
a.alertMessageOverTabContent_loading();b()}},{title:a.RESTART_LATER_BUTTON,callback:function(){a.ForceScan()}}]}))};this.alertMessageOverTabContent_confirmShutdownLater=function(b){var a=this;a.alertMessageOverTabContent(ConstructAlertMessageOverContent({closeButton:!0,closeEvent:function(){a.ForceScan()},title:a.CLOSE_LATER_OR_NOT_TITLE,buttons:[{title:a.CLOSE_NOW_BUTTON,callback:function(){a.removeMessageOverTabContent();a.alertMessageOverTabContent_loading();b()}},{title:a.CLOSE_LATER_BUTTON,callback:function(){a.ForceScan()}}]}))};
this.isBrowsingRunning=function(b){var a=this,c={None:0,NotInstall:1,InstallNotRun:2,Running:3},d=null;TMExt_$.each(b.dataOut.ret_value,function(b,c){if(c.browser===a.Browser)return d=c,!1});return d&&d.status===c.Running?!0:!1};this.isFixingCurrentBrowser=function(){var b=this.Browser,a=null;PUtil.checkBrowser.IsIE()&&(a=INTERNET_EXPLORER);PUtil.checkBrowser.IsChrome()&&(a=CHROME);PUtil.checkBrowser.IsFirefox()&&(a=FIREFOX);return b===a};this.UI_FixAllSetting=function(b){var a=this;a.checkBrowserStatus(function(c){if(a.isBrowsingRunning(c))return a.fixWhenBrowserRunning(b);
a.removeMessageOverTabContent();a.alertMessageOverTabContent_loading();a.fix(b,null,function(){a.ForceScan()})})};this.ConstructSaveChangesWrapper=function(){var b=TMExt_$("<div/>",{"class":"changesMade_wrapper"});b.append(e.ConstructSaveChangesArea());return b};this.ConstructSaveChangesArea=function(){var b=TMExt_$("<div/>",{"class":"changesMade_area"}),a=TMExt_$("<div/>",{"class":"changesMade_area_hitArea"});a.css("marginTop","8px");a.append(TMExt_$("<span/>",{"class":"changesMade_area_changesMade_wording",
text:GetPSL10NString("SAVE_CHANGES_CHANGES_MADE")})).append(TMExt_$("<span/>",{"class":"changesMade_area_changesMade_number",text:"0"}));var c=TMExt_$("<button/>",{"class":"btn_silver changesMade_area_saveChanges",text:GetPSL10NString("SAVE_CHANGES_BUTTON_TITLE")});b.append(c).append(a);c.click(function(){ToolTipHelper.HideTooltip();e.alertMessageOverTabContent_loading();for(var b=e.contentDom.find(".privacy_item_content"),a=[],c=0;c<b.length;c++){var h=TMExt_$.parseJSON(b.eq(c).find(".Setting_display_none").text()),
k=b.eq(c).find(".current_setting_display_none").text();h.Current!=k&&a.push({Browser:e.Browser,id:h.ID,fix_to:k,FixRelatedData:h.FixRelatedData[k]})}e.UI_FixAllSetting(a)});return b};this.ConstructContentFromResponse=function(b){var a=this,c=TMExt_$('<div class="scan_result_main"/>'),d=TMExt_$("<div/>",{text:JSON.stringify(b),style:"display:none"});c.append(d);b=b.dataOut.ret_value;d=GetHowManyConcerns(b);b=a.FilterListByCategory(b);if(0==d)return b=a.ConstructHaveNoConcerns(),c.append(b),c;d=a.ConstructFixAllArea(d,
function(){a.alertMessageOverTabContent_fixAll();DCA_UTIL.lstLocalPageUsageInfo.nFixAllTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[a.Browser],1)});this.contentDom.find(".fix_all_area_wrapper").append(d);d=a.ConstructSaveChangesWrapper();c.append(d);b=a.ConstructCategory(b);c.append(b);b=a.ConstructShareAfterScan();c.append(b);return c};this.ConstructUser=function(b){b=TMExt_$("<div/>",{"class":"user_area"});var a=TMExt_$("<div/>",{"class":"div_user"}),c=TMExt_$("<div/>",{"class":"div_head_image_area"}),
d=TMExt_$("<div/>",{"class":"div_head_image "+this.headerLogo});c.append(d);d=TMExt_$("<div/>",{"class":"fix_all_area_wrapper fix_all_area_wrapper_browser"});c=TMExt_$("<div/>",{"class":"div_head"}).append(c).append(d);a.append(c);b.append(a);return b};this.ForceScan=function(){var b=this,a=b.get_tabContent_Loading(),c=b.get_tabContent_Content();c.hide();a.show();ReUpdateUI_Layout();c.empty();var d=TMExt_$("<div/>",{"class":"scanResultArea"});c.append(d);b.UpdateNumberOfConcerns();b.scan(function(a){c.hide();
var p=b.ConstructUser();d.append(p);d.append(b.ConstructContentFromResponse(a));b.showContent();DCA_UTIL.lstLocalPageUsageInfo.nScanTimes(DCA_CONSTANTS.WEBSITE_OR_BROWSER_ID[b.Browser],1)})};this.WrapScanResult=function(b){var a=PUtil.cloneObj(b),c=a.dataOut,d=PUtil.cloneObj(b);0===d.dataOut.ret_status?(d.dataOut.ret_value=[],TMExt_$.each(c.ret_value,function(b,c){var e={Category:c.category,Current:c.currentvalue,Desc:GetPSL10NString(c.id+"_DESC"),ID:c.id,PossibleValue:function(){var b={};TMExt_$.each(c.possiblevalue,
function(a,c){b[a]=GetPSL10NString(c.pvindex+"_POSSIBLEVALUE")});return b}(),Risk:c.riskvalue,Suggestion:c.suggestvalue,Title:GetPSL10NString(c.id+"_TITLE"),Browser:a.dataIn.browser,possibleFixValue:c.possiblefixvalue,FixRelatedData:function(){var b={};TMExt_$.each(c.possiblevalue,function(a,c){b[a]=c.pvdata});return b}()};d.dataOut.ret_value.push(e)})):d.dataOut.ret_value=[];return d};this.scan=function(b,a){var c=this;SendRequestToBackground_Browser({success:function(a){a=c.WrapScanResult(a);switch(a.dataOut.ret_status){case BPS_RETURN_CODE.OK:return b(a);
case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:return c.alertMessageInTabContent_titaniumNotExist();case BPS_RETURN_CODE.IE_VERSION_LOW:return c.alertMessageInTabContent_IEVersionLow();case BPS_RETURN_CODE.CHROME_ACCOUNT_LOGGED_IN:return c.alertMessageInTabContent_ChromeAccountLoggedIn();default:return PSDebug.error("error code: "+a.dataOut.ret_status),c.alertMessageInTabContent_defaultError()}},error:a,browser:c.Browser,action:"scan",params:[]})};this.fix=function(b,a,c,d){var e=this,f=[];TMExt_$.each(b,
function(b,a){f.push({id:a.id,value:a.FixRelatedData})});SendRequestToBackground_Browser({success:function(b){switch(b.dataOut.ret_status){case BPS_RETURN_CODE.OK:return c(b);case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:return e.alertMessageInTabContent_titaniumNotExist();default:return PSDebug.error("error code: "+b.dataOut.ret_status),e.alertMessageInTabContent_defaultError()}},error:d,browser:e.Browser,action:"fix",postaction:a||"",params:f})};this.checkBrowserStatus=function(b,a){SendRequestToBackground_Browser({success:function(a){switch(a.dataOut.ret_status){case BPS_RETURN_CODE.OK:return b(a);
case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:return e.alertMessageInTabContent_titaniumNotExist();default:return PSDebug.error("error code: "+a.dataOut.ret_status),e.alertMessageInTabContent_defaultError()}},error:a,browser:"ALL_BROWSERS",action:"checkstatus",params:[]})};this.restart=function(b,a){var c=this;SendRequestToBackground_Browser({success:function(a){switch(a.dataOut.ret_status){case BPS_RETURN_CODE.OK:return b(a);case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:return c.alertMessageInTabContent_titaniumNotExist();
default:return PSDebug.error("error code: "+a.dataOut.ret_status),c.alertMessageInTabContent_defaultError()}},error:a,browser:c.Browser,action:"restart",params:[]})};this.shutdown=function(b,a){var c=this;SendRequestToBackground_Browser({success:function(a){switch(a.dataOut.ret_status){case BPS_RETURN_CODE.OK:return b(a);case BPS_RETURN_CODE.TITANIUM_NOT_EXIST:return c.alertMessageInTabContent_titaniumNotExist();default:return PSDebug.error("error code: "+a.dataOut.ret_status),c.alertMessageInTabContent_defaultError()}},
error:a,browser:c.Browser,action:"shutdown",params:[]})};this.fixWhenBrowserRunning=function(b){return!0};this.fixWhenBrowserRunning_restartFirst=function(b){var a=this,c={restart:!1,stop:!1};a.isFixingCurrentBrowser()?c.restart=!0:c.stop=!0;return a.alertMessageOverTabContent_confirmRestart(b,function(){c.restart?a.fix(b,"restart",function(){a.ForceScan()}):c.stop&&a.fix(b,null,function(){a.ForceScan()})},c)};this.fixWhenBrowserRunning_fixFirst=function(b){var a=this;a.fix(b,null,function(){a.isFixingCurrentBrowser()?
a.alertMessageOverTabContent_confirmRestartLater(function(){a.restart(function(){a.ForceScan()})}):a.alertMessageOverTabContent_confirmShutdownLater(function(){a.shutdown(function(){a.ForceScan()})})})};this.RESTART_NOW_BUTTON=GetPSL10NString("ALERT_RESTART_NOW");this.RESTART_LATER_BUTTON=GetPSL10NString("ALERT_RESTART_LATER");this.CLOSE_NOW_BUTTON=GetPSL10NString("ALERT_CLOSE_NOW");this.CLOSE_LATER_BUTTON=GetPSL10NString("ALERT_CLOSE_LATER");this.getDangerousSettingList=function(b){b=b.dataOut.ret_value;
for(var a=[],c=0;c<b.length;c++){var d=b[c],e=null;TMExt_$.each(d.Risk,function(a,b){if(-1!==TMExt_$.inArray(b,d.possibleFixValue))return e=b,!1});null!==e&&a.push({Browser:this.Browser,id:d.ID,fix_to:e,FixRelatedData:d.FixRelatedData[e]})}return a};this.resetAllSettingToDangerous=function(){var b=this;b.scan(function(a){a=b.getDangerousSettingList(a);b.UI_FixAllSetting(a)})};this.DEFAULT_ERROR_TITLE=GetPSL10NString("ERROR_DEFAULT_TITLE");this.DEFAULT_ERROR_LEARN_MORE=GetPSL10NString("ERROR_DEFAULT_LEARN_MORE");
this.SHARE_TITLE=GetPSL10NString("SHARE_TOOTHERS_BROWSER_TITLE")},l=function(){g.call(this);this.Browser=CHROME;this.tabDom=TMExt_$("#tabs_chrome");this.contentDom=TMExt_$("#tabsContent_chrome");this.RESTART_TITLE=GetPSL10NString("CHROME_RESTART_TITLE");this.STOP_TITLE=GetPSL10NString("CHROME_STOP_TITLE");this.RESTART_LATER_OR_NOT_TITLE=GetPSL10NString("RESTART_CHROME_LATER_OR_NOT_TITLE");this.CLOSE_LATER_OR_NOT_TITLE=GetPSL10NString("CLOSE_CHROME_LATER_OR_NOT_TITLE");this.LAUNCH_TI_FIRST=GetPSL10NString("ERROR_CHROME_LAUNCH_TI_FIRST");
this.fixWhenBrowserRunning=function(f){this.fixWhenBrowserRunning_restartFirst(f)};this.alertLogoClassName="alert_logo_CHROME";this.headerLogo="header_logo_CHROME"},m=function(){g.call(this);this.Browser=FIREFOX;this.tabDom=TMExt_$("#tabs_firefox");this.contentDom=TMExt_$("#tabsContent_firefox");this.RESTART_TITLE=GetPSL10NString("FIREFOX_RESTART_TITLE");this.STOP_TITLE=GetPSL10NString("FIREFOX_STOP_TITLE");this.RESTART_LATER_OR_NOT_TITLE=GetPSL10NString("RESTART_FIREFOX_LATER_OR_NOT_TITLE");this.CLOSE_LATER_OR_NOT_TITLE=
GetPSL10NString("CLOSE_FIREFOX_LATER_OR_NOT_TITLE");this.LAUNCH_TI_FIRST=GetPSL10NString("ERROR_FIREFOX_LAUNCH_TI_FIRST");this.fixWhenBrowserRunning=function(f){this.fixWhenBrowserRunning_restartFirst(f)};this.alertLogoClassName="alert_logo_FIREFOX";this.headerLogo="header_logo_FIREFOX"},n=function(){g.call(this);this.Browser=INTERNET_EXPLORER;this.tabDom=TMExt_$("#tabs_internet_explorer");this.contentDom=TMExt_$("#tabsContent_internet_explorer");this.RESTART_TITLE=GetPSL10NString("INTERNET_EXPLORER_RESTART_TITLE");
this.STOP_TITLE=GetPSL10NString("INTERNET_EXPLORER_STOP_TITLE");this.RESTART_LATER_OR_NOT_TITLE=GetPSL10NString("RESTART_IE_LATER_OR_NOT_TITLE");this.CLOSE_LATER_OR_NOT_TITLE=GetPSL10NString("CLOSE_IE_LATER_OR_NOT_TITLE");this.LAUNCH_TI_FIRST=GetPSL10NString("ERROR_IE_LAUNCH_TI_FIRST");this.fixWhenBrowserRunning=function(f){this.fixWhenBrowserRunning_fixFirst(f)};this.alertLogoClassName="alert_logo_INTERNET_EXPLORER";this.headerLogo="header_logo_INTERNET_EXPLORER"}})();
