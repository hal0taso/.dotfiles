

var g_sLoadingpage;
var g_sHostName="com.trendmicro.tmopchrome.ext";
var g_WRSport;

function TMopWRSinit()
{
   MakeSureWRSportEnable();
   g_sLoadingpage=chrome.extension.getURL("loadingpage.html");
}

function hex2a(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}


function hex2a2(hex) {
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseShort(hex.substr(i, 2), 16));
    return str;
}



function TMopWRSonBeforeRequest(details) 
{

   console.log("Enter >>> TMopWRSonBeforeRequest." + details.url + "method(" + details.method+")");  
  
   //bypass https://www.google.com.tw/complete/search?client=chrome&q=w&cp=1&sugkey=AIzaSyCLlKc60a3z7lo8deV-hAyDU7rHYgL4HZg} 
   //if(details.url.indexOf( "https://www.google.co" )==0//remove firstly to not violate parent control(if set google as blacklist) and check if performance impact raised
      if(details.url.indexOf( "chrome-extension:")==0
      ||details.url.indexOf( "chrome:")==0
      ||details.url.indexOf( "about:blank")==0
      ||details.url.indexOf( "http://127.0.0.1")==0
      ||details.url.indexOf( "http://localhost")==0)
   {
      console.log(" bypass {" + details.url+ "}"); 
      return  ;//allow 
   }

   if(!MakeSureWRSportEnable())
   {
      console.log("!! WRS Message Host cannot be connected");
      return  ;//allow 
   }

   var bNeedScan=false;
   //Check https and non port 80
   if(details.url.indexOf( "https://")==0)
      bNeedScan=true;

   if(details.url.indexOf( "http://")==0)
   {
      var PortNumber=GetPortNumber(details.url);
      if((typeof(PortNumber) != "undefined")&&(PortNumber!=80))
         bNeedScan=true;
   }

   if(!bNeedScan)
   {
      console.log("bypass non target protocol");
      return  ;//allow 
   }


   if((details.tabId == undefined)||(details.tabId <0)) {
      console.log("cannot get current tabID");
         return;
      }

   TMopWRSscan(details.tabId,details.requestId,details.method,details.url);

   return;
}



function TMopWRSscan(tabID,rId,method,url)
{
   var stabID= tabID.toString();
   var rating_msg = {"CMD":"tmScan","Tid":stabID,"Rid":rId,"URL":url,"METHOD":method};
   console.log(" URL Rating start{" + url+ "} method{"+method+"}");
   console.log("TRACE sendNativeMessage:"+JSON.stringify(rating_msg));

   g_WRSport.postMessage(rating_msg);
}


function TMopWRSresponse(rating_rsp) 
{
   console.log("WRS Message Host response");

   var allow = false;
   if(typeof(rating_rsp) == "undefined")
   {
      console.log(" tmScan: return NULL");
      allow=true;//allow 
   } 
   else if(rating_rsp.Error!=0)
   {
      console.log(" tmScan: Error("+rating_rsp.Error+")");
      allow=true;//allow    	
   }
   else if(rating_rsp.Block==0)
   {
      console.log(" tmScan: Pass");
      allow=true;//allow    	
   }
   else if(rating_rsp.Content=="")
   {
      console.log(" GetAlertPageContent: NULL");
      allow=true;//allow   	
   }
   var ResponseMsg;
   var msgblock;


   if(!allow)
   {
      alartpage="data:text/html;charset=utf-8," + rating_rsp.Content;
      chrome.tabs.update(rating_rsp.Tid, {url: alartpage});
      //chrome.tabs.update(rating_rsp.Tid, {url: alartpage});

   }

}


function TMopWRSdisconnected() 
{
   console.log("WRS Message Host disconnected");
   g_WRSport=undefined;
}


function MakeSureWRSportEnable()
{
   if(typeof(g_WRSport) == "undefined")
   {  
      g_WRSport = chrome.runtime.connectNative(g_sHostName);
      g_WRSport.onMessage.addListener(TMopWRSresponse);
      g_WRSport.onDisconnect.addListener(TMopWRSdisconnected);
   }
   return (typeof(g_WRSport) == "undefined")?false:true;
}

function GetPortNumber(url) {
   var url_parts = url.split('/');
   var domain_name_parts = url_parts[2].split(':');
   var port_number = domain_name_parts[1];
   return port_number;

}
