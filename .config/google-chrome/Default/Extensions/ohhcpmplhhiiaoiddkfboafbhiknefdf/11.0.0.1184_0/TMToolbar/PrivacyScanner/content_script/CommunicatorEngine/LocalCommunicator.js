(function(){var f=window,b={PSTimeoutID:{},PSLocalEstablishConnection:function(){b.DispatchMessage("PSLocalEstablishConnection",null)},PSLocalSendMessage:function(a,c){var d=TMExt_$.toJSON(a);b.PSSetTimeoutCallback(a,c);b.DispatchMessage("PSLocalSendMessage",d)},PSSetTimeoutCallback:function(a,c){var d=function(a,c,d){a=TMExt_$.parseJSON(TMExt_$.toJSON(a));a.type=c;a.dataOut={ret_status:!1,ret_value:d};c=TMExt_$.toJSON(a);b.PSLocalReceiveMessage(c)};if("undefined"!=typeof a.dataIn&&"undefined"!=typeof a.function_id){var e=
a.function_id;"ajax_request"==a.type?b.PSTimeoutID[e]=setTimeout(function(){d(a,"ajax_request_result",null)},TIMEOUT_SEND_REQUEST_TO_BACKGROUND):c&&(b.PSTimeoutID[e]=setTimeout(function(){d(a,"error","80000001")},c))}},PSLocalReceiveMessage:function(a){a=TMExt_$.parseJSON(a);if("undefined"!=typeof a.dataIn&&"undefined"!=typeof a.function_id){var c=a.function_id;null!=b.PSTimeoutID[c]&&(clearTimeout(b.PSTimeoutID[c]),b.PSTimeoutID[c]=null);DoPSLocalReceiveMessage(a)}},DispatchMessage:function(a,c){for(var b=
COMMUNICATOR_WRAPPER_API_TABLE[a],e=0;e<b.length;++e)try{b[e](c)}catch(f){}}};f.PSLocalEstablishConnection=b.PSLocalEstablishConnection;f.PSLocalSendMessage=b.PSLocalSendMessage;f.PSLocalReceiveMessage=b.PSLocalReceiveMessage})();
