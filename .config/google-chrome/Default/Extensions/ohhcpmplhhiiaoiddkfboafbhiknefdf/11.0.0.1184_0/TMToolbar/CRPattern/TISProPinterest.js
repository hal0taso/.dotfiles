TSRTagFlowID();TrendMicro.TB.PagePattern=function(a,c,b){var d={isRated:function(a){}};b&&TrendMicro.TB.extend(d,b);this.urlPathPattern=a;this.selector=c;this.options=d};var gRtNodes=new TrendMicro.TB.TBSet,gBeenSent=new TrendMicro.TB.TBSet;
function TSRParse(){if(!/^(https?:\/\/((www|jp).)?)?pinterest.com(?!\/offsite)/i.test(document.location))return[];g_bIsNeedCheckSPan=!0;var a=[];TrendMicro.TB.Each(getPagePatterns(),function(b){TrendMicro.TB.console.info("For each pattern");a=a.concat(TrendMicro.TB.FindTargetLinks(b.urlPathPattern,b.selector,b.options))});TrendMicro.TB.console.info("elems.length="+a.length);TrendMicro.TB.ClearResultedNode();var c=g_oEnv.Parser.iResultNumber;TrendMicro.TB.console.info("elems1="+a.length);TrendMicro.TB.Each(a,
function(a){CreateTSRResultObject(a,a.href)});TrendMicro.TB.ReduceNewNode(c+1);return g_oEnv.Parser.rgobjSearchResult}function getPagePatterns(){var a=[];a.push(new TrendMicro.TB.PagePattern("","body a",{blacklist:["(https?://((www|jp).)?)?pinterest.com","javascript:","mailto"]}));return a};
