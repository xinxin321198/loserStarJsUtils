/**
 * 基于bootstrap3的模态对话框封装的简单查询数据和选择数据的弹出窗口，使用原型链的方式封装
 * 
用法：
    //构建查询条件配置项
    //filedName显示的字段名，
    //filedId字段的key，
    //value默认值，(如果是select类型的，该值得传入一个数组对象，数组内每一个元素必须包含name和value两个key）
    //type控件类型（目前支持text和select类型）
    var queryFiledList = [
        { filedName: "数据编号", filedId:"query_num",value:"",type:"text"},
        { filedName: "数据名称", filedId:"query_name",value:"",type:"text"},
        { filedName: "数据类型", filedId: "query_type", value: dict.main_data_type,type:"select"},
    ];
    //构建组件初始化参数
    var fileOpt = {
        //自定义标识id（所有生成的元素的id都会以此开头，以防html节点互相污染）
        flagId: "loserStarDataSelect",
        //查询条件配置（目前支持text和select两种组件）
        queryFiledList: queryFiledList,
        //点击查询按钮时的回调方法（查到数据后需调用renfreshTableData方法把数据传进去进行table的刷新）
        clickQueryCallback: querSelectData,
        //配置table展示的数据的字段
        displayTableFiled: [{ name: "数据编号", id: "num" }, { name: "数据名称", id: "name" }, ],
        //配置数据的主键字段
        querSelectDataPrimaryKey:"data_id",
        //点击单条数据的添加按钮时候的回调方法（该方法会把数据的主键传递进去）
        clickRowAddCallback:selectedMainDataRow
    }
    addMainDataWindow = new loserStarDataSelectBootstrapWindow(fileOpt);
    addMainDataWindow.open();//打开窗口
    addMainDataWindow.renfreshTableData([]);//刷新数据
*/
/**
 * 构造方法
 * @param {*} opt 配置项

 * @returns 
 */
var loserStarDataSelectBootstrapWindow = function (opt) {
    this.init(opt);
}

loserStarDataSelectBootstrapWindow.prototype = {
    constructor: loserStarDataSelectBootstrapWindow,
    init: function (opt) {
        this.flagId = opt.flagId;//自定义标识id（所有生成的元素的id都会以此开头，以防html节点互相污染）
        this.queryFiledList = opt.queryFiledList;//查询的条件
        this.clickQueryCallback = opt.clickQueryCallback;//点击查询时候的方法
        this.displayTableFiled = opt.displayTableFiled;//table列表显示的字段有哪些
        this.querSelectDataPrimaryKey = opt.querSelectDataPrimaryKey;//指定唯一标识字段
        this.clickRowAddCallback = opt.clickRowAddCallback;//点击每一行数据的添加按钮时候触发的回调方法，会传入数据的主键id
        //执行一些初始化的方法
        this.createElement();//初始化时候就执行一次渲染html
    },
    //渲染必要的html
    createElement: function () {
        var self = this;
        var text = "";
        text += "<!-- loserStarDataSelectBootstrapWindow--begin -->";
        text += "        <div id=\"" + self.flagId + "_dataSelectWindow\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">";
        text += "            <div class=\"modal-dialog modal-lg\" role=\"document\">";
        text += "                <div class=\"modal-content\">";
        text += "                    <div class=\"modal-header\">";
        text += "                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span";
        text += "                                aria-hidden=\"true\">×</span>";
        text += "                        </button>";
        for (var i = 0; i < self.queryFiledList.length; i++) {
            var filedTmp = self.queryFiledList[i];
            if ("text" == filedTmp.type){
                text += "                        <div class=\"form-group\">";
                text += "                            <label for=\"" + filedTmp.filedId +"\">" + filedTmp.filedName +"</label>";
                text += "                            <input type=\"text\" class=\"form-control\" id=\"" + filedTmp.filedId + "\" placeholder=\"\" value=\"" + (filedTmp.value ? filedTmp.value:"") +"\">";
                text += "                        </div>";
            }
            if ("select" == filedTmp.type){
                text += "                        <div class=\"form-group\">";
                text += "                            <label for=\"" + filedTmp.filedId +"\">" + filedTmp.filedName +"</label>";
                text += "                            <select name=\"type\" id=\"" + filedTmp.filedId +"\" class=\"form-control\">";
                var filedTmpValue = filedTmp.value;
                for (var j = 0; j < filedTmpValue.length;j++){
                    var valueList = filedTmpValue[j];
                    text += "                                <option value=\"" + valueList.value +"\">" + valueList.name +"</option>";
                }
                text += "                            </select>";
                text += "                        </div>";
            }
        }

        text += "                        <button id=\"" + self.flagId +"_queryBtn\" type=\"button\" class=\"btn btn-success\">搜索</button>";
        text += "                    </div>";
        text += "                    <div class=\"modal-body\"  style=\"height: 500px; overflow: auto;\">";
        text += "                        <table id=\"" + self.flagId +"_dataTable\" class=\"table table-bordered table-condensed\">";
        text += "                            <thead>";
        text += "                                <tr>";
        for (j = 0; j < self.displayTableFiled.length; j++) {
            var jTmp = self.displayTableFiled[j];
            text += "                                    <th>" + jTmp.name + "</th>";
        }
        text += "                                    <th>操作</th>";
        text += "                                </tr>";
        text += "                            </thead>";
        text += "                            <tbody id=\"" + self.flagId +"_dataList_tbody\">";

        text += "                            </tbody>";
        text += "                        </table>";
        text += "                    </div>";
        text += "                    <div class=\"modal-footer\">";
        text += "                        <button id=\"" + self.flagId +"_CloseBtn\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭</button>";
        text += "                    </div>";
        text += "                </div>";
        text += "                <!-- /.modal-content -->";
        text += "            </div>";
        text += "            <!-- /.modal-dialog -->";
        text += "        </div>";
        text += "        <!-- /.modal -->";
        text += "        <!-- loserStarDataSelectBootstrapWindow--end -->";

        $("body").append(text);

        //绑定按钮的事件
        $("#" + self.flagId +"_queryBtn").on("click", function () {
            self.clickQueryCallback();
        });
    },
    //打开窗口
    open: function () {
        var self = this;
        $("#" + self.flagId + "_dataSelectWindow").modal({
            keyboard: false,
            backdrop: 'static'
        });

        //打开完之后的时间
        $("#" + self.flagId + "_FileWindow").on("shown.bs.modal", function (e) {

        });
    },
    //获取查询条件
    getQueryParam:function(){
        var self = this;
        var queryParam ={};
        for (var i = 0; i < self.queryFiledList.length;i++){
            var tmp = self.queryFiledList[i];
            queryParam[tmp.filedId] = $("#" + tmp.filedId +"").val();
        }
        return queryParam;
    },
    //刷新table列表数据
    renfreshTableData:function(list){
        var self = this;
        var text = "";
        for(var i=0;i<list.length;i++){
            var tmp = list[i];
            text += "                                <tr>";
            for (j = 0; j < self.displayTableFiled.length;j++){
                var jTmp = self.displayTableFiled[j];
                text += "                                    <td>" + tmp[jTmp.id] +"</td>";
            }
            text += "                                    <td>";
            text += "                                        <button id=\"" + tmp[self.querSelectDataPrimaryKey] + "_addBtn\" data-id=\"" + tmp.data_id +"\" type=\"button\" class=\"btn btn-primary\" onclick=\"\">添加</button>";
            text += "                                    </td>";
            text += "                                </tr>";
        }
        $("#" + self.flagId + "_dataList_tbody").html("");
        $("#" + self.flagId + "_dataList_tbody").html(text);

        for (var i = 0; i < list.length; i++) {
            $("#" + list[i].data_id + "_addBtn").on("click", function (){
                var btn = $(this);
                var data_id = btn.attr("data-id");
                if (self.clickRowAddCallback){
                    self.clickRowAddCallback(data_id);
                }
            })
        }
    }
}