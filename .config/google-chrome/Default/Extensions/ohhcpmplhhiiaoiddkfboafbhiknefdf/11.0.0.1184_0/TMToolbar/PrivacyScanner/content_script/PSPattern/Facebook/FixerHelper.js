(function(){var l=[{ID:20,FixRelated:{type:"privacy_update",id:"0",valueSet:[300645083384735,291667064279714,286958161406148],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",render:22}},{ID:22,FixRelated:{type:"privacy_update",id:"8787820733",valueSet:[300645083384735,0xfa7f99ddd7a5,291667064279714],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",
render:11}},{ID:23,FixRelated:{type:"privacy_update",id:"8787815733",valueSet:[300645083384735,0xfa7f99ddd7a5,291667064279714],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",render:11}},{ID:24,FixRelated:{type:"public_search",valueSet:[0,1],url:"/ajax/settings_page/search_filters.php"}},{ID:31,FixRelated:{type:"timelineReview",valueSet:[1,0],url:"/ajax/settings/timeline/review.php"}},
{ID:33,FixRelated:{type:"privacy_update",id:"8787530733",valueSet:[300645083384735,0xfa7f99ddd7a5,291667064279714,286958161406148],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",render:11}},{ID:34,FixRelated:{type:"privacy_update",id:"8787370733",valueSet:[300645083384735,0xfa7f99ddd7a5,291667064279714,286958161406148],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",
render:11}},{ID:35,FixRelated:{type:"taggingReview",valueSet:[1,0],url:"/ajax/settings/tagging/review.php"}},{ID:36,FixRelated:{type:"tagSuggestion",valueSet:[1,0],url:"/ajax/settings/tagging/suggestions.php"}},{ID:81,FixRelated:{type:"friends_share",valueSet:[0],url:"/settings/applications/platform_friends_share/submit/"}},{ID:82,FixRelated:{type:"instant_connect",id:"8787530733",valueSet:[0,1],url:"/ajax/settings_page/instant_connect.php"}},{ID:83,FixRelated:{type:"simple_save",id:"8787700733",
valueSet:[80,50,40,10],url:"/ajax/privacy/simple_save.php"}},{ID:84,FixRelated:{type:"edit_application",app_id:1,valueSet:[80,50,40,10],url:"/settings/applications/edit_app_settings/submit",url2:"/ajax/settings/apps/delete_app.php"}}],e=function(){this.PROTOCOL_DOMAIN=PUtil.checkPage.IsFacebook()?window.location.protocol+"//"+window.location.host:"https://www.facebook.com";this.Constants=l};e.prototype.logHeaderSendData="[Facebook Fix -> send data]";e.prototype.logHeaderHandleResponseData="[Facebook Fix -> handle response data]";
e.prototype.getSendData=function(a,c,b,d,f,m){for(var g={type:"POST",data:null,dataType:"html",url:null},k=0;k<this.Constants.length;k++)if(this.Constants[k].ID==a){var h=this.Constants[k].FixRelated;break}g.url=this.PROTOCOL_DOMAIN;g.url+=h.url;switch(h.type){case "simple_save":g.data=this.postSimpleSave(a,c,h,b,d);break;case "privacy_update":this.postPrivacyUpdate(a,c,h,b,d,g);break;case "timelineReview":g.data=this.postTimeLineReview(a,c,h,b,d);break;case "taggingReview":g.data=this.postTaggingReview(a,
c,h,b,d);break;case "tagSuggestion":g.data=this.postSuggestionReview(a,c,h,b,d);break;case "public_search":g.data=this.postPublicSearch(a,c,h,b,d);break;case "instant_connect":g.data=this.postInstantConnect(a,c,h,b,d);break;case "friends_share":g.data=this.postFriendsShare(a,c,h,b,d);break;case "edit_application":m?(PSDebug.log("Trying Delete Application, appID: ",f),g.url=this.PROTOCOL_DOMAIN,g.url+=h.url2,g.data=this.postDeleteApplication(a,c,h,b,f,d)):(PSDebug.log("Trying Edit Application, appID: ",
f),g.data=this.postEditApplication(a,c,h,b,f,d))}(new SendDataLogger(e.logHeaderSendData+" : "+a,g)).getLog();return g};e.prototype.handleResponse=function(a,c,b){(new ResponseHandlerLogger(e.logHeaderHandleResponseData+", ID : "+a+", value : "+c,b)).getLog();var d=PUtil.cloneObj(FacebookFixResultsTemplate);d.id=a;d.value=c;d.data=b;return d};e.prototype.getValidFixValueByID=function(a){for(var c=0;c<this.Constants.length;c++)if(this.Constants[c].ID==a)return FacebookScanResultsTemplate[c].possibleFixValue};
e.prototype.isValidFixValue=function(a,c){for(var b=this.getValidFixValueByID(a),d=0;d<b.length;d++)if(c==b[d])return!0;return!1};e.prototype.getQueryString=function(a){var c,b="";for(c in a)b+="&",b+=c,b+="=",b+=a[c];return encodeURI(b).substr(1)};e.prototype.getTtstamp=function(a){if(!a)return"";for(var c="",b="",d=0;d<a.length;d++)c+=a.charCodeAt(d),b="2"+c;return b};e.prototype.postPrivacyUpdate=function(a,c,b,d,f,e){a={__a:"1",__user:d,fb_dtsg:f,__req:"a",ttstamp:this.getTtstamp(f),__rev:1747572};
e.data=a;e.url=b.url+"&privacy_fbid="+b.id+"&post_param="+b.valueSet[c]+"&render_location="+b.render};e.prototype.postSimpleSave=function(a,c,b,d,f){a={__a:"1",__user:d,fb_dtsg:f,id:b.id,source:"privacy_settings_page"};d={};d[b.id]={value:b.valueSet[c]};a.audience_json=JSON.stringify(d);a.ttstamp=this.getTtstamp(a,f);return a};e.prototype.postTimeLineReview=function(a,c,b,d,f){a={__a:"1",__user:d,tag_approval_enabled:b.valueSet[c],fb_dtsg:f};a.ttstamp=this.getTtstamp(a,f);return a};e.prototype.postTaggingReview=
function(a,c,b,d,f){a={__a:"1",__user:d,tag_review_enabled:b.valueSet[c],fb_dtsg:f};a.ttstamp=this.getTtstamp(a,f);return a};e.prototype.postSuggestionReview=function(a,c,b,d,f){a={__a:"1",__user:d,tag_suggestion_enabled:b.valueSet[c],fb_dtsg:f};a.ttstamp=this.getTtstamp(a,f);return a};e.prototype.postPublicSearch=function(a,c,b,d,f){a={__a:"1",__user:d,el:"search_filter_public",fb_dtsg:f,"public":b.valueSet[c],__req:"1"};a.ttstamp=this.getTtstamp(a,f);return a};e.prototype.postInstantConnect=function(a,
c,b,d,f){a={__a:"1",__user:d,el:"instant_personalization_checkbox",fb_dtsg:f,opt_in:b.valueSet[c],__req:"1"};a.ttstamp=this.getTtstamp(a,f);return a};e.prototype.postFriendsShare=function(a,c,b,d,f){a={__a:"1",__user:d,fb_dtsg:f,__req:"3"};a.ttstamp=this.getTtstamp(a,f);return a};e.prototype.postEditApplication=function(a,c,b,d,f,e){a={__a:"1",__user:d,app_id:f,fb_dtsg:e,"audience[0][value]":b.valueSet[c],removed_read_scopes:"",removed_write_scopes:"",notification:0};a.ttstamp=this.getTtstamp(a,e);
return a};e.prototype.postDeleteApplication=function(a,c,b,d,f,e){a={__a:"1",__user:d,app_id:f,fb_dtsg:e,legacy:!1,dialog:!0,confirmed:!0,ban_user:0};a.ttstamp=this.getTtstamp(a,e);return a};window.FacebookFixHelper=e})();
(function(){var l=[{ID:20,FixRelated:{type:"privacy_update",id:"0",valueSet:[291667064279714,0xfa7f99ddd7a5,286958161406148],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",render:22}},{ID:22,FixRelated:{type:"privacy_update",id:"8787820733",valueSet:[300645083384735,0xfa7f99ddd7a5,291667064279714],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",
render:11}},{ID:23,FixRelated:{type:"privacy_update",id:"8787815733",valueSet:[300645083384735,0xfa7f99ddd7a5,291667064279714],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",render:11}},{ID:24,FixRelated:{type:"public_search",valueSet:[0,1],url:"/ajax/settings_page/search_filters.php"}},{ID:31,FixRelated:{type:"timelineReview",valueSet:[1,0],url:"/ajax/settings/timeline/review.php"}},
{ID:33,FixRelated:{type:"privacy_update",id:"8787530733",valueSet:[0xfa7f99ddd7a5,291667064279714,286958161406148],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",render:11}},{ID:34,FixRelated:{type:"privacy_update",id:"8787370733",valueSet:[0xfa7f99ddd7a5,291667064279714,286958161406148],url:"/privacy/selector/update/?is_saved_on_select=true&should_return_tooltip=true&prefix_tooltip_with_app_privacy=false&replace_on_select=false&ent_id=0&tag_expansion_button=friends_of_tagged",
render:11}},{ID:35,FixRelated:{type:"taggingReview",valueSet:[1,0],url:"/ajax/settings/tagging/review.php"}},{ID:36,FixRelated:{type:"tagSuggestion",valueSet:[1,0],url:"/ajax/settings/tagging/suggestions.php"}},{ID:81,FixRelated:{type:"friends_share",valueSet:[0],url:"/settings/applications/platform_friends_share/submit/"}},{ID:82,FixRelated:{type:"instant_connect",id:"8787530733",valueSet:[0,1],url:"/ajax/settings_page/instant_connect.php"}},{ID:83,FixRelated:{type:"simple_save",id:"8787700733",
valueSet:[50,40,10],url:"/ajax/privacy/simple_save.php"}},{ID:84,FixRelated:{type:"edit_application",app_id:1,valueSet:[50,40,10],url:"/settings/applications/edit_app_settings/submit",url2:"/ajax/settings/apps/delete_app.php"}}],e=function(){this.Constants=l};e.prototype=new FacebookFixHelper;window.FacebookFixHelper_Under18=e})();
