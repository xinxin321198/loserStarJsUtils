/**
 * 审核窗口第2个版本 此组件不绑定死窗口及按钮的id，需要初始化时候传入（为了让同一页面可定制多个不同的审核窗口）
 * @param windowId 窗口的容器id
 * @param okBtnSelector 确定按钮的容器选择器
 * @param cancelBtnSelector 取消按钮的容器选择器
 * @returns
 * 
 * html示例（
 * 1.如果一个页面中要出现多个不同定制的审核框，请切记html规范，同一个页面不能出现id重复的元素，否则可能会造成组件的混乱 
 * 2.不同组的radio或checkbox元素的name名称请区别定义
 * ）：
 *     <!-- 审核窗口_带退回选项 -->
    <div id="auditWindow_back">
        <div>
            <span>审核意见</span>
        </div>
        <div>
            <div>
                <input type="radio" name="result_back" value="1">同意
                <input type="radio" name="result_back" value="0">不同意
                <input type="radio" name="result_back" value="2">退回
            </div>
            <div>
                审核意见：<br>
                <textarea name="auditContent_back" id="auditContent_back" cols="80" rows="10"></textarea>
            </div>
            <div >
                <input id="auditWindowOk_back" type="button" value="确定" style="margin-right: 10px;">
                <input id="auditWindowCancel_back" type="button" value="取消" style="margin-right: 10px;">
            </div>
        </div>
    </div>
 */
var AuditWindow2 = {};
AuditWindow2.initWindow= function (windowId,okBtnSelector,cancelBtnSelector) {
	//记录下初始化时候的参数，便于其它方法调用
	AuditWindow2.windowId = windowId;
	AuditWindow2.okBtnSelector = okBtnSelector;
	AuditWindow2.cancelBtnSelector = cancelBtnSelector;
	
	// 初始化window
	var window = $("#"+windowId);
	var browserWidth = $(window).width();
	var browserHeight = $(window).height();
  window.jqxWindow({
    position: { x: browserWidth/3, y: browserHeight/2} ,
	  isModal:true,
    autoOpen: false,
    draggable: true,
    resizable: true,
    showCollapseButton: false,
    maxHeight: 500,
    maxWidth: 1000,
    minHeight: 200,
    minWidth: 200,
    height: 300,
    width: 700
  });
  // 初始化确定按钮
  $(okBtnSelector).jqxButton({
    height : 30,
    width : 80
  });
  // 初始化取消按钮
  $(cancelBtnSelector).jqxButton({
    height : 30,
    width : 80
  });
}

/**
 * 打开审核窗口，传入确定和取消按钮的事件方法回调
 */
AuditWindow2.open = function(okCallBack,cancelCallBack,element){
	//为确定按钮绑定传入的点击事件
  $(AuditWindow2.okBtnSelector).on('click', function(e) {
    if(okCallBack!=undefined){
      okCallBack();
    }
    $("#"+AuditWindow2.windowId).jqxWindow('close');
  });
  
  //为取消按钮绑定传入的取消事件
  $(AuditWindow2.cancelBtnSelector).on('click', function(e) {
    if(cancelCallBack!=undefined){
      cancelCallBack();
    }
    $("#"+AuditWindow2.windowId).jqxWindow('close');
  });
  if(undefined!=element&&null!=element&&""!=element){
	  var offset = $(element).offset();
	  $("#"+AuditWindow2.windowId).jqxWindow({position: { x: offset.left, y: offset.top}}); 
  }
  //执行打开窗口操作
  $("#"+AuditWindow2.windowId).jqxWindow('open'); 
}
