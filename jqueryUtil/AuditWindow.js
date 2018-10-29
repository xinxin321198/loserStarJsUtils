var AuditWindow = {};
AuditWindow.initWindow= function () {
  //初始化window
 var window = $("#auditWindow");
  var offset = window.offset();
  window.jqxWindow({
    position: { x: offset.left + 300, y: offset.top + 50} ,
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
  //初始化确定按钮
  $("#auditWindowOk").jqxButton({
    height : 30,
    width : 80
  });
  //初始化取消按钮
  $("#auditWindowCancel").jqxButton({
    height : 30,
    width : 80
  });
}

/**
 * 打开审核窗口，传入确定和取消按钮的事件方法回调
 */
AuditWindow.open = function(okCallBack,cancelCallBack){
  $("#auditWindowOk").on('click', function(e) {
    if(okCallBack!=undefined){
      okCallBack();
    }
    $("#auditWindow").jqxWindow('close');
  });

  $("#auditWindowCancel").on('click', function(e) {
    if(cancelCallBack!=undefined){
      cancelCallBack();
    }
    $("#auditWindow").jqxWindow('close');
  });
  
  $('#auditWindow').jqxWindow('open'); 

}
