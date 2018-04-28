/**
 * 把某个checkbox里选中的值以逗号分隔放入第二个参数的元素的value上
 * @param checkBoxName
 * @param strSelector
 * @returns
 */
	var checkedBoxToStr = function (checkBoxSelector,strSelector){
		var accessoryTypeList = $( checkBoxSelector);
		var attachedListStr = "";
		accessoryTypeList.each(function(){
			if(this.checked){
				attachedListStr+=this.value;
				attachedListStr+=",";
			}
		});
		attachedListStr = attachedListStr.substring(0,attachedListStr.length-1);
		$(strSelector).val(attachedListStr);
	}
	
	
	
	
    /**
     * 根据勾选checkbox，隐藏显示对应的tab
     * selector tab的外层div的选择器（包裹着navigation和具体的tab）
     * 此方法依赖bootstrap的Tab插件
     * @param selector tab的外层div的选择器（包裹着navigation和具体的tab）
	 * @param checkBoxSelector 用来勾选的checkbox的选择器
	 * @returns
     */
    var hideShowTab = function (selector,checkBoxSelector) {
	    //初始化Nav tabs样式，全隐藏
	    $(selector).attr("class", "hidden");
	    $("#Nav0").attr("class", "hidden");
	    $("#Nav1").attr("class", "hidden");
	    $("#Nav2").attr("class", "hidden");
	  $(checkBoxSelector+':checked').each(function () {
		  var tabIndex = $(this).val();
		$(selector).removeClass("hidden");//取消整个navList隐藏
		$("#Nav"+tabIndex).removeClass("hidden");//根据勾选来决定是否显示某个nav
		$('#tabList #Nav'+tabIndex+' a').tab('show');//插件命令，出发点击某个nav的超链接，显示实际内容
  	  });
  	}