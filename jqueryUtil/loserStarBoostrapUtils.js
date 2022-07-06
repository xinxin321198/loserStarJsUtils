
/**
 * 这是基于bootstrap3封装的一些方法
 */
var loserStarBoostrapUtils = {};
/**
 * 通过bootstrap的模态框 modal.js组件封装实现的一个loading方法
 * @param {*} title 标题
 * @param {*} content 内容
 */
loserStarBoostrapUtils.loading = function (title,content) {
    if (undefined==title||null==title||""==title){
        title = "提示";//默认提示语
    }
    if (undefined == content || null == content || "" == content){
        title = "处理中，请勿关闭页面...";//默认提示语
    }
    if($("#loserStarBoostrapUtils_loadingDlg")[0] == undefined || $("#loserStarBoostrapUtils_loadingDlg")[0]==null){
        //如果元素不存在就创建
        var text = "";
        text += "<div class=\"modal fade\" id=\"loserStarBoostrapUtils_loadingDlg\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">";
        text += "    <div class=\"modal-dialog modal-sm\" role=\"document\">";
        text += "        <div class=\"modal-content\">";
        text += "            <div class=\"modal-header\">";
        text += "                <h4 class=\"modal-title\" id=\"myModalLabel\">提示</h4>";
        text += "            </div>";
        text += "            <div class=\"modal-body\">";
        text += "                处理中，请勿关闭页面...";
        text += "            </div>";
        text += "        </div>";
        text += "    </div>";
        text += "</div>";
        $("body").append(text);
    }
    $('#loserStarBoostrapUtils_loadingDlg').modal({
        keyboard: false,//按下esc键不会被关闭  
        backdrop: 'static'//true:有遮罩，单击关闭，false:无遮罩,单击不会关闭，'static':有遮罩，单击不会关闭
    });
}