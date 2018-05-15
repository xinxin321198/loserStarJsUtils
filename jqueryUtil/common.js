/**
 * 把某个checkbox里选中的值以逗号分隔放入第二个参数的元素的value上
 * @param checkBoxName
 * @param strSelector
 * @returns
 */
var checkedBoxToStr = function(checkBoxSelector, strSelector) {
    var accessoryTypeList = $(checkBoxSelector);
    var attachedListStr = "";
    accessoryTypeList.each(function() {
        if (this.checked) {
            attachedListStr += this.value;
            attachedListStr += ",";
        }
    });
    attachedListStr = attachedListStr.substring(0, attachedListStr.length - 1);
    $(strSelector).val(attachedListStr);
};
/**
 * 把某个元素的value里的值取出来（以逗号分隔的字符串），设置让checkbox选中
 * @param checkBoxName
 * @param strSelector
 * @returns
 */
var strToCheckedBox = function(checkBoxSelector, strSelector) {
    var accessoryTypeList = $(strSelector).val();
    var checkBoxList = $(checkBoxSelector);
    var attachedArray = accessoryTypeList.split(",");
    for (var i = 0; i < attachedArray.length; i++) {
        checkBoxList.each(function() {
            if (this.value == attachedArray[i]) {
                this.setAttribute("checked", "checked");
            }
        });
    }
};

/**
 * 根据勾选checkbox，隐藏显示对应的tab
 * selector tab的外层div的选择器（包裹着navigation和具体的tab）
 * 此方法依赖bootstrap的Tab插件
 * @param selector tab的外层div的选择器（包裹着navigation和具体的tab）
 * @param checkBoxSelector 用来勾选的checkbox的选择器
 * @returns
 */
var hideShowTab = function(selector, checkBoxSelector) {
    //初始化Nav tabs样式，全隐藏
    $(selector).attr("class", "hidden");
    $("#Nav0").attr("class", "hidden");
    $("#Nav1").attr("class", "hidden");
    $("#Nav2").attr("class", "hidden");
    $(checkBoxSelector + ":checked").each(function() {
        var tabIndex = $(this).val();
        $(selector).removeClass("hidden"); //取消整个navList隐藏
        $("#Nav" + tabIndex).removeClass("hidden"); //根据勾选来决定是否显示某个nav
        $("#tabList #Nav" + tabIndex + " a").tab("show"); //插件命令，出发点击某个nav的超链接，显示实际内容
    });
};

//勾选副表方法定义
var checkedAccessoryType = function() {
    checkedBoxToStr("input.accessoryType", "#attachedList"); //勾选checkbox，然后把值以逗号分隔放在某个元素的value上
    hideShowTab("#fileNavList", "input.accessoryType");
};

/**
 * 让select元素中的某个option被选中
 *  @param selector  select元素的选择器
 * @param value 需要选中的option的值
 * @returns
 */
var selectedOption = function(selector, value) {
    var yearSelect = $(selector)[0];
    for (var i = 0; i < yearSelect.options.length; i++) {
        var tmp = yearSelect.options[i].value;
        if (tmp == value) {
            yearSelect.options[i].selected = "selected";
            break;
        }
    }
};
