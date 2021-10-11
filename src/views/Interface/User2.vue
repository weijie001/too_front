<template>
<div>
  <div class="tag">
    <el-tag >{{teamId}}</el-tag>
  </div>
  <div>
    <el-table
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="180">
      </el-table-column>
      <el-table-column
        prop="account"
        label="account"
        width="180">
      </el-table-column>
      <el-table-column
        prop="env"
        label="env">
      </el-table-column>
       <el-table-column label="操作">
      <template slot-scope="scope">
    
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
  <br>
  <div>
    <el-button type="primary" @click="dialogVisible = true">新增</el-button>
  </div>
    <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position= "left" label-width="100px" class="demo-ruleForm">
      <el-form-item label="ACCOUNT" prop="account">
        <el-input type="text" v-model="ruleForm.account"  style="width:250px"></el-input>
      </el-form-item>
      <el-form-item label="ENV" prop="env">
        <el-input type="text" v-model="ruleForm.env"  style="width:250px"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="add('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
 var myData = {
          account:'',
	      env: ''
}
  export default {
    data() {
      return {
        dialogVisible: false,
        ruleForm: myData,
        tableData:[],
        currentRow: null,
        rules: {
          account: [
            { required: true, message: '请输入accout', trigger: 'change' }
          ],
          env: [
            { required: true, message: '请输入IP+PORT', trigger: 'change' }
          ]
        }
      };
    },
    computed:{
      teamId: {
        get () { return this.$store.state.tab.teamId },
        set (val) { this.$store.commit('updateTeamId', val) }
        }
    },
    mounted:function(){
      this.$store.commit('updateEnvShow', false)
      myData.account = sessionStorage.getItem("account");
	    myData.env = sessionStorage.getItem("env")
      this.teamId =this.$store.state.tab.teamId
      this.tableData=[];
      this.$api.config.getAccount().then(res => {
        for(var i=0;i<res.length;i++){
          debugger
          this.tableData.push({id:res[i].id,account:res[i].account,env:res[i].env})
        }
      })
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleEdit(index, row){

      },
      handleDelete(index, row) {
        var param ={
              id:row.id
            }
        this.$api.config.deleteAccount(param).then(res => {
            this.$message.success("删除成功！")
            this.tableData.splice(index, 1);
        });
      },
      handleCurrentChange(val) {
        this.currentRow = val;
        myData.account = val.account;
	      myData.env = val.env;
        sessionStorage.setItem("account",myData.account);
		    sessionStorage.setItem("env",myData.env);
        var param ={
              account:myData.account,
              env:myData.env
            }
        this.$api.jk.loginValid2(param).then(res => {
          debugger
          if(!res.ret){
            this.teamId = res.team_id
          }else{
            this.teamId = "请选择账号"
            this.$message('不能登录');
          }
          sessionStorage.setItem("teamId",this.teamId);
        });
        
      },
      add(formName) {
        this.dialogVisible = false
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var param ={
              account:myData.account,
              env:myData.env
            }
            this.$api.config.addAccount2(param).then(res => {
                if(res){
                  this.tableData.push({id:res,account:myData.account,env:myData.env})
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
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