var loserStarJqwidgetsUtils = {}


/**
 * 剔除jqwidgets的grid自动生成的一些字段，以此获取原始的数据
 * @param {*} oldO 数据 
 * @param {*} isNewObj 布尔值，如果需要创造一个副本而不影响原始的oldO对象里的值，则传入true；如果仅需要在原始对象上修改，则传入false或不用传
 * @return 返回剔除掉字段后的对象
 */
loserStarJqwidgetsUtils.getOriginalData = function(oldO, isNewObj) {
		var newO = oldO;
		if(oldO){
			if (isNewObj) {
				// 深拷贝出一个新的对象
				newO = loserStarJsUtils.copyObj2(oldO);
			}
			if (Array.prototype.isPrototypeOf(newO)) {
				for (var i = 0; i < newO.length; i++) {
					newO[i] = loserStarJqwidgetsUtils.getOriginalData(newO[i]);
				}
			} else {
				if (newO.hasOwnProperty("boundindex")) {
					delete (newO.boundindex);
				}
				if (newO.hasOwnProperty("uid")) {
					delete (newO.uid);
				}
				if (newO.hasOwnProperty("uniqueid")) {
					delete (newO.uniqueid);
				}
				if (newO.hasOwnProperty("visibleindex")) {
					delete (newO.visibleindex);
				}
			}
		}
	return newO;
}

/**
 * 显示加载
 */
loserStarJqwidgetsUtils.showLoading = function(){
    if($("#jqxLoader").length<=0){
        var text = "";
        text += "<div id=\"jqxLoader\">";
        text += "</div>";
        $(window.document.body).append(text);
    }
    $("#jqxLoader").jqxLoader({ isModal: true,width:0,height:0,imagePosition: 'top',html: "<span class=\"fa fa-refresh fa-5x fa-spin \" style=\"color: #5bc0de;font-size: 200px;margin-top: -85px;margin-left: -85px;\"></span>"});
    $('#jqxLoader').jqxLoader('open');
}
/**
 * 隐藏加载
 */
loserStarJqwidgetsUtils.hideLoading = function(){
    if($("#jqxLoader").length>0){
        $('#jqxLoader').jqxLoader('close');
    }
}

/**
 * 获取某个jqxGrid里面的选中的单行数据
 */
loserStarJqwidgetsUtils.getSelectedGridRow =function(gridIdSelector,errorMsg){
	var selected_index = $(gridIdSelector).jqxGrid("getselectedrowindex");
	if (selected_index == undefined || selected_index == null || selected_index <= 0) { 
		kaen_alert.alertError(errorMsg);
		return null;
	}
	var row = $(gridIdSelector).jqxGrid('getrowdata', selected_index);
	return row;
}

/**
 * 获取某个jqxGrid里面的选中的单行数据
 */
loserStarJqwidgetsUtils.getSelectedGridRows = function (gridIdSelector, errorMsg) {
	var rows = null;
	var selected_indexs = $(gridIdSelector).jqxGrid('getselectedrowindexes');
	if (selected_indexs == undefined || selected_indexs == null || selected_indexs <= 0) { 
		kaen_alert.alertError(errorMsg);
		return null;
	}
	for (var i = 0; i < selected_indexs.length; i++) {
		var index = selected_indexs[i];
		var row = $(gridIdSelector).jqxGrid('getrowdata', index);
		if(!rows){rows = [];}
		rows.push(row);
	}
	return rows;
}