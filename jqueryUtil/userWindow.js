var chooseUserWindowSelectedUserList= [];//窗口选中的人的数组集合
var gridFilter = function() {
  var filtervalue = $('#inputValue').val();
  $('#userTreeGrid').jqxTreeGrid('clearFilters');
  var filtertype = 'stringfilter';
  var filtergroup = new $.jqx.filter();
  var filter_or_operator = 8;
  var filtercondition = 'contains';
  var filter = filtergroup.createfilter(
    filtertype,
    filtervalue,
    filtercondition
  );
  filtergroup.addfilter(filter_or_operator, filter);

  var field = 'f_id';
  if (isNaN(filtervalue)) {
    field = 'name';
  }
  $('#userTreeGrid').jqxTreeGrid('addFilter', field, filtergroup);

  $('#userTreeGrid').jqxTreeGrid('applyFilters');

  var viewRows = $('#userTreeGrid').jqxTreeGrid('getView');
  if (viewRows.length > 0 && filtervalue != '') {
    if (viewRows[0].records.length == 1) {
      expandRows(viewRows);
    }
  }
};
function expandRows(rows) {
  for (var i in rows) {
    if (rows[i].records != undefined) {
      $('#userTreeGrid').jqxTreeGrid('expandRow', rows[i].f_id);
      expandRows(rows[i].records);
    }
  }
}

/**
 * 打开多选窗口（返回grid中所有的人）
 * 传入回调方法，回调方法接收选中的人id字符串集合，以逗号分隔
 */
function OpenSelectUserWindow(callBack) {
  chooseUserWindowSelectedUserList= [];
  $('#ok').unbind('click'); //先移除事件再添加
  $('#ok').on('click', function() {
    var rows = $('#choosedUserGrid').jqxGrid('getRows');
    var userIds = '';
    var lst=[];
    $.each(rows, function(i, item) {
      if (item.userId != undefined && item.userId != 'undefined') {
        //很奇怪，不知道为什么表里有undefined，先加这一句观察一段时间看看
        userIds += item.userId + ',';
        lst.push(item.userId);
        chooseUserWindowSelectedUserList.push(item);
      }
    });
    userIds=lst.join(',');
    $('#ok').unbind('click');
    callBack(userIds);
  });
  $('#chooseUserWindow').jqxWindow('open');
}

/**
 * 打开多选窗口（返回grid中选中的人）
 * 传入回调方法，回调方法接收选中的人id字符串集合，以逗号分隔
 */
function OpenSelectUserModeWindow(callBack) {
  chooseUserWindowSelectedUserList= [];
  $('#ok').unbind('click'); //先移除事件再添加
  $('#ok').on('click', function() {
    var rowindexes = $('#choosedUserGrid').jqxGrid('getselectedrowindexes');
    if (rowindexes.length > 0) {
    	 var lst=[];
      var userIds = '';
      for (var i = 0; i < rowindexes.length; i++) {
        var data = $('#choosedUserGrid').jqxGrid('getrowdata', rowindexes[i]);
        userIds += data.userId + ',';
        lst.push(data.userId);
        chooseUserWindowSelectedUserList.push(data);
      }
      userIds=lst.join(',');
      $('#ok').unbind('click');
      callBack(userIds);
    } else {
      alert('请选择人员');
      return;
    }
  });
  $('#chooseUserWindow').jqxWindow('open');
}

/**
 * 打开单选窗口
 * 传入回调方法，回调方法接收选中的人id字符串集合，以逗号分隔
 */
function OpenSelectUserSingleModeWindow(callBack) {
  chooseUserWindowSelectedUserList= [];
  $('#ok').unbind('click'); //先移除事件再添加
  $('#ok').on('click', function() {
    var rowindexes = $('#choosedUserGrid').jqxGrid('getselectedrowindexes');
    if (rowindexes.length == 1) {
      var item = $('#choosedUserGrid').jqxGrid('getrowdata', rowindexes[0]);
      var userIds = item.userId;
      chooseUserWindowSelectedUserList.push(item);
      $('#ok').unbind('click');
      callBack(userIds);
    } else {
      alert('此窗口为单选用户窗口，请选择一个有效的用户数据，不允许选择多个！');
      return;
    }
  });
  $('#chooseUserWindow').jqxWindow('open');
}

/**
 * 打开单选窗口，并指定弹出window的标题名称
 */
function OpenSelectUserSingleModeWindow_title(title,isClear,callBack){
  $('#chooseUserWindow').jqxWindow('setTitle',title);
  OpenSelectUserSingleModeWindow(callBack);
  if(isClear==1){
    initChoosedUserGrid(null,1);
    $('#choosedUserGrid').jqxGrid('clearselection');
  }
}
/**
 * 打开单选窗口，并指定弹出window的标题名称
 */
function OpenSelectUserModeWindow_title(title,isClear,callBack){
  $('#chooseUserWindow').jqxWindow('setTitle',title);
  OpenSelectUserModeWindow(callBack);
  if(isClear==1){
    initChoosedUserGrid(null,1);
    $('#choosedUserGrid').jqxGrid('clearselection');
  }
  
}
/**
 * 
 * @param {*} title 标题
 * @param {*} orgUrl 整个组织机构连接（可以使用 erphrinfo/getHRTreeData.do）
 * @param {*} defaultUserUrl 默认人员的链接
 * @param {*} chooseType 选择类型1有checkbox
 */
function initUserWindow(title, orgUrl, defaultUserUrl, chooseType) {
  $('#chooseDockPanel').jqxDockPanel({
    width: 788,
    height: 400,
    lastchildfill: true,
  });
  $('#chooseUserWindow').jqxWindow({
    autoOpen: false,
    draggable: true,
    resizable: true,
    showCollapseButton: true,
    maxHeight: 500,
    title: title,
    maxWidth: 800,
    minHeight: 200,
    minWidth: 200,
    height: 500,
    width: 800,
    cancelButton: $('#cancel'),
    initContent: function() {
      $('#inputUser').jqxInput({
        placeHolder: '请输入员工编号或姓名',
        height: 23,
        width: 300,
        minLength: 1,
      });
      $('#search').click(function() {
        gridFilter();
      });
      $('input').keydown(function(args) {
        if (args.key == 'Enter') {
          gridFilter();
        }
      });
      $('#ok').jqxButton({
        width: '65px',
      });

      $('#cancel').jqxButton({
        width: '65px',
      });
      $('#ok').focus();

      $('#jqxExpander').jqxExpander({
        showArrow: false,
        toggleMode: 'none',
        width: '300px',
        height: '369px',
      });
    },
  });

  //如果不传取数路劲，则加载红塔集团全部组织数据
  if (orgUrl == null) {
    orgUrl = '../plan/getHRTreeData.do';
  }

  var source = {
    dataType: 'json',
    async: true,
    url: orgUrl,
    dataFields: [
      {
        name: 'f_id',
        type: 'string',
      },
      {
        name: 'f_pid',
        type: 'string',
      },
      {
        name: 'name',
        type: 'string',
      },
      {
        name: 'rtype',
        type: 'string',
      },
    ],
    hierarchy: {
      keyDataField: {
        name: 'f_id',
      },
      parentDataField: {
        name: 'f_pid',
      },
    },
    id: 'f_id',
    loadComplete: function(data) {},
    beforeLoadComplete: function(records) {
      for (var i = 0; i < records.length; i++) {
        var imgUrl = '../imgs/common/org.gif';
        if (records[i].rtype == 'P') {
          var imgUrl = '../imgs/common/user.gif';
        }
        records[i].icon = imgUrl;
      }
      return records;
    },
  };

  var dataAdapter = new $.jqx.dataAdapter(source);
  window.winSuSource = source;
  window.winSuDataAdapter = dataAdapter;

  $('#userTreeGrid').jqxTreeGrid({
    width: '100%',
    height: '100%',
    source: dataAdapter,
    icons: true,
    ready: function() {
      $('#userTreeGrid').jqxTreeGrid('expandRow', '12530401');
    },
    editable: true,
    columnsResize: true,
    editable: false,
    sortable: true,
    showHeader: false,
    autoRowHeight: false,
    columns: [
      {
        text: 'f_id',
        dataField: 'f_id',
        width: 150,
        hidden: true,
      },
      {
        text: 'f_pid',
        dataField: 'f_pid',
        width: 150,
        hidden: true,
      },
      {
        text: 'name',
        dataField: 'name',
        width: 280,
      },
      {
        text: 'rtype',
        dataField: 'rtype',
        width: 200,
        hidden: true,
      },
    ],
  });

  $('#userTreeGrid').on('rowDoubleClick', function(event) {
    var args = event.args;
    var row = args.row;

    if (row.rtype == 'P') {
      var rows = $('#choosedUserGrid').jqxGrid('getRows');
      var bFlag = true;
      $.each(rows, function(i, record) {
        if (record.userId == row.f_id) {
          bFlag = false;
        }
      });
      if (bFlag) {
        $('#choosedUserGrid').jqxGrid('addrow', row.f_id, {
          userId: row.f_id,
          userName: row.name,
        });
      }
    }
  });
  initChoosedUserGrid(defaultUserUrl,chooseType);
}

/**
 * 初始化选择人员的grid
 * @param {*} defaultUserUrl 默认显示到列表上的人员链接
 * @param {*} chooseType 选择类型，1checkbox类型
 * @param {*} isClear 是否清空上次所中的项
 */
function initChoosedUserGrid(defaultUserUrl,chooseType){
  var source = {
    datatype: 'json',
    datafields: [
      {
        name: 'userId',
        type: 'string',
      },
      {
        name: 'userName',
        type: 'string',
      },
    ],
    deleterow: function(rowid, commit) {
      commit(true);
    },
  };

  var dataAdapter = new $.jqx.dataAdapter(source);

  $('#choosedUserGrid').jqxGrid({
    width: 480,
    height: '368px',
    sortable: true,
    source: dataAdapter,
    altrows: true,
    editable: true,
    enabletooltips: true,
    columns: [
      {
        text: '人员编号',
        cellsalign: 'center',
        datafield: 'userId',
        width: 130,
        editable: false,
        align: 'center',
      },
      {
        text: '人员姓名',
        cellsalign: 'center',
        editable: false,
        datafield: 'userName',
        align: 'center',
      },
      {
        text: '操作',
        datafield: 'edit',
        columntype: 'button',
        width: 100,
        align: 'center',
        cellsrenderer: function() {
          return '删除';
        },
        buttonclick: function(row) {
          var id = $('#choosedUserGrid').jqxGrid('getrowid', row);
          $('#choosedUserGrid').jqxGrid('deleterow', id);
        },
      },
    ],
  });

  if (defaultUserUrl != null) {
    $.ajax({
      url: defaultUserUrl,
      type: 'POST',
      async: false,
      success: function(data) {
        if (data.length > 0) {
          for (var i in data) {
            $('#choosedUserGrid').jqxGrid('addrow', data[i].userid, {
              userId: data[i].userid,
              userName: data[i].username,
              userType: data[i].usertype,
            });
          }
        }
      },
      error: function(a, b, c) {
        alert('初始化默认人员失败！');
      },
    });
  }
  //是否使用checkbox
  if (chooseType == 1) {
    $('#choosedUserGrid').jqxGrid({
      selectionmode: 'checkbox',
    });
  }
}

function initCheckTree() {
  var bCanCheck = true;
  $('#userTreeGrid').jqxTreeGrid({
    hierarchicalCheckboxes: true,
    checkboxes: true,
  });
  $('#userTreeGrid')
    .on('rowCheck', function(event) {
      var args = event.args;
      var row = args.row;
      var key = args.key;

      if (!bCanCheck) {
      } else {
        if (row.rtype == 'P') {
          var rows = $('#choosedUserGrid').jqxGrid('getRows');
          var bFlag = true;
          $.each(rows, function(i, record) {
            if (record.userId == row.f_id) {
              bFlag = false;
            }
          });
          if (bFlag) {
            $('#choosedUserGrid').jqxGrid('addrow', row.f_id, {
              userId: row.f_id,
              userName: row.name,
            });
          }
        }
      }
    })
    .on('rowUncheck', function(event) {
      var args = event.args;
      var row = args.row;
      var key = args.key;

      if (!bCanCheck) {
      } else {
        var rows = $('#choosedUserGrid').jqxGrid('getRows');
        var bFlag = true;
        for (var i = rows.length - 1; i >= 0; i--) {
          if (row.f_id == rows[i].uid) {
            $('#choosedUserGrid').jqxGrid('deleterow', rows[i].uid);
          }
        }
      }
    })
    .on('rowClick', function(event) {
      var args = event.args;
      var row = args.row;
      var key = args.key;
      if (
        row.f_id == '12530401' ||
        row.f_id == '00005098' ||
        row.f_id == '00005198' ||
        row.f_id == '00005298' ||
        row.f_id == '00005398' ||
        row.f_id == '00008198' ||
        row.f_id == '00002798'
      ) {
        bCanCheck = false;
      } else {
        bCanCheck = true;
      }
    });
}

/**
 * 得到选中的人的数组
 */
function getChooseUserWindowSelectedUserList(){
  return chooseUserWindowSelectedUserList;
}

/**
 * 清空已选的人
 */
function clearUserWindow(){
  // chooseUserWindowSelectedUserList = [];
  //  $('#choosedUserGrid').jqxGrid('clearselection');
  // $('#choosedUserGrid').jqxGrid('updateBoundData');


}