/**
 * 基于 www.sweetalert.cn 的提示框方法
 */
var loserStarSweetAlertUtils = {};

loserStarSweetAlertUtils.alertWarning = function(title,content){
	loserStarSweetAlertUtils.alert(title,content,"warning");
}

loserStarSweetAlertUtils.alertError = function(title,content){
	loserStarSweetAlertUtils.alert(title,content,"error");
}

loserStarSweetAlertUtils.alertSuccess = function(title,content){
	loserStarSweetAlertUtils.alert(title,content,"success");
}

loserStarSweetAlertUtils.alertInfo = function(title,content){
	loserStarSweetAlertUtils.alert(title,content,"info");
}

loserStarSweetAlertUtils.alert = function(title,content,type){
	if(!title){title="";}
	if(!content){content="";}
	swal(title,content,type);
}