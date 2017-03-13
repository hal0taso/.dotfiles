(function(){window.SendWebRequest=function(a,b,c){TMExt_$.ajax({type:a.type,url:a.url,data:a.data,dataType:a.dataType,success:function(a){b(a)},error:function(){c()}})}})();
