
ExifViewerConfig.load(localStorage, ExifViewerManifest.getData());
ExifCache.load();
var showLog = true;
function log ()
{
	if (showLog)
	{
		console.log.apply(console, arguments);
	}
}
function onRequest (request, sender, callback)
{
	switch (request.action)
	{
		case "getexifcached":
			logToGA('/exifviewer/service/getexifcached');
			callback({ exif: ExifCache.getEntry(request.src), id:request.id });
			log("已从缓存获取 EXIF %s", request.src);
			break;
		case "getexif":
			logToGA('/exifviewer/service/getexif');
			if (ExifCache.hasEntry(request.src))
			{
				log("已从缓存获取 EXIF %s", request.src);
				callback({ exif: ExifCache.getEntry(request.src), id:request.id });
			}
			else
			{
				log("开始下载图片获取 EXIF %s", request.src);
				
				File.download(request.src,
				function (content)
				{
					log("已下载完成 EXIF %s", request.src);
					
					var file = new BinaryFile(content);
					var exif = findEXIFinJPEG(file);
					ExifCache.addEntry(request.src, exif);
					
					callback({code: 0, exif: exif, id: request.id});
				}, function (reason)
				{
					// 告知客户端下载远程文件失败
					callback({code: 1});
					// 重试
					// onRequest(request, sender, callback);
				});
			}
			break;
			
		case "getconfig":
			log("正在为 %s 发送用户选项", sender.id);
			callback({localStorage: localStorage, manifest: ExifViewerManifest.getData()});
			break;
			
		case "getmanifest":
			log("正在为 %s 发送 manifest", sender.id);
			callback( {manifest: ExifViewerManifest.getData()} );
			break;
			
		case "setconfig":
			log("正在为 %s 设置选项 %s = %s", sender.id, request.name, request.value);
			localStorage[request.name] = request.value;
			callback( {name: request.name, value: request.value} );
			
		case "savecache":
			ExifCache.save();
			break;
	}
}


chrome.extension.onRequest.addListener(onRequest);