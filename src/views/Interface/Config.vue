<template>
<div class="config">
  <div>
    <el-button type="primary" @click="reboot">重启服务</el-button>
  </div>
  <hr>
  <div>
    <el-upload
    class="upload-demo"
    :action="url"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="2"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传jar文件，且不超过500kb</div>
    </el-upload>
  </div>
  <!--<hr>
   <div>
    <el-upload
    class="upload-demo"
    :action="url2"
    :on-preview="handlePreview2"
    :on-remove="handleRemove2"
    :before-remove="beforeRemove2"
    multiple
    :limit="100"
    :on-exceed="handleExceed2"
    :file-list="fileProtoList">
    <el-button size="small" type="primary">点击上传</el-button>
    <div slot="tip" class="el-upload__tip">只能上传proto文件，且不超过500kb</div>
    </el-upload>
  </div> 
  <hr>-->
</div>
</template>

<script>
import { baseUrl } from '@/utils/global'
var myData = {
  fileList:[],
  fileProtoList:[],
  tableTreeDdata: [],
  url:baseUrl+'/config/uploadFile?dir=config',
  url2:baseUrl+'/config/uploadFile?dir=proto',
}
export default {
  data(){
    return myData
  },
  mounted:function(){
    this.$store.commit('updateEnvShow', false)
    this.fileList = [];
    this.$api.jk.getConfigFile().then(res => {
      for(var i=0;i<res.length;i++){
        if(res[i].type == 1){
          for(var j=0;j<res[i].fileNames.length;j++){
            this.fileList.push({name:res[i].fileNames[j],url:"url"});
          }
        }else{
          for(var j=0;j<res[i].fileNames.length;j++){
            this.fileProtoList.push({name:res[i].fileNames[j],url:"url"});
          }
        }
      }
    })
  },
   methods: {
      reboot(){
        this.$api.config.rebootServer().then(res => {
            this.$message.success("服务已重启，刷新页面使用")
        });
      },
      handleRemove(file, fileList) {
        this.fileList = fileList;
        var fileName = file.name;
        var data ={"fileName":fileName,"dir":"config"};
        this.$api.jk.deleteFile(data).then(res => {

        });
        console.log(file, fileList);
      },
      handleRemove2(file, fileList) {
        this.fileProtoList = fileList;
        var fileName = file.name;
        var data ={"fileName":fileName,"dir":"proto"};
        this.$api.jk.deleteFile(data).then(res => {

        });
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handlePreview2(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      handleExceed2(files, fileList) {
        this.$message.warning(`当前限制选择 100 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      beforeRemove2(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    }
}
</script>

<style scoped lang="scss">

</style>