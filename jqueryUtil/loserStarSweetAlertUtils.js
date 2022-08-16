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

/**
 * 确认框，类似于alert
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} okCallback 确定的回调函数
 * @param {*} cancelCallback 取消的回调函数
 */
loserStarSweetAlertUtils.confirm = function(title,content,okCallback,cancelCallback){
	swal({
	    title: title,
	    text: content,
	    icon: "warning",
	    buttons: ["取消","确定"],
	    dangerMode: true,
	    closeOnClickOutside: false
	  }).then(function(will){
		  if(will){
			  if(okCallback){
				  okCallback();
			  }
		  }else{
			  if(cancelCallback){
				  cancelCallback();
			  }
		  }
	  });
}

/**
 * 弹出能填写内容的提示框
 * @param {*} title 标题
 * @param {*} content 内容
 * @param {*} placeholder input框中的提示
 * @param {*} okCallback 确定后的回调函数
 * @param {*} cancelCallback 取消时的回调函数（点击框外即取消）
 */
loserStarSweetAlertUtils.prompt = function(title, content, placeholder, okCallback,
		cancelCallback) {
	swal({
		title : title,
		text : content,
		icon : "warning",
		button:"确定",
		content : {
			element : "input",
			attributes : {
				placeholder : placeholder,
				type : "text",
			}
		},
	}).then(function(will) {
		if (okCallback) {
			okCallback(will);
		}
	});
	;
}