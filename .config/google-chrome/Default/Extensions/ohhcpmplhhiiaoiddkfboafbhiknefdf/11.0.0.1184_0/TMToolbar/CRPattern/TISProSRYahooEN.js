function TSRYahooShowIconCSS(a){a&&a.previousSibling&&"TSRSpan"==a.previousSibling.className&&a.previousSibling.childNodes[0]&&"TSRWebRatingIcon"==a.previousSibling.childNodes[0].className&&(a=a.previousSibling.childNodes[0],a.style.visibility="visible",a.style.border="0",a.style.margin="0",a.style.padding="0")}function TSRYahooCheckITModifyCSS(a,b){/^http:\/\/(es|it|in|asia|malaysia)\.search\.yahoo\.com\/((search)|(custom))/i.test(document.location)&&TSRYahooModifyCSS(a,b,!0)}
function TSRYahooModifyCSS(a,b,c){var d=a.FindInsertNode();d&&d.style&&(a.spanIcon=document.createElement("SPAN"),b+=parseInt(D_GAP_BETWEEN_ICON_TITLE),(new TMDOMObj(a.spanIcon)).style.setFloat("left"),c?(a=document.createElement("BR"),d.style.display="inline",d.parentNode.insertBefore(a,d.nextSibling)):d.style.marginLeft=b+"px")}function TSSRYahooFetchTargetURL(a){var b=a.indexOf("/RU=");return-1!=b?(a=a.substr(b+4),decodeURIComponent(a.substr(0,a.indexOf("/R")))):a}
function TSSRYahooFindInsertNode(){var a=null;if(this.node.parentNode&&-1==this.node.parentNode.nodeName.indexOf("#"))a=this.node;else if(this.baseNode){var b=this.baseNode.getElementsByTagName("A");0<b.length&&(a=b[0])}return a}
function TSSRYahooParseResult(a){var b=new CreateTSRLocatedObject(null,null,"A",null),c=new CreateTSRLocatedObject(a,b,"H3",null),b=new CreateTSRLocatedObject(a,c,"DIV","web");new CreateTSRLocatedObject(a,b,"DIV","main");c.multiMatches=!0;(a=c.findElement())||(a=b.findElement());if(a)for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++)if(c=TSSRYahooFetchTargetURL(a[b].href),c=CreateTSRResultObject(a[b],c,TSSRYahooFindInsertNode,null,TSRYahooShowIconCSS))c.baseNode=a[b].parentNode.parentNode.parentNode}
function TSSRYahooParseResultFirstCenter(a){var b=new CreateTSRLocatedObject(null,null,"A",null),b=new CreateTSRLocatedObject(a,b,"DIV",null),c=new CreateTSRLocatedObject(a,b,"DIV","web");a=new CreateTSRLocatedObject(a,c,"DIV","main");b.appendAttribute("class","compList");b.multiMatches=!0;(b=c.findElement())||(b=a.findElement());if(b)for(a=GetAllTSRLocatedNodes(b),b=0;b<a.length;b++)if(c=TSSRYahooFetchTargetURL(a[b].href),c=CreateTSRResultObject(a[b],c,TSSRYahooFindInsertNode,null,TSRYahooShowIconCSS))c.baseNode=
a[b].parentNode.parentNode.parentNode}function TSSRYahooParseResultDownloadLink(a){var b=new CreateTSRLocatedObject(null,null,"A",null),b=new CreateTSRLocatedObject(null,b,"H3",null),b=new CreateTSRLocatedObject(null,b,"DIV",null);a=new CreateTSRLocatedObject(a,b,"DIV","web");b.appendAttribute("class","t-bd");if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++)CreateTSRResultObject(a[b],a[b].href)}
function TSSRYahooParseSidebarSponsor(a){var b=new CreateTSRLocatedObject(null,null,"A",null),b=new CreateTSRLocatedObject(null,b,"DIV",null),b=new CreateTSRLocatedObject(null,b,"LI",null);a=new CreateTSRLocatedObject(a,b,"DIV","right");b.multiMatches=!0;if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++)CreateTSRResultObject(a[b],a[b].href)}
function TSSRYahooParseNewsSidebarSponsor(a){var b=new CreateTSRLocatedObject(null,null,"A",null),b=new CreateTSRLocatedObject(null,b,"h3",null),b=new CreateTSRLocatedObject(null,b,"LI",null);a=new CreateTSRLocatedObject(a,b,"DIV","right");b.multiMatches=!0;if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++)CreateTSRResultObject(a[b],a[b].href)}
function TSSRYahooParseNewsResult(a){var b=new CreateTSRLocatedObject(null,null,"A",null),b=new CreateTSRLocatedObject(null,b,"ul",null),b=new CreateTSRLocatedObject(null,b,"td",null);a=new CreateTSRLocatedObject(a,b,"li",null);a.multiMatches=!0;a.appendAttribute("data-bns","Yahoo");b.multiMatches=!0;if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++){for(var c=TSSRYahooFetchTargetURL(a[b].href),d=!1,e=0;e<YahooEnPtn.length;e++)if(ptn=new RegExp(YahooEnPtn[e],"i"),ptn.test(c)){d=
!0;break}!d&&(c=CreateTSRResultObject(a[b],c,TSSRYahooFindInsertNode))&&(c.baseNode=a[b].parentNode.parentNode.parentNode)}}
function TSSRYahooParseTopBottomSponsor(a){var b=new CreateTSRLocatedObject(null,null,"A",null),b=new CreateTSRLocatedObject(null,b,"DIV",null),b=new CreateTSRLocatedObject(null,b,"LI",null),c=new CreateTSRLocatedObject(null,b,"UL",null);a=new CreateTSRLocatedObject(a,c,"DIV","main");c.appendAttribute("class","spns");c.multiMatches=!0;b.multiMatches=!0;if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++)CreateTSRResultObject(a[b],a[b].href)}
function TSSRYahooMapResult(a){var b=new CreateTSRLocatedObject(null,null,"A",null);a=new CreateTSRLocatedObject(a,b,"DIV",null);a.multiMatches=!0;a.appendAttribute("class","sc-loc");b.multiMatches=!0;b.appendAttribute("class",null);if(b=a.findElement())for(b=GetAllTSRLocatedNodes(b),a=0;a<b.length;a++){for(var c=TSSRYahooFetchTargetURL(b[a].href),d=!1,e=0;e<YahooEnPtn.length;e++)if(ptn=new RegExp(YahooEnPtn[e],"i"),ptn.test(c)){d=!0;break}!d&&(c=CreateTSRResultObject(b[a],c,TSSRYahooFindInsertNode))&&
(c.baseNode=b[a].parentNode.parentNode.parentNode)}}function TSSRYahooParseNewSW(a){var b=new CreateTSRLocatedObject(null,null,"A",null),b=new CreateTSRLocatedObject(null,b,"li",null);a=new CreateTSRLocatedObject(a,b,"div","newsw");b.multiMatches=!0;if(a=a.findElement())for(a=GetAllTSRLocatedNodes(a),b=0;b<a.length;b++){for(var c=TSSRYahooFetchTargetURL(a[b].href),d=!1,e=0;e<YahooEnPtn.length;e++)if(ptn=new RegExp(YahooEnPtn[e],"i"),ptn.test(c)){d=!0;break}d||CreateTSRResultObject(a[b],c)}}
var YahooEnPtn="^https?://search.yahoo.com http://search.yahoo.com/ search.yahoo.com ^mailto www.yahoo.com/bin/set local.yahoo.com maps.yahoo.com".split(" ");g_bIsNeedCheckSPan=!0;TSRTagFlowID();
function TSRParse(){var a=g_oEnv.Parser.iResultNumber;TSSRYahooParseResult(document);TSSRYahooParseResultFirstCenter(document);TSSRYahooParseResultDownloadLink(document);TSSRYahooParseTopBottomSponsor(document);TSSRYahooParseSidebarSponsor(document);TSSRYahooParseNewsResult(document);TSSRYahooParseNewsSidebarSponsor(document);TSSRYahooMapResult(document);TSSRYahooParseNewSW(document);TrendMicro.TB.ReduceNewNode(a+1);return g_oEnv.Parser.rgobjSearchResult};
