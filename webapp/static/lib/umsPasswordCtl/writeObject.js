var WIN_32_ACTIVEX_VERSION = 2004059000;					//Windows系统下 32位控件版本号，例如2.4.1.3版本号则为2004001003
var WIN_64_ACTIVEX_VERSION = 2004059000;					//Windows系统下 64位控件版本号，例如2.4.1.3版本号则为2004001003
var WIN_PLUGIN_VERSION = 2004059000;						//Windows系统下插件版本号，例如2.4.1.3版本号则为2004001003
var MAC_PLUGIN_VERSION = 2004008000;						//Mac系统下插件版本号，例如2.4.1.3版本号则为2004001003
var LINUX_PLUGIN_VERSION = 2004002000;						//Linux系统下插件版本号，例如2.4.1.3版本号则为2004001003
var WIN_SETUP_PATH = "downloadPasswdCtl";				//Windows系统下安装程序下载路径
var MAC_SETUP_PATH = "downloadPasswdCtl";				//Mac系统下插件安装程序下载路径
var LINUX_SETUP_PATH = "downloadPasswdCtl";	//Linux系统下插件安装程序下载路径
var LocalObjVersion="";
var isInistall = false;
var _app = navigator.appName;

//控件
var PassCtrlClsid = "clsid:889F3012-7C2F-4454-80AE-AEBF490DE016";
var EditCtrlClsid = "clsid:D90D59AA-74EE-44d4-A707-ABDE5A93AF4D";
var UtilCtrlClsid = "clsid:71D722E2-4001-4851-94A2-302D738E65B6";
var CtlName = "POWERENTERUMS.PowerPasswordXUMSCtrl.1";

//插件
var MIME = "application/x-vnd-sa-isecurity-ums";
var PluginDescription = "SA-iSecurity Plug-in for UMS";
//Windows插件
var W_MIME = "application/x-vnd-csii-powerenter-ums";
var W_PluginDescription = "PowerEnter Plug-in for UMS";


//控件默认属性
function powerConfig(args) {
	var defaults = { 
		"width":130,
		"height":31,
		"maxLength":20,
		"minLength":6,
		"maskChar":"*",
		"backColor":"#FFFFFF",
		"textColor":"#262626",
		"borderColor":"#7F9DB9",
		"accepts":"[:graph:]+",
		"caption":"银联商务",
		"captionColor":"#87011f",
		"captionFont":"",
		"captionSize":0,
		"captionBold":"true",
		"lang":"zh_CN",
		"adjustTime":"true",
		"softKeyboard":"false"
	};
	for (var p in args)
		if (args[p] != null) defaults[p] = args[p];
	return defaults;
}

function writePluginObject(oid, clsid, cfg) {
	document.write('<object id="' + oid + '" type="' + clsid
		+ '" width="' + cfg.width + '" height="' + cfg.height
		+ '" style="width:' + cfg.width + 'px;height:' + cfg.height + 'px">');
	for (var name in cfg)
		document.write('<param name="' + name + '" value="' + cfg[name] + '">');
	document.write('</object>');
};

function writeObject(oid, clsid, cfg) {
	document.write('<object id="' + oid + '" classid="' + clsid		
			+ '" width="' + cfg.width + '" height="' + cfg.height  + '">');
	for (var name in cfg)
		document.write('<param name="' + name + '" value="' + cfg[name] + '">');
	document.write('</object>');
};

function writeEditObject(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		setPEXSetupUrl(oid);
		if(isInistall)
		{
			if (_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0)
			{
				writeObject(oid, EditCtrlClsid, powerConfig(cfg));
			}
			else
			{
				if((navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "Win64"))
					writePluginObject(oid, W_MIME, powerConfig(cfg));
				else
					writePluginObject(oid, MIME, powerConfig(cfg));
			}
		}
	}
};

function writePassObject(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		setPEXSetupUrl(oid);
		if(isInistall)
		{
			if (_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0)
			{
				writeObject(oid, PassCtrlClsid, powerConfig(cfg));
			}
			else
			{
				if((navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "Win64"))
					writePluginObject(oid, W_MIME, powerConfig(cfg));
				else
					writePluginObject(oid, MIME, powerConfig(cfg));
			}
		}
	}
};

function writeUtilObject(oid, cfg) {
	if (!oid || typeof(oid) != "string") {
		alert("writePassObj Failed: oid are required!");
	} else {
		if (_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0)
		{			
			writeObject(oid, UtilCtrlClsid, powerConfig(cfg));
		}
		else
		{
			if((navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "Win64"))
				writePluginObject(oid, W_MIME, powerConfig(cfg));
			else
				writePluginObject(oid, MIME, powerConfig(cfg));
		}
	}
};
 
function getPassInput(id, ts, spanId, massage, calcfactor, publickeyder) 
{
    try
    {
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		powerobj.publicKeyDER(publickeyder);						//设置加密平台公钥
		powerobj.setCalcFactor(calcfactor);				//0：不变换格式；1：不带主账号的X9.8格式；2+主账号：带主账号的X9.8格式
		var nresult = powerobj.verify();
		if(nresult < 0)
		{
			var error;
			if(nresult == -1)
			{
				error = "内容不能为空";
			}
			else if(nresult == -2)
			{
				error = "输入长度不足";
			}
			else if(nresult == -3)
			{
				error = "输入内容不合法";
			}
			else
			{
				error = powerobj.lastError(); 
			}
			PEGetElement(spanId).innerHTML = massage +error;
			return null;
		}	
		
		value = powerobj.getPinValue();
		if(value=="")
		{
			PEGetElement(spanId).innerHTML= massage+powerobj.lastError(); 
			return null;
		}
		else
		{
			return value;
		}
	}
	catch(e)
	{
		PEGetElement(spanId).innerHTML= "控件尚未安装，请下载并安装控件！";
	}
	return null;
}

function getEditInput(id, ts, spanId,massage) 
{
    try 
    {
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		var nresult = powerobj.verify();
		if(nresult < 0)
		{			
			var error;
			if(nresult == -1)
			{
				error = "内容不能为空";
			}
			else if(nresult == -2)
			{
				error = "输入长度不足";
			}
			else if(nresult == -3)
			{
				error = "输入内容不合法";
			}
			else
			{
				error = powerobj.lastError(); 
			}
			PEGetElement(spanId).innerHTML = massage +error;
			return null;
		}	
				
		value = powerobj.getValue();
		if(value=="")
		{
			PEGetElement(spanId).innerHTML= massage+powerobj.lastError(); 
			return null;
		}
		else
		{
			return value;
		}
	}
	catch(e)
	{
		PEGetElement(spanId).innerHTML= "控件尚未安装，请下载并安装控件！";
	}
	return null;
}

function getMFMInput(id, ts, spanId,massage) 
{
    try 
    {
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		value = powerobj.getMFM();
		if(value=="")
		{
			PEGetElement(spanId).innerHTML= massage + powerobj.lastError(); 
			return null;
		}
		else
		{
			return value;
		}
	}
	catch(e)
	{
		PEGetElement(spanId).innerHTML= massage + e.message;
	}
	return null;
}

function PEGetElement(id)
{
	return  window.document.getElementById(id);
}

function setPEXSetupUrl(oid)
{
	var DownloadPath = getDownLoadPath();
	var ObjVersion = getObjVersion();
	
	if(isRegisterediSecurity()==false){
		if((navigator.platform == "Win32") || 
		   (navigator.platform == "Windows") || 
		   (navigator.platform == "Win64") || 
		   (navigator.platform == "Mac68K") || 
		   (navigator.platform == "MacPPC") || 
		   (navigator.platform == "Macintosh") || 
		   (navigator.platform == "MacIntel") || 
		   (String(navigator.platform).indexOf("Linux") > -1)){
			document.write('<a href="'+DownloadPath+'" class="download_install" onClick="showDownloadPage()">点击此处下载控件</a>');
		}else{
			document.write('<a href="#" class="download_install">暂不支持此系统</a>');
		}
		isInistall = false;
	}else{
		var LocalObjVersion = getLocalObjVersion();
		if(LocalObjVersion < ObjVersion){
			document.write('<a href="'+DownloadPath+'" class="download_install" onClick="showUpdatePage()">点击此处更新控件</a>');
			isInistall = false;
		}else{
			isInistall = true;
		}
	}
}

function isRegisterediSecurity(){
	try{
		if (_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0){
			new ActiveXObject(CtlName);
		}else{
			if((navigator.platform == "Win32") || (navigator.platform == "Windows") || (navigator.platform == "Win64")){
				var w_powerEnterPlugin = navigator.plugins[W_PluginDescription];
				if(w_powerEnterPlugin == null)
					return false;
			}else{
				var powerEnterPlugin = navigator.plugins[PluginDescription];
				if(powerEnterPlugin == null)
					return false;
			}			
		}
	}catch(e){
		return false;   
	}
	return true;
}

function getDownLoadPath()
{
	if(navigator.platform == "Win64" || navigator.cpuClass == "x64")
		return WIN_SETUP_PATH;			//Windows64 OS
	else if((navigator.platform == "Win32") || (navigator.platform == "Windows"))
		return WIN_SETUP_PATH;		    	//Windows32 OS
	else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel"))
		return MAC_SETUP_PATH;		    	//MAC OS
	else if(String(navigator.platform).indexOf("Linux") > -1)
		return LINUX_SETUP_PATH;			//Linux OS

	return WIN_SETUP_PATH; 
}

function getObjVersion()
{
	if((navigator.platform == "Win64" || navigator.cpuClass == "x64")){
		if (_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0)
			return WIN_64_ACTIVEX_VERSION;		    	//Windows系统下64位控件版本
		else
			return WIN_PLUGIN_VERSION;		    		//Windows系统下插件版本
	}else if((navigator.platform == "Win32") || (navigator.platform == "Windows")){
		if (_app == 'Microsoft Internet Explorer' || navigator.userAgent.indexOf("Trident")>0)
			return WIN_32_ACTIVEX_VERSION;		    	//Windows系统下32位控件版本
		else
			return WIN_PLUGIN_VERSION;		    		//Windows系统下插件版本
	}else if((navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel")){
		return MAC_PLUGIN_VERSION;		    			//Mac系统下插件版本
	}else if(String(navigator.platform).indexOf("Linux") > -1){
		return LINUX_PLUGIN_VERSION;		    		//Linux系统下插件版本
	}
	return "";
}

writeUtilObject("versionObj",{"width":1,"height":1});

function getLocalObjVersion()
{
	if((navigator.platform == "Mac68K") || 
	   (navigator.platform == "MacPPC") || 
	   (navigator.platform == "Macintosh") || 
	   (navigator.platform == "MacIntel") || 
	   (String(navigator.platform).indexOf("Linux") > -1))
	{
		LocalObjVersion = "2999999999";
	}
	
	if(LocalObjVersion == "")
	{
		try{
			LocalObjVersion = PEGetElement("versionObj").getVersion();
		}catch(e){
			LocalObjVersion = getObjVersion();
		}
	}
	return LocalObjVersion;
}

/**
 * 调用控件
 * @param id
 * @param ts
 * @param spanId
 * @param massage
 * @param calcfactor
 * @param publickeyder
 * @returns
 */
function getPassInputByValue(id, ts, spanId, massage, calcfactor, publickeyder) 
{
    try
    {
		var powerobj = document.getElementById(id);	
		powerobj.setTimestamp(ts);
		powerobj.publicKeyDER(publickeyder);						//设置加密平台公钥
		powerobj.setCalcFactor(calcfactor);				//0：不变换格式；1：不带主账号的X9.8格式；2+主账号：带主账号的X9.8格式
		var nresult = powerobj.verify();
		if(nresult < 0)
		{
			var error;
			if(nresult == -1)
			{
				error = "内容不能为空";
			}
			else if(nresult == -2)
			{
				error = "输入长度不足";
			}
			else if(nresult == -3)
			{
				error = "输入内容不合法";
			}
			else
			{
				error = powerobj.lastError(); 
			}
			PEGetElement(spanId).innerHTML = massage +error;
			return null;
		}	
		
		value = powerobj.getValue();
		if(value=="")
		{
			PEGetElement(spanId).innerHTML= massage+powerobj.lastError(); 
			return null;
		}
		else
		{
			return value;
		}
	}
	catch(e)
	{
		PEGetElement(spanId).innerHTML= "控件尚未安装，请下载并安装控件！";
	}
	return null;
}