<template>
<div>
  <div class="tag">
    <el-tag @click="getTeamInfo">{{teamId}}</el-tag>
  </div>
  <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position= "left" label-width="100px" class="demo-ruleForm">
      <el-form-item label="PB" prop="pb">
          <el-select placeholder="请选择PB" v-model="ruleForm.pb" @change="getPbParam">
					<el-option v-for="(item,index) in ruleForm.pbItems" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
      </el-form-item>
      <el-form-item label="URL" prop="uri">
        <el-select placeholder="请选择URL" v-model="ruleForm.uri" @change="getParam">
					<el-option v-for="(item,index) in ruleForm.items" :key="index" :label="item.label" :value="item.value"></el-option>
				</el-select>
      </el-form-item>
      <el-form-item label="入参" prop="input">
        <el-input type="text" v-model="ruleForm.req" :disabled="true" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item label=""  prop="param">
        <el-input type="textarea" v-model="ruleForm.param" autosize></el-input>
      </el-form-item>
      <el-form-item label="出参" prop="output">
        <el-input type="text" v-model="ruleForm.res" :disabled="true" style="width:250px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">SEND</el-button>
      </el-form-item>
        <hr>
      <el-form-item label="返回结果" prop="result">
        <el-input type="textarea" v-model="ruleForm.result" :disabled="true" autosize></el-input>
      </el-form-item>
      </el-form>
  </div>
  <div>
    <el-dialog
    title="球队信息"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="ruleForm2" label-position= "left" label-width="100px" class="demo-ruleForm">
      <el-form-item label="球队名" prop="teamName">
        <el-input type="text" v-model="ruleForm2.teamName"  style="width:250px" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="分表ID" prop="tableId">
        <el-input type="text" v-model="ruleForm2.tableId"  style="width:250px" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </el-dialog>
  </div>
</div>
</template>
<script>
 var myData = {
          res:'',
          req:'',
	        pb: '',
          uri:'',
          pbItems:[],
          items: [],
          allItem:[],
          param: '{}',
          result:''
          
}
  export default {
    data() {
      return {
        ruleForm: myData,
        ruleForm2:{
          teamName:'',
          tableId:'',
        },
        teamId:'',
        dialogVisible: false,
        rules: {
          pb: [
            { required: true, message: '请选择PB', trigger: 'change' }
          ],
          uri: [
            { required: true, message: '请选择URL', trigger: 'change' }
          ]
        }
      };
    },
    mounted:function(){
        this.teamId =this.$store.state.tab.teamId
        this.$api.jk.selectUrl().then(res => {
          var length = res.length;
          const set = new Set();
          for(var i=0;i<length;i++){
            set.add(res[i].pb);
            myData.allItem.push({value:res[i].uri,label:res[i].uri,res:res[i].res,req:res[i].req,pb:res[i].pb})
          }
          for(let key of set.keys()) {
            myData.pbItems.push({value:key,label:key})
          }
        });
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      getTeamInfo(){
        if(this.teamId == "请选择账号"){
          this.$router.push("/interface/user")
        }else{
            this.dialogVisible = true
            var param = {
              teamId:this.teamId
            }
            this.$api.jk.getTeamInfo(param).then(res => {
              this.ruleForm2.teamName = res.team_name
              this.ruleForm2.tableId =  res.table_id
            })
        }
        
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var account = sessionStorage.getItem("account");
            debugger
            var token = sessionStorage.getItem("token");
            var env = sessionStorage.getItem("env");
            if(account&&token&&env){
              var jsonObj =JSON.parse(this.ruleForm.param)
              var str = JSON.stringify(jsonObj)
              var param = { 
              "req":this.ruleForm.req == undefined?"":this.ruleForm.req,
              "res":this.ruleForm.res == undefined?"":this.ruleForm.res,
              "uri":this.ruleForm.uri,
              "data":str,
              "account":account,
              "token":token,
              "env":env
              }
              debugger
              this.$api.jk.getData(param).then(res => {
                debugger
                  var jsonStr = JSON.stringify(res, null, 4)
                  myData.result = jsonStr
              })
            }else{
                this.$confirm('请设置账号', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                  }).then(() => {
                    this.$router.push("/interface/user")
                  }).catch(() => {
                        
                  });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      getPbParam(pb){
        myData.param ='{}'
        myData.items = [];
        myData.uri = '';
        for(var i=0;i<myData.allItem.length;i++){
          if(myData.allItem[i].pb == pb){
            myData.items.push({value:myData.allItem[i].value,label:myData.allItem[i].value,res:myData.allItem[i].res,req:myData.allItem[i].req,pb:myData.allItem[i].pb})
          }
        }
      },
      getParam(uri){
        myData.param ='{}'
        for(var i=0;i<myData.items.length;i++){
            if(myData.items[i].value == uri){
              myData.res = myData.items[i].res;
              myData.req = myData.items[i].req;
              break;
            }
        }
        if(myData.req !=""){
          var param = {"req":myData.req}
                  this.$api.jk.getInputParam(param).then(res => {
                    debugger
                    var jsonStr = JSON.stringify(res, null, 4)
                      myData.param = jsonStr
                  })
        }
      },
      test(){

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
</style>