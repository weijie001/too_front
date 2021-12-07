<template>
<div>
    <el-button type="primary"  @click="compare">Compare</el-button>
    <el-button type="primary"  @click="compare2">Compare2</el-button>
    <el-container v-if="compareShow">
    <el-aside width="550px">
        <el-table
            :data="tableData"
            @current-change="handleCurrentChange"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="id"
                v-if="false"
                width="180">
            </el-table-column>
             <el-table-column
                prop="devTable"
                label="devTable"
                width="180">
            </el-table-column>
            <el-table-column
                prop="testTable"
                label="testTable">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleSyncTable(scope.$index, scope.row)">SyncTable</el-button></template>
                    </el-table-column>
        </el-table>
    </el-aside>
    <el-main>
    <el-row :gutter="20">
        <el-col :span="8">
            <el-table
                    :data="tableData2"
                    :row-class-name="tableRowClassName"
                    style="width: 100%">
                    <el-table-column
                        prop="columnName"
                        label="列名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                     prop="dataType"
                    label="数据类型">
                    </el-table-column>
                    <el-table-column
                     prop="nullValue"
                    label="是否为空">
                    </el-table-column>
                    <el-table-column
                     prop="state"
                     v-if="false"
                    label="state">
                    </el-table-column>
                </el-table>
        </el-col>
        <el-col :span="8">
            <el-table
                    :data="tableData3"
                    :row-class-name="tableRowClassName"
                    style="width: 100%">
                    <el-table-column
                        prop="columnName"
                        label="列名"
                        width="180">
                    </el-table-column>
                    <el-table-column
                     prop="dataType"
                    label="数据类型">
                    </el-table-column>
                    <el-table-column
                     prop="nullValue"
                    label="是否为空">
                    </el-table-column>
                     <el-table-column
                     prop="state"
                     v-if="false"
                    label="state">
                    </el-table-column>
                </el-table>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="24">
            <el-input type="textarea" v-model="sql" :disabled="true" autosize></el-input>
        </el-col>
    </el-row>
    </el-main>
    </el-container>
    <el-container v-if="compareShow2">
        <el-aside width="350px">
            <el-progress :percentage="percentage" :color="customColor"></el-progress>
            <el-tag>{{tableStr}}</el-tag>
            <el-table
                :data="tableData4"
                @current-change="handleCurrentChange2"
                style="width: 100%">
                    <el-table-column
                        prop="tableName"
                        label="tableName"
                        width="250">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleSync(scope.$index, scope.row)">Sync</el-button>
                        </template>
                    </el-table-column>
            </el-table>
    </el-aside>
    <el-main>
        <el-row>
        <el-col :span="24" >
            <el-button type="text"  v-clipboard:copy="compare2Sql" v-clipboard:success="onCopy" v-clipboard:error="onError">Copy</el-button>
            <el-input type="textarea" v-model="compare2Sql" :disabled="true" autosize></el-input>
        </el-col>
    </el-row>
    </el-main>
    </el-container>
</div>
</template>
<script>
import { baseUrl } from '@/utils/global'
var timestamp = (new Date()).valueOf()
  export default {
    data() {
      return {
       result:[],
       tableData: [],
        tableData2: [],
        tableData3: [],
        tableData4: [],
        value: '',
        sql:'',
        compareShow:false,
        compareShow2:false,
        compare2Sql:"",
        percentage:0,
        customColor: '#67C23A',
        websock: null,
        wsuri:baseUrl.replace("http","ws")+"/websocket2/"+timestamp,
        compare2Data:[],
        tableStr:""
    }
  },
  created(){
      this.initWebSocket()
  },
  mounted:function(){
       this.$store.commit('updateEnvShow', false)
    },
   methods: {
       onCopy(){
           this.$message.success("copy success")
       },
       onError(){
            this.$message('copy error');
       },
       handleSyncTable(index, row){
           debugger
        var param ={
              id:row.id
            }
        this.$api.jk.tableSql(param).then(res => {
            debugger
            if(res.ret == 0){
                this.$message.success("run sql success")
                this.tableData.splice(index, 1);
                this.tableData2 = [];
                this.tableData3 = [];
                this.sql = ""
            }else{
                this.$message("run sql fail")
                this.sql = res.message
            }
        });
       },
       handleSync(index, row) {
        var param ={
              tableName:row.tableName
            }
        this.$api.jk.execSql(param).then(res => {
            if(res.ret == 0){
                this.$message.success("run sql success")
                this.tableData4.splice(index, 1);
            }else{
                this.$message("run sql fail")
            }
        });
      },
       initWebSocket(){ //初始化weosocket 
　　　　　　　　this.websock = new WebSocket(this.wsuri); 
　　　　　　　　this.websock.onopen = this.websocketonopen;
　　　　　　　　this.websock.onerror = this.websocketonerror;
　　　　　　　　this.websock.onmessage = this.websocketonmessage; 
　　　　　　　　this.websock.onclose = this.websocketclose;
　　　}, 
      websocketonopen() {
　　　　　　　console.log("WebSocket连接成功");
　　　},
      websocketonerror(e) { //错误
 　　　　　　 console.log("WebSocket连接发生错误");
　　　},
      websocketonmessage(e){ //数据接收 
　　　　　　　　//const redata = JSON.parse(e.data);
　　　　　　　　　//注意：长连接我们是后台直接1秒推送一条数据， 
          //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
　　　　　　　　console.log(e); 
debugger
               var str = e.data.split("$");
               this.percentage = parseInt(str[0])
               this.tableStr = str[1]
　　　}, 
     websocketsend(agentData){//数据发送 
　　　　　　　　this.websock.send(agentData); 
　　　},
      websocketclose(){ //关闭 
              this.websock.close()
　　　　　　　　console.log("connection closed"); 
　　　},
       tableRowClassName(val){
           if (val.row.state == "EQUAL") {
                return "warning-row";
            }
        return "success-row";
       },
       handleCurrentChange(val) {
           if(this.result.length >0 ){
               for(var i=0;i<this.result.length;i++){
                if(this.result[i].id == val.id){
                    var state = this.result[i].result;
                    this.sql="";
                if(state == "RIGHT_NOT_EXIST" || state == "LEFT_NOT_EXIST"){
                    this.sql = this.result[i].sql;
                }
                var columns = this.result[i].columns;
                this.tableData2=[];
                this.tableData3=[];
                for(var j=0;j<columns.length;j++){
                    var left = columns[j].left;
                    var right = columns[j].right;
                    var state = columns[j].result;
                    if(state == "RIGHT_NOT_EXIST" || state == "LEFT_NOT_EXIST" || state == "NOT_EQUAL"){
                        this.sql += columns[j].sql+"\n";
                     }
                    this.tableData2.push({columnName:left == null?"":left.name,dataType:left==null?"":left.type,state:columns[j].result});
                    this.tableData3.push({columnName:right == null?"":right.name,dataType:right==null?"":right.type,state:columns[j].result});
                }
                debugger
                var indexs = this.result[i].indexs;
                for(var j=0;j<indexs.length;j++){
                    if(indexs[j].sql!=null){
                        this.sql += indexs[j].sql+"\n";
                     }
                }
                break;
            }
           }
        } 
       },
       handleCurrentChange2(val) {
           this.compare2Sql="";
           for(var i=0;i<this.compare2Data.length;i++){
               if(this.compare2Data[i].tableName == val.tableName){
                   var sqls = this.compare2Data[i].execSqls;
                   for(var j=0;j<sqls.length;j++){
                       this.compare2Sql +=sqls[j]+"\n";
                   }
                   break;
               }
           }
       },
       compare2(){
           this.compareShow=false;
           this.compareShow2=true;
           this.percentage=0;
           this.$api.jk.compare2({userId:timestamp}).then(res => {
               debugger
                if(res.ret == 0){
                    this.tableData4=[]
                    this.compare2Data = res.data;
                    for(var i=0;i<res.data.length;i++){
                        this.tableData4.push({tableName:res.data[i].tableName})
                    }
                }else{
                    this.$message("compare fail")
                    this.compare2Sql = res.message
                }
           });
       },
    compare(){
        this.compareShow2=false;
        this.compareShow=true;
        this.$api.jk.compare({}).then(res => {
            debugger
            if(res.ret == 0){
               this.result = res.data;
               this.tableData=[];
               debugger
               if(this.result.length>0){
                   for(var i=0;i<this.result.length;i++){
                      var value =  this.result[i];
                      this.tableData.push({id:value.id,devTable:value.left==null?"":value.left.name,testTable:value.right==null?"":value.right.name});
                    }
               }
            }
          })
        },
    }
  }
</script>
<style>
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #FF9999;
  }
</style>