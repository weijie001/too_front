<template>
<div>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">
                    <div>
                        <el-form>
                            <el-form-item >
                                <el-upload
                                    class="upload-demo"
                                    :action="url"
                                    multiple
                                    :limit="1"
                                    :on-remove="fileRemove"
                                    :on-success="success"
                                    :on-progress="fileProgress"
                                    :on-exceed="handleExceed">
                                    <el-button size="small" type="primary">导入</el-button>
                                </el-upload>
                            </el-form-item>
                            <el-form-item v-show="progressShow">
                                <el-progress :percentage="percentage" :color="customColor" v-show="progressShow"></el-progress>
                            </el-form-item>
                            <el-form-item  v-show="show">
                                <el-link  type="primary" @click="downSql">{{sqlName}}</el-link>
                            </el-form-item>
                                    <!-- <el-form-item >
                                        <el-button type="primary" v-show="show" v-clipboard:copy="sqls" v-clipboard:success="onCopy" v-clipboard:error="onError">复制</el-button>
                                    </el-form-item>
                                    <el-form-item label="控制台" v-show="errorShow">
                                        <el-input type="textarea" v-model="errors" v-show="errorShow" rows=5></el-input>
                                    </el-form-item>-->
                        </el-form>
                    </div>
                    <div>
                        <el-collapse v-show="show">
                        <el-collapse-item v-for="(item, index) in tables" :title="item.tableName+'('+item.tableData.length+')'" :key="index">
                            <el-table :data="item.tableData"  :cell-style="cellStyle" max-height="500">
                                <el-table-column :prop="item" v-for="(item, index) in item.colunmName" :key="index" :label="item">
                                </el-table-column>
                                <el-table-column prop = "test" label="test" v-if="testShow">
                                </el-table-column>
                                <el-table-column label="operate">
                                    <template slot-scope="scope">
                                        <el-button
                                        size="mini"
                                        type="primary"
                                        @click="handleExecute(scope.$index, scope.row,item.tableName,index)">update</el-button>
                                    </template>
                                    </el-table-column>
                            </el-table>
                        </el-collapse-item>
                        </el-collapse>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-dark">
                    <el-form>
                        <el-form-item >
                             <el-button size="small" type="primary"  @click="runSql">执行</el-button>
                        </el-form-item>    
                        <el-form-item  v-show="errorShow">
                            <el-input type="textarea" v-model="errors" v-show="errorShow" rows=5></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
    <div>
    
    </div>
</div>
</template>

<script>
import { baseUrl } from '@/utils/global'
var timestamp = (new Date()).valueOf()
export default {
  data(){
    return  {
        progressShow: false,
        customColor: '#67C23A',
        percentage:0,
        websock: null,
        wsuri:baseUrl.replace("http","ws")+"/websocket/"+timestamp,
        tables:[
        ],
        sqlName:'',
        sqls:'',
        errors:'',
        show:false,
        errorShow:false,
        testShow:false,
        tableShow:true,
        url:baseUrl+'/dataC/uploadFile?userId='+timestamp,
    }
  },
  mounted:function(){
       this.$store.commit('updateEnvShow', true)
  },
  created(){
      this.initWebSocket()
  },
  destroyed: function() {
　　　　//页面销毁时关闭长连接
　　　　　　this.websocketclose();
　　　　},
  methods: {
      handleExecute(index, row,tableName,num){
          debugger
          var param = {
              "row":JSON.stringify(row),
              "tableName":tableName
          }
          this.$api.content.executeSql(param).then(res => {
              this.$message.success("success!")
              this.tables[num].tableData.splice(index, 1);
          })
      },
      fileRemove(file){
          this.percentage = 0
          this.progressShow = false;
      },
      fileProgress(file){
        this.progressShow = true;
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
                this.percentage = parseInt(e.data)
　　　}, 
     websocketsend(agentData){//数据发送 
　　　　　　　　this.websock.send(agentData); 
　　　},
      websocketclose(){ //关闭 
              this.websock.close()
　　　　　　　　console.log("connection closed"); 
　　　},
      downSql(){
          var url2 = baseUrl+"/dataC/downSql?sqlName="+this.sqlName;
          window.location.href = url2;
      },
      runSql(){
        var param={
            sqlName:this.sqlName
        }
        this.$api.content.runSql(param).then(res => {
            this.$message.success("success")
            for(var i=0;i<res.length;i++){
                this.errors = this+res[i]+"\n"
            }
        });
      },
      cellStyle ({ row, column, rowIndex, columnIndex }) {
        // 状态列字体颜色
        if (row.test[columnIndex] ==1) {
            return 'background: #FFB5B5'
        } else if(row.test[columnIndex] ==2){
            return 'background: #CECECE'
        }
        },
        addClass({row,column,rowIndex,columnIndex}){
            if (row.index[columnIndex] ==1) {
                return 'cell-grey';
            } 
        },
      onCopy(e){
          this.$message.success("内容已复制到剪切板！")
      },
      onError(e){
          this.$message.error("抱歉，复制失败！")
      },
      success(res){
          this.tables = []
          this.sqlName=res.sqlName
          debugger
           for(var k=0;k<res.data.length;k++){
                var tData = res.data[k]
                var name = tData.name;
                //列
               this.tables.push({tableName:name,colunmName:[],tableData:[]});
               for(var i=0;i<tData.columns.length;i++){
                  this.tables[k].colunmName.push(tData.columns[i])
               }
               for(var i=0;i<tData.data.length;i++){k
                 var obj = {};
                 var tags=[];
                 for(var j=0;j<tData.data[i].cells.length;j++){
                     var key = tData.data[i].cells[j].key;
                     obj[key]=tData.data[i].cells[j].value
                     var tag = tData.data[i].cells[j].tag
                     tags.push(tag)
                 }
                 obj["test"] = tags
                 this.tables[k].tableData.push(obj)
             }
          }
          this.sqls=''
          this.errors = '';
          if(res.sqls.length>0){
            this.show = true
            for(var i=0;i<res.sqls.length;i++){
              this.sqls = this.sqls+res.sqls[i]+"\n"
            }
          }else{
              this.show = false
              this.$message('无数据');
          }
          if(res.errors.length>0){
              this.errorShow = true
            for(var i=0;i<res.errors.length;i++){
              this.errors = this.errors+res.errors[i]+"\n"
            }
          }else{
              this.errorShow = false
          }
          
          
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      }
  }
}
</script>

<style scoped>
.cell-grey{
    background: #EA1B29;
}
.el-row {
    margin-bottom: 20px;
    
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .bg-purple-dark {
    background: #e2e5e9;
  }
</style>