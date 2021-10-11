
<template>
  <div>
    <el-form :inline="true" :model="ruleForm">
        <el-form-item>
          <el-autocomplete
            class="inline-input"
            v-model="tableName"
            :fetch-suggestions="querySearch"
            placeholder="请输入tableName"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="query('ruleForm')">查询</el-button>
        </el-form-item>
    </el-form>
    <el-button size="mini" @click="handleAdd()" type="primary">Add</el-button>
    <el-table
      ref="mytable"
      :data="table_data"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="radio" type="index" width="50"></el-table-column>
      <el-table-column v-if="selection" type="selection" width="55"></el-table-column>
      <el-table-column
        align="center"
        v-for="(item,index,key) in table_columns"
        :item="item"
        :key="key"
        :index="index"
        :label="item.label"
      >
        <template slot-scope="scope">
          <el-input
            v-if=" scope.row.edit"
            size="small"
            v-model="scope.row[item.prop]"
            :placeholder="'请输入'+item.label"
          ></el-input>
          <span v-if="  !scope.row.edit">{{scope.row[item.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- 全局控制的编辑 -->
          <div v-if="is_edit&&scope.row.add==undefined" style="display: inline-block;">
            <!-- 编辑 -->
            <el-button
              size="mini"
              v-if="!scope.row.edit"
              @click="handleEdit(scope.$index, scope.row)"
              type="primary"
            >Edit</el-button>
            <!-- 保存 -->
            <el-button
              size="mini"
              type="success"
              :plain="true"
              v-if="scope.row.edit"
              @click="handleSave(scope.$index, scope.row)"
            >Save</el-button>
          </div>
          <!-- 添加控制 -->
          <div v-if="scope.row.add!=undefined&&scope.row.add" style="display: inline-block;">
            <!-- 保存 -->
            <el-button
              size="mini"
              type="success"
              :plain="true"
              v-if="scope.row.edit"
              @click="handleSave(scope.$index, scope.row)"
            >Save</el-button>
          </div>
          <!-- 全局控制删除 -->
          <el-button
            size="mini"
            v-if="is_delete&&scope.row.add==undefined"
            :plain="true"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-show="show"
        class="my_pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 20, 50]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        ></el-pagination>
  </div>
</template>
<script>
export default {
  mounted:function(){
       this.$store.commit('updateEnvShow', true)
  },
  methods: {
    querySearch(queryString, cb) {
          var csvS = this.csvS;
          cb(csvS);
    },
    query(formName){
      debugger
      if(this.tableName == ""){
        this.$message('请输入表名');
      }else{
        this.getData("1",this.size)
      }
        
    },
    handleSizeChange(val){
      this.size = val
      this.getData(this.current,this.size)
    },
    handleCurrentChange(val){
        this.getData(val,this.size)
    },
    getData(page,pageRow){
      var dataArray = [];
      this.table_data = [];
      this.table_columns = [];
      var param = {
        page:page,
        pageRow:pageRow,
        tableName:this.tableName
      }
      this.$api.content.getTableData(param).then(res => {
        for(var i=0;i<res.columns.length;i++){
          this.table_columns.push({prop:res.columns[i],label:res.columns[i]})
        }
        var data = res.pageList;
        this.total = data.totalRows
        this.current = data.page
        this.show = true;
        for(var i=0;i<data.list.length;i++){
          var obj = data.list[i];
          dataArray.push(obj)
        }
        if (dataArray.length > 0) {
          //添加编辑事件
          for (var index in dataArray) {
            dataArray[index]["edit"] = false;
            this.table_data.push(dataArray[index]);
          }

          if (Object.keys(this.new_date_json).length === 0) {
            //新增时，初始化数据结构
            this.initAddDataJson(dataArray[0]);
          }
        }
        console.log("this.tableData:", this.table_data);
      })
    },
    //隔行变色
    tableRowClassName() {
      //选取DOM节点
      var trs = this.$refs.mytable.$el
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");
      for (var i in trs) {
        if (i % 2 == 0) {
          //当隔行变色未true时改变颜色
          if (this.space_color) {
            trs[i].style.backgroundColor = "#f0f9eb";
          } else {
            trs[i].style.backgroundColor = "";
          }
        }
      }
    },

    //多选框
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log("selection:", this.multipleSelection);
    },
    //编辑
    handleEdit(index, row) {
      console.log(index, row);
      row.edit = true;
    },
    //删除
    handleDelete(index, row) {
      console.log(index, row);

      this.table_data.splice(index, 1);
      var param = {
              "row":JSON.stringify(row),
              "tableName":this.tableName
      }
      this.$api.content.deleteTableData(param).then(res => {
        this.$message({
          message: "删除成功！",
          type: "success"
        });
      })
    },
    //保存
    handleSave(index, row) {
      console.log(index, row);
      row.edit = false;
      delete this.table_data[index].add;
      var param = {
              "row":JSON.stringify(row),
              "tableName":this.tableName
      }
      this.$api.content.executeSql(param).then(res => {
        this.$message({
          message: "保存成功！",
          type: "success"
        });
      })
      
    },
    handleAdd() {
      var addDataJson = {};
      for (var key in this.new_date_json) {
        if (key === "edit") {
          delete addDataJson[key];
        } else if (key === "add") {
          delete addDataJson[key];
        } else {
          addDataJson[key] = "";
        }
      }
      addDataJson.edit = true;
      addDataJson.add = true;
      this.table_data.push(addDataJson);
    },
    //初始化编辑属性
    initEditAttribute() {
      var self = this;
      var edit = self.edit;
      //this.getData(1,10)
    },
    initAddDataJson(dataArray) {
      //新增时，初始化数据结构
      var dataJson = dataArray;
      var newDateJson = {};
      for (var key in dataJson) {
        if (key === "edit") {
          newDateJson[key] = "true";
        } else {
          newDateJson[key] = "";
        }
      }
      newDateJson["add"] = true;
      this.new_date_json = newDateJson;
    }
  },
  mounted: function() {
     this.$api.content.getAllTables().then(res => {
       for(var i=0;i<res.length;i++){
          this.csvList.push(res[i].TABLE_NAME);
       }
       
     })
    this.initEditAttribute();
    //确保方法在页面渲染后调用
    this.$nextTick(function() {
      /////方法
      this.tableRowClassName();
    });
  },
  watch: {
    tableName:{
      handler: function() {
        this.csvS = [];//这是定义好的用于存放下拉提醒框中数据的数组
          var len = this.csvList.length;//csvList是页面初始化时得到的初始全部数据
          var arr = [];
          for (var i = 0; i < len; i++) {//根据输入框中inputName的值进行模糊匹配
            if (this.csvList[i].indexOf(this.tableName) >= 0) {
              arr.push(this.csvList[i]);//符合条件的值都放入arr中
            }
          }
          console.log(arr);
          
          //el-autocomplete元素要求数组内是对象，且有value属性，此处做一个格式调整
          for (var i = 0; i < arr.length; i++) {
            var obj = { value: "" };
            obj.value = arr[i];
            this.csvS.push(obj);
          }
      }
    },
    space_color: function() {
      //监听数据变化
      this.$nextTick(function() {
        /////方法
        this.tableRowClassName();
      });
    },
    table_data: function() {
      //监听数据变化f
      this.$nextTick(function() {
        /////方法
        this.tableRowClassName();
      });
    }
  },
  data() {
    return {
      csvList:[],
      tableName:'',
      ruleForm: {},
      new_date_json: {}, //数据结构
      multipleSelection: [], //复选框，数据
      is_edit: true, //是否可编辑
      is_delete: true, //是否可删除
      selection: true, //是否需要复选框
      radio: false, //单选变色
      space_color: true, //隔行变色
      current:1,
      size:10,
      show:false,
      total:1000,
      //表头信息
      table_columns: [
      ],
      //表格数据
      table_data: [
      ]
    };
  }
};
</script>
<style scoped>
</style>