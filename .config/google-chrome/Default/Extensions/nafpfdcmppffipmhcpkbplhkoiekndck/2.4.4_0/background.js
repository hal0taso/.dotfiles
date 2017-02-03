
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
			log("�Ѵӻ����ȡ EXIF %s", request.src);
			break;
		case "getexif":
			logToGA('/exifviewer/service/getexif');
			if (ExifCache.hasEntry(request.src))
			{
				log("�Ѵӻ����ȡ EXIF %s", request.src);
				callback({ exif: ExifCache.getEntry(request.src), id:request.id });
			}
			else
			{
				log("��ʼ����ͼƬ��ȡ EXIF %s", request.src);
				
				File.download(request.src,
				function (content)
				{
					log("��������� EXIF %s", request.src);
					
					var file = new BinaryFile(content);
					var exif = findEXIFinJPEG(file);
					ExifCache.addEntry(request.src, exif);
					
					callback({code: 0, exif: exif, id: request.id});
				}, function (reason)
				{
					// ��֪�ͻ�������Զ���ļ�ʧ��
					callback({code: 1});
					// ����
					// onRequest(request, sender, callback);
				});
			}
			break;
			
		case "getconfig":
			log("����Ϊ %s �����û�ѡ��", sender.id);
			callback({localStorage: localStorage, manifest: ExifViewerManifest.getData()});
			break;
			
		case "getmanifest":
			log("����Ϊ %s ���� manifest", sender.id);
			callback( {manifest: ExifViewerManifest.getData()} );
			break;
			
		case "setconfig":
			log("����Ϊ %s ����ѡ�� %s = %s", sender.id, request.name, request.value);
			localStorage[request.name] = request.value;
			callback( {name: request.name, value: request.value} );
			
		case "savecache":
			ExifCache.save();
			break;
	}
}


chrome.extension.onRequest.addListener(onRequest);