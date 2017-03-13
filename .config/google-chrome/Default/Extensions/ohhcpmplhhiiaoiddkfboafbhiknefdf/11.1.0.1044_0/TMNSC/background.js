


//function listenerOnMessage(request, sender, sendResponse) 
//{
//    return  TMopWRSonMessage(request, sender, sendResponse);
//}

function listenerOnBeforeRequest(details) 
{
    return  TMopWRSonBeforeRequest(details);
}


//chrome.runtime.onMessage.addListener(listenerOnMessage);
chrome.webRequest.onBeforeRequest.addListener(listenerOnBeforeRequest,{urls: ["<all_urls>"],types:["main_frame"]},["blocking"]);


TMopWRSinit();


