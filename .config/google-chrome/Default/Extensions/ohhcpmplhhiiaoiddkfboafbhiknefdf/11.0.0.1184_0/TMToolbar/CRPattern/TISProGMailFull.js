function TSWMMGmailShowRatingResultUI(){var b=this.level;return g_oRatingLevel[b]==g_oImgDefine.Safe||g_oRatingLevel[b]==g_oImgDefine.Neutral||g_oRatingLevel[b]==g_oImgDefine.Trusted?!1:!0}function TSWMGmailFetchTargetURL(b,a){if(a&&(0<a.indexOf(".google")||0<a.indexOf(".googlesyndication.")))return"";var c=new RegExp("^(http|https)://"+b,"i");return/^(http|https):\/\//i.test(a)&&!c.test(a)?a:""}
function TSWMGmailParseResult(b){var a=new CreateTSRLocatedObject(null,null,"A",null);if(a=(new CreateTSRLocatedObject(b,a,"DIV","fic")).findElement()){a=GetAllTSRLocatedNodes(a);b=b.location.host;for(var c=0;c<a.length;c++){var d=TSWMGmailFetchTargetURL(b,a[c].href);if(0!=d.length){var e=a[c].getAttribute("Rate");e&&"1"==e||(a[c].setAttribute("Rate","1"),CreateTSRResultObject(a[c],d,null,TSWMMGmailShowRatingResultUI))}}}}g_bIsNeedCheckSPan=!0;TSRTagFlowID();
function TSRParse(){var b=g_oEnv.Parser.iResultNumber;TSWMGmailParseResult(document);TrendMicro.TB.ReduceNewNode(b+1);return g_oEnv.Parser.rgobjSearchResult};
