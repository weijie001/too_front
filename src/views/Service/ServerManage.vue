<template>
<div>
  <div>
    <el-table
      :data="tableData"
      :row-style="tableRowStyle"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="服务名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="tag"
        label="服务IP"
        width="180">
      </el-table-column>
      <el-table-column
        prop="time"
        label="服务当前时间">
        <template scope="scope">
            <el-date-picker  type="datetime" clearable :editable="false" v-model="scope.row.time"></el-date-picker>
        </template>
      </el-table-column>
       <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleUpdate(scope.$index, scope.row)">修改服务器时间</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleStop(scope.$index, scope.row)">停止服务</el-button>
          <el-button
          size="mini"
          type="danger"
          @click="handleStart(scope.$index, scope.row)">启动服务</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
  <br>
</div>
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        tableData:[{
            name:"改时服",tag:"192.168.1.10",time:"",color:0
        }],
        value1: '',
        currentRow: null,
      };
    },
 
    mounted:function(){
      this.$store.commit('updateEnvShow', false)
        var param ={
            }
        this.$api.jk.getDate(param).then(res => {
            var length = res.length;
            this.tableData[0].time = res[0]
            if(length>1){
                 this.tableData[0].color = 1;
            }
        });
    },
    methods: {
      handleUpdate(index, row) {
          var str = this.dateFtt("yyyy-MM-dd hh:mm:ss",this.tableData[0].time)
          var param ={
              date:str
            }
          this.$api.jk.setDate(param).then(res => {
            if(res == 0){
                this.$message('修改成功');
            }else{
                this.$message('修改失败');
            }
          });
      },
      handleStop(){
          var param ={
            }
         this.$api.jk.stopServer(param).then(res => {
            if(res == 0){
                this.$message('服务停止...');
            }else{
                this.$message('停止失败');
            }
          });
      },
      handleStart(index, row){
          var param ={
            }
         this.$api.jk.startServer(param).then(res => {
            if(res == 0){
                this.$message('服务启动中，请等待...');
            }else{
                this.$message('启动失败');
            }
          });
      },
      tableRowStyle({row, rowIndex}) {
        let rowBackGround = {};
        debugger
        if(row.color ===1){
            rowBackGround.background = "pink";
            return rowBackGround;
        }
      },
      dateFtt(fmt,date){
          var o = {   
                "M+" : date.getMonth()+1,                 //月份   
                "d+" : date.getDate(),                    //日   
                "h+" : date.getHours(),                   //小时   
                "m+" : date.getMinutes(),                 //分   
                "s+" : date.getSeconds(),                 //秒   
                "q+" : Math.floor((date.getMonth()+3)/3), //季度   
                "S"  : date.getMilliseconds()             //毫秒   
            };   
            if(/(y+)/.test(fmt))   
                fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
            for(var k in o)   
                if(new RegExp("("+ k +")").test(fmt))   
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
            return fmt;   
      }
    }
  }
</script>
<style scoped>
  .tags {
    height: 40px;
    line-height: 50px;
    font-size: 14px;
  }
  .el-table .warning-row {
    background: rgb(54, 8, 128);
  }

  .el-table .success-row {
    background: #50c510;
  }
</style>