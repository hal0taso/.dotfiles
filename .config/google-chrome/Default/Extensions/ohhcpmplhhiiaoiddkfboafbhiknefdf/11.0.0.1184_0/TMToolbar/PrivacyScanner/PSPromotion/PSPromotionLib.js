(function(){window.PSPromotionResourcePath=null;window.PSPromotionProductName=null;window.PSPromotionIsAskLaterChecked=null;window.PSPromotionCheckPrivacyCallback=null;window.PSPromotionLearnMoreCallback=null;window.PSPromotionSetAskLater=null;window.initPSPromotionResource=function(a){PSPromotionResourcePath=a.ResourcePath;PSPromotionProductName=a.ProductName;PSPromotionIsAskLaterChecked=a.IsAskLaterChecked;PSPromotionCheckPrivacyCallback=a.CheckPrivacyCallback;PSPromotionLearnMoreCallback=a.LearnMoreCallback;
PSPromotionSetAskLater=a.SetAskLater};window.SetIEPSPromotionResourcePath_ProductName=function(a,d){window.PSPromotionResourcePath=a;window.PSPromotionProductName=d};var m={FACEBOOK:0,TWITTER:0,GOOGLEPLUS:0,LINKEDIN:0};window.SetIEPSPromotionIsAskLaterChecked=function(a,d,n,c){m.FACEBOOK=a;m.TWITTER=d;m.GOOGLEPLUS=n;m.LINKEDIN=c};var p=null;window.SetIEPSPromotionLearnMoreURL=function(a){p=a};window.get_siteInjectHelper=function(a){switch(a){case "FACEBOOK":return new q;case "TWITTER":return new r;
case "GOOGLEPLUS":return new s;case "LINKEDIN":return new t}return new f};window.PS_FLAG=function(){var a=!1,d=!1,n;n=window.EnableAutoScan?window.EnableAutoScan:!0;return{isScanning:function(){return a},setScanning:function(c){a=c},isSetToNotScanAgain:function(){return d},setNotScanAgain:function(c){d=c},isAutoScanEnabled:n}}();var f=function(a){var d=this;this.getCurrentWebsite=function(){return-1!=window.location.host.indexOf("facebook.com")?"FACEBOOK":-1!=window.location.host.indexOf("twitter.com")?
"TWITTER":-1!=window.location.host.indexOf("plus.google.com")?"GOOGLEPLUS":-1!=window.location.host.indexOf("linkedin.com")?"LINKEDIN":null};this.CheckAndInject=function(a){var c=this;if(c.isAlreadyHaveDialog())return!1;if(!PS_FLAG.isAutoScanEnabled)return c.injectPromotionDialog({hasScanResult:!1}),!1;if(!c.isAutoScanEnabled)return PSDebug.log("show promotion dialog"),c.injectPromotionDialog({hasScanResult:!1}),!1;if(PS_FLAG.isSetToNotScanAgain()||PS_FLAG.isScanning())return!1;PS_FLAG.setScanning(!0);
c.startScanning(function(b){a()?(PSDebug.log("show promotion dialog"),c.injectPromotionDialog({hasScanResult:!0,result:{count:b}}),PS_FLAG.setScanning(!1)):PSDebug.log("catch block promotion dialog, as page changed")},function(b){PSDebug.log("do not show promotion dialog, and set to not auto scan again");PS_FLAG.setScanning(!1);PS_FLAG.setNotScanAgain(!0)})};this.injectPromotionDialog=function(a){var c=this.findNodeToInject();0<c.length&&("GOOGLEPLUS"==this.Website?this.ConstructPromotion(a).insertBefore(c.eq(0)):
c.eq(0).prepend(this.ConstructPromotion(a)))};this.ConstructPromotion=function(a){var c=TMExt_$("<div/>",{id:d.UniqueID()});c.append(this.ConstructContentWrapper(a));return c};this.getNumConcernsFromList=function(a){for(var c=0,b=0;b<a.length;b++)-1!=a[b].Risk.indexOf(a[b].Current)&&(a[b].appIDs?c+=a[b].appIDs.length:c++);return c};this.getNumConcerns=function(a){return this.getNumConcernsFromList(a[this.ScanResponse].Response)};this.startScanning=function(a,c){var b=this;this.scan(function(d){PSDebug.log("Get scan result:");
PSDebug.log(d);d=b.getNumConcerns(d);PSDebug.log("concern counts: "+d);return 0<d?a(d):c(d)})};this.isAlreadyHaveDialog=function(){return 0<TMExt_$("#"+d.UniqueID()).length};this.clickClose=function(){d.closePromotionUI()};this.userNotLogedIn=function(){return!1};this.ConstructContentWrapper=function(a){var c=a.hasScanResult?g_oPrivacyScannerString_autoScan:g_oPrivacyScannerString,b=this,d=TMExt_$("<div/>",{"class":"TM_PS_Wrapper "+b.WrapClassName}),f=TMExt_$("<div/>",{"class":"TM_PS_Wrapper_headerArea"}),
g=TMExt_$("<div/>",{"class":"TM_PS_Wrapper_headerAreaRight"});g.css("background-image","url("+PSPromotionResourcePath+"ic_privacy_scanner.png)").css("backgroundPosition","0px 0px");f.append(g);d.append(f);g=TMExt_$("<div/>",{"class":"title",text:PSPromotionProductName});f.append(g);var k=TMExt_$("<div/>",{"class":"close"});k.css("background-image","url("+PSPromotionResourcePath+"icon_close.png)").css("backgroundPosition","0px 0px");k.hover(function(){k.css("backgroundPosition","0px 60px")},function(){k.css("backgroundPosition",
"0px 0px")});k.mousedown(function(){k.css("backgroundPosition","0px 40px")});k.click(b.clickClose);d.append(k);g=TMExt_$("<div/>",{"class":"worryTitle",text:function(){if(a.hasScanResult){var d="",d=1==a.result.count?c.WelcomeString.Head.OneConcern:c.WelcomeString.Head.SeveralConcern;return d=d.replace("%d",a.result.count)}return c.WelcomeString.Head[b.Website]}()});f.append(g);var g=TMExt_$,h;h=a.hasScanResult?c.WelcomeString.Content[b.Website]:c.WelcomeString.Content;g=g("<div/>",{"class":"worryRecommend",
text:h});h=TMExt_$("<span/>",{"class":"learnMore",text:c.WelcomeString.LearnMore});h.click(function(){window.PSPromotionLearnMoreCallback?window.PSPromotionLearnMoreCallback(b.Website):window.open(p)});g.append(h);f.append(g);var f=TMExt_$("<div/>",{"class":"TM_footer"}),e=TMExt_$("<button/>",{"class":this.class_button_checkMyPrivacy()+" checkMyPrivacy",text:c.ScanButtonText});e.css("background","linear-gradient(#"+b.CheckMyPrivacy_background_color_start+", #"+b.CheckMyPrivacy_background_color_end+
")");e.css("filter","progid:DXImageTransform.Microsoft.gradient(startColorstr='#"+b.CheckMyPrivacy_background_color_start+"', endColorstr='#"+b.CheckMyPrivacy_background_color_end+"')");e.css("background","-webkit-gradient(linear, 0 0, 0 100%, from(#"+b.CheckMyPrivacy_background_color_start+"), to(#"+b.CheckMyPrivacy_background_color_end+"))");e.css("background","-moz-linear-gradient(top,  #"+b.CheckMyPrivacy_background_color_start+",  #"+b.CheckMyPrivacy_background_color_end+")");e.on("mouseenter",
function(){e.css("background","linear-gradient(#"+b.CheckMyPrivacy_background_color_hover_start+", #"+b.CheckMyPrivacy_background_color_hover_end+")");e.css("filter","progid:DXImageTransform.Microsoft.gradient(startColorstr='#"+b.CheckMyPrivacy_background_color_hover_start+"', endColorstr='#"+b.CheckMyPrivacy_background_color_hover_end+"')");e.css("background","-webkit-gradient(linear, 0 0, 0 100%, from(#"+b.CheckMyPrivacy_background_color_hover_start+"), to(#"+b.CheckMyPrivacy_background_color_hover_end+
"))");e.css("background","-moz-linear-gradient(top,  #"+b.CheckMyPrivacy_background_color_hover_start+",  #"+b.CheckMyPrivacy_background_color_hover_end+")")});e.on("mouseleave",function(){e.css("background","linear-gradient(#"+b.CheckMyPrivacy_background_color_start+", #"+b.CheckMyPrivacy_background_color_end+")");e.css("filter","progid:DXImageTransform.Microsoft.gradient(startColorstr='#"+b.CheckMyPrivacy_background_color_start+"', endColorstr='#"+b.CheckMyPrivacy_background_color_end+"')");e.css("background",
"-webkit-gradient(linear, 0 0, 0 100%, from(#"+b.CheckMyPrivacy_background_color_start+"), to(#"+b.CheckMyPrivacy_background_color_end+"))");e.css("background","-moz-linear-gradient(top,  #"+b.CheckMyPrivacy_background_color_start+",  #"+b.CheckMyPrivacy_background_color_end+")")});e.on("mousedown",function(){e.css("background","linear-gradient(#"+b.CheckMyPrivacy_background_color_active_start+", #"+b.CheckMyPrivacy_background_color_active_end+")");e.css("filter","progid:DXImageTransform.Microsoft.gradient(startColorstr='#"+
b.CheckMyPrivacy_background_color_active_start+"', endColorstr='#"+b.CheckMyPrivacy_background_color_active_end+"')");e.css("background","-webkit-gradient(linear, 0 0, 0 100%, from(#"+b.CheckMyPrivacy_background_color_active_start+"), to(#"+b.CheckMyPrivacy_background_color_active_end+"))");e.css("background","-moz-linear-gradient(top,  #"+b.CheckMyPrivacy_background_color_active_start+",  #"+b.CheckMyPrivacy_background_color_active_end+")")});e.click(function(){var a=b.Website;window.PSPromotionCheckPrivacyCallback?
window.PSPromotionCheckPrivacyCallback(a):window.external.ToolbarInvoke({Action:14,HTMLDocument:document,Website:a})});var g=TMExt_$("<div/>",{"class":"askLater_area"}),l=TMExt_$("<div/>",{"class":"askLater_area_input_checked"});l.css("background-image","url("+PSPromotionResourcePath+"ic_checkbox.png)");g.click(function(){l.hasClass("askLater_area_input_checked")?(l.removeClass("askLater_area_input_checked"),l.addClass("askLater_area_input_notChecked")):(l.removeClass("askLater_area_input_notChecked"),
l.addClass("askLater_area_input_checked"));var a=b.Website,c=l.hasClass("askLater_area_input_checked");window.PSPromotionSetAskLater?window.PSPromotionSetAskLater(a,c):window.external.ToolbarInvoke({Action:6,HTMLDocument:document,Website:a,Value:c})});h=TMExt_$("<div/>",{"class":"askLater_area_wording",text:c.WelcomeString.AskLater});g.append(l).append(h);h=TMExt_$("<div/>",{"class":"logo"});h.css("background-image","url("+PSPromotionResourcePath+"TM_logo.png)");f.append(e).append(g).append(h);d.append(f);
return d}},q=function(){f.call(this);this.Website="FACEBOOK";this.isAutoScanEnabled=!0;this.ScanSingleResponse="FPScanSingleResponse";this.ScanResponse="FPScanResponse";this.getNumConcerns=function(a){var d=[];a=a[this.ScanResponse].Response;TMExt_$.each(a.AppsAndWebsites.Items,function(a,c){d.push(c)});TMExt_$.each(a.PrivacySetting.Items,function(a,c){d.push(c)});TMExt_$.each(a.TimeLineAndTagging.Items,function(a,c){d.push(c)});return this.getNumConcernsFromList(d)};this.scan=function(a){(new FacebookPScanner).scan(a)};
this.UniqueID=function(){return this.isInNormalFacebookPage()?"TM_PS_FACEBOOK":"TM_PS_NEW_FACEBOOK"};this.isInNormalFacebookPage=function(){return 0<TMExt_$("#contentArea").length?!0:!1};this.findNodeToInject=function(){return this.isInNormalFacebookPage()?TMExt_$("#contentArea"):TMExt_$('[role="main"]')};this.isInMainPage=function(){return 0!=TMExt_$("#pagelet_megaphone").length?!0:!1};this.class_button_checkMyPrivacy=function(){return this.isInNormalFacebookPage()?"TM_PS_btn_facebook":"TM_PS_btn_new_facebook"};
this.closePromotionUI=function(){this.isInNormalFacebookPage()?TMExt_$("#TM_PS_FACEBOOK").hide():TMExt_$("#TM_PS_NEW_FACEBOOK").hide()};this.CheckMyPrivacy_background_color_start="4f68a7";this.CheckMyPrivacy_background_color_end="3d589e";this.CheckMyPrivacy_background_color_hover_end=this.CheckMyPrivacy_background_color_hover_start="4f68a7";this.CheckMyPrivacy_background_color_active_end=this.CheckMyPrivacy_background_color_active_start="3d589e";this.WrapClassName="TM_PS_Wrapper_facebook"};q.prototype=
new f;var r=function(){f.call(this);this.Website="TWITTER";this.isAutoScanEnabled=!0;this.ScanSingleResponse="TPScanSingleResponse";this.ScanResponse="TPScanResponse";this.scan=function(a){(new TwitterPScanner).scan(a)};this.UniqueID=function(){return"TM_PS_TWITTER"};this.findNodeToInject=function(){return TMExt_$('div[class~="content-main"]')};this.isInMainPage=function(){return"/"==location.pathname?!0:!1};this.class_button_checkMyPrivacy=function(){return"TM_PS_btn_twitter"};this.closePromotionUI=
function(){TMExt_$("#TM_PS_TWITTER").hide()};this.CheckMyPrivacy_background_color_start="5baaf4";this.CheckMyPrivacy_background_color_end="57a1e8";this.CheckMyPrivacy_background_color_hover_end=this.CheckMyPrivacy_background_color_hover_start="5baaf4";this.CheckMyPrivacy_background_color_active_end=this.CheckMyPrivacy_background_color_active_start="57a1e8";this.WrapClassName="TM_PS_Wrapper_twitter"};r.prototype=new f;var s=function(){f.call(this);this.Website="GOOGLEPLUS";this.isAutoScanEnabled=!1;
this.ScanSingleResponse="GPPScanSingleResponse";this.ScanResponse="GPPScanResponse";this.UniqueID=function(){return"TM_PS_GOOGLEPLUS"};this.findNodeToInject=function(){return TMExt_$('div[id^="update-"]').eq(0)};this.isInMainPage=function(){return"/"==location.pathname||"/u/0/"==location.pathname?!0:!1};this.class_button_checkMyPrivacy=function(){return"TM_PS_btn_googlePlus"};this.closePromotionUI=function(){TMExt_$("#TM_PS_GOOGLEPLUS").hide()};this.CheckMyPrivacy_background_color_start="518dff";
this.CheckMyPrivacy_background_color_end="3977f0";this.CheckMyPrivacy_background_color_hover_end=this.CheckMyPrivacy_background_color_hover_start="518dff";this.CheckMyPrivacy_background_color_active_end=this.CheckMyPrivacy_background_color_active_start="3977f0";this.WrapClassName="TM_PS_Wrapper_googlePlus"};s.prototype=new f;var t=function(){f.call(this);this.Website="LINKEDIN";this.isAutoScanEnabled=!1;this.ScanSingleResponse="LIPScanSingleResponse";this.ScanResponse="LIPScanResponse";this.scan=
function(a){(new LinkedinPScanner).scan(a)};this.UniqueID=function(){return"TM_PS_LINKEDIN"};this.findNodeToInject=function(){return TMExt_$("#content")};this.isInMainPage=function(){return"/hp/"==location.pathname||"/"==location.pathname||"/home"==location.pathname||"/nhome/"==location.pathname?!0:!1};this.userNotLogedIn=function(){return 0!==TMExt_$("#signin").length?!0:!1};this.class_button_checkMyPrivacy=function(){return"TM_PS_btn_linkedin"};this.closePromotionUI=function(){TMExt_$("#TM_PS_LINKEDIN").hide()};
this.CheckMyPrivacy_background_color_start="f5e500";this.CheckMyPrivacy_background_color_end="f7ca00";this.CheckMyPrivacy_background_color_hover_end=this.CheckMyPrivacy_background_color_hover_start="f5e500";this.CheckMyPrivacy_background_color_active_end=this.CheckMyPrivacy_background_color_active_start="f7ca00";this.WrapClassName="TM_PS_Wrapper_linkedin"};t.prototype=new f;window.doPromotion=function(){var a=get_siteInjectHelper().getCurrentWebsite();if(a){var d=get_siteInjectHelper(a);d.isInMainPage()&&
!d.userNotLogedIn()&&(a=window.PSPromotionIsAskLaterChecked?window.PSPromotionIsAskLaterChecked(a):0!=m[a],a&&d.CheckAndInject(d.isInMainPage))}}})();
