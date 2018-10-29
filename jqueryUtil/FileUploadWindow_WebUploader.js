/**
 * 上传excel文件(基于jqwidgets的window和Web Uploader上传组件，此组件不依赖于flash，可在最新chrome中禁止flash时使用)
 * @param windowId 打开上传文件窗口的容器id
 * @param fileListSelector 窗口内上传的文件列表的list容器的css选择器
 * @param pickBtnSelector 文件选择按钮的容器的css选择器
 * @param uploadBtnSelector 开始上传按钮的容器的css选择器
 * @param url 上传的处理地址
 * @param callBack 上传的完成的回调函数
 * @returns
 */
var FileUploadWindow_WebUploader={};
FileUploadWindow_WebUploader.initFileUploadWindow= function (windowId,fileListSelector,pickBtnSelector,uploadBtnSelector,url,okCallBack,errorCallBack) {
	var uploadWindow = $("#"+windowId);
	var offset = uploadWindow.offset();
	uploadWindow.jqxWindow({
		autoOpen: false,
		draggable: true,
		resizable: true,
		showCollapseButton: false,
		minHeight: 200,
		minWidth: 200,
		height: 500,
		width: 500,
		initContent: function() {
			var fileUploadWindow_uploader_obj = WebUploader.create({
				// swf文件路径
				//        swf: BASE_URL + '/js/Uploader.swf',
				
				// 文件接收服务端。
				server: url,
				
				// 选择文件的按钮。可选。
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: pickBtnSelector,
				
				// 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
				resize: false
			});
			
			// 当有文件被添加进队列的时候
			fileUploadWindow_uploader_obj.on( 'fileQueued', function( file ) {
				//生成相关的一些html
				$(fileListSelector).append( '<div id="' +windowId+'_'+ file.id + '" class="bg-info">' +
						'<span id="'+ windowId+'_'+file.id+'_span" class="text-warning">等待上传...</span>' +
						'<label id="'+ windowId+'_'+file.id+'_label" class="info"  style="margin-left: 10px;">' + file.name + '</label>' +
						'<button id="'+windowId+'_'+file.id+'_delBtn" class=" btn-warning btn-xs" style="margin-left:10px;" file_id="'+file.id+'">移除</button>'+
				'</div>' );
				//在移除文件的按钮的对象上绑定一个该按钮所属的上传组件对象的属性
				document.getElementById(windowId+"_"+file.id+"_delBtn").uploadObj = this;
				
				//绑定移除文件的事件
				$("#"+windowId+"_"+file.id+"_delBtn").click(function(){
					var self = this;//获取按钮对象自己
					var file_id = $(self).attr("file_id");//取出文件id
					self.uploadObj.removeFile(file_id,true);//根据按钮上绑定的上传组件，再根据文件的id，从组件列表中移除文件
					$( '#'+windowId+'_'+file_id).remove();//移除文件的html
				})
			});
			//绑定开始上传的按钮事件
			$(uploadBtnSelector).on( 'click', function() {
				fileUploadWindow_uploader_obj.upload();
			});
			
			//当文件上传成功时触发。
			fileUploadWindow_uploader_obj.on( 'uploadSuccess', function( file ) {
			    $( '#'+windowId+'_'+file.id ).find('#'+windowId+'_'+file.id+'_span').text('已上传').removeClass("text-warning").addClass("text-success");
			    okCallBack();
			    fileUploadWindow_uploader_obj.removeFile( file,true );
			    $( '#'+windowId+'_'+file.id).remove();
			});

			//当文件上传出错时触发。
			fileUploadWindow_uploader_obj.on( 'uploadError', function( file ) {
			    $( '#'+windowId+'_'+file.id ).find('#'+windowId+'_'+file.id+'_span').text('上传出错');
			    errorCallBack();
			    fileUploadWindow_uploader_obj.removeFile( file ,true);
			    $( '#'+windowId+'_'+file.id).remove();
			});
			
			fileUploadWindow_uploader_obj.on('uploadFinished', function () {
			    //清空队列
				fileUploadWindow_uploader_obj.reset();
				//关闭窗口
				$("#"+windowId).jqxWindow('close');
			});
			return fileUploadWindow_uploader_obj
		}
	});
}
/**
 * 打开文件上传的window
 * @param window的div的选择器
 */
FileUploadWindow_WebUploader.openWindow = function (windowSelector){
  $(windowSelector).jqxWindow('open');
}