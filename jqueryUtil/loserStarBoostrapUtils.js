
/**
 * 这是基于bootstrap3封装的一些方法
 */
var loserStarBoostrapUtils = {};
/**
 * 通过bootstrap的模态框 modal.js组件封装实现的一个loading方法
 * @param {*} title 标题
 * @param {*} content 内容
 */
loserStarBoostrapUtils.loading = function (title, content) {
    if (undefined == title || null == title || "" == title) {
        title = "提示";//默认提示语
    }
    if (undefined == content || null == content || "" == content) {
        title = "处理中，请勿关闭页面...";//默认提示语
    }
    if ($("#loserStarBoostrapUtils_loadingDlg")[0] == undefined || $("#loserStarBoostrapUtils_loadingDlg")[0] == null) {
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

/**
 * 关闭加载对话框
 */
loserStarBoostrapUtils.closeLoading = function () {
    $('#loserStarBoostrapUtils_loadingDlg').modal("hide");
}


/**
 * 给loading对话框设置事件回调方法（具体参考bootstrap3官网modal.js组件的事件）
 * @param {*} eventType 事件名称（参考https://getbootstrap.com/docs/3.4/javascript/#modals）
 * @param {*} callBack 回调方法
 */
loserStarBoostrapUtils.setLoadingCallback = function (eventType, callBack) {
    $('#loserStarBoostrapUtils_loadingDlg').on(eventType, function (e) {
        if (callBack) {
            callBack(e);
        }
    });
}

/**
 * 获取一个进度条html
 * @param {*} scale 小数，最大1
 */
loserStarBoostrapUtils.getProgressHtml = function (scale) {
    var votingProportionHtml = "";
    var votingProportion = scale * 100;
    var votingProportionClass = "";
    if (votingProportion >= 75) {
        votingProportionClass = "progress-bar-success";
    } else if (votingProportion >= 50) {
        votingProportionClass = "progress-bar-info";
    } else if (votingProportion >= 25) {
        votingProportionClass = "progress-bar-warning";
    } else {
        votingProportionClass = "progress-bar-danger";
    }
    votingProportionHtml += "<div class=\"progress \">";
    votingProportionHtml += "  <div class=\"progress-bar " + votingProportionClass + " progress-bar-striped active\" role=\"progressbar \" aria-valuenow=\"" + votingProportion + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"min-width:2em;width: " + votingProportion + "%;\">";
    votingProportionHtml += "    " + votingProportion + "%";
    votingProportionHtml += "  </div>";
    votingProportionHtml += "</div>";
    return votingProportionHtml;
}