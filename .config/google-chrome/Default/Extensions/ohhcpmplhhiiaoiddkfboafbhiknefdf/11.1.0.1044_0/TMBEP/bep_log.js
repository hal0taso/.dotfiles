var bcLogType = 1; //local 2:remote 3:both
var bcLogEnable = false;

function bcSetLogEnable(isEnable) {
	bcLogEnable = isEnable;
}

function bcLogLocal(message) {
	if(bcLogEnable) {
		console.log(message);	
	}
}

function bcLogRemote(message) {
	//
}

function bcLog(message) {
	if(bcLogType == 1) {
		bcLogLocal(message);	
	} else if(bcLogType == 2) {
		bcLogRemote(message);
	} else {
		bcLogLocal(message);	
		bcLogRemote(message);
	}
	
}
