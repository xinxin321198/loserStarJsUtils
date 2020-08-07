var loserStarJqwidgetsUtils = {}

/**
 * 剔除jqwidgets的grid自动生成的一些字段，以此获取原始的数据
 * @param {*} o 
 */
loserStarJqwidgetsUtils.getOriginalData = function(o){
    if(Array.prototype.isPrototypeOf(o)){
        for(var i=0;i<o.length;i++){
            loserStarJqwidgetsUtils.getOriginalData(o[i]);
        }
    }else{
        if(o.hasOwnProperty("boundindex")){
            delete(o.boundindex);
        }
        if(o.hasOwnProperty("uid")){
            delete(o.uid);
        }
        if(o.hasOwnProperty("uniqueid")){
            delete(o.uniqueid);
        }
        if(o.hasOwnProperty("visibleindex")){
            delete(o.visibleindex);
        }
    }
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
    $("#jqxLoader").jqxLoader({ isModal: true,width:0,height:0,imagePosition: 'top',html: "<span class=\"fa fa-refresh fa-5x fa-spin \" style=\"color: blue;font-size: 200px;\"></span>"});
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