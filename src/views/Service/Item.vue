<template>
<div>
    <div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
            <el-form-item prop="teamId">
				<el-input  v-model="ruleForm.teamId" placeholder="teamId" style="width:250px"></el-input>
			</el-form-item>
			<el-form-item prop="item">
				<el-input  v-model="ruleForm.item" placeholder="道具" style="width:250px"></el-input>
			</el-form-item>
			<el-form-item>
                <el-button type="primary" @click="query('ruleForm')">查询</el-button>
			</el-form-item>
		</el-form>
	</div>
  <el-table
    ref="multipleTable"
    :data="tableData"
    height="250"
    highlight-current-row
    @selection-change="handleSelectionChange">
    style="width: 100%">
    <el-table-column
      type="selection"
      width="50">
    </el-table-column>
    <el-table-column
      property="itemId"
      label="道具ID"
      width="120">
    </el-table-column>
    <el-table-column
      property="name"
      label="道具名称"
      width="120">
    </el-table-column>
  </el-table>
  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">取消选择</el-button>
  </div>
  <div>
	<el-input-number v-model="num"  :min="1" :max="1000000" label="描述文字"></el-input-number>
    <el-button type="primary" @click="add">add</el-button>
</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm: {item:'',teamId:''},
        ruleForm2:{},
        tableData: [],
        multipleSelection: [],
        num: 1,
         rules: {
            teamId: [
            { required: true, message: '请输入teamId', trigger: 'blur' }
            ],
            item: [
            { required: true, message: '请输入道具名称', trigger: 'blur' }
            ]
        },
      }
     
    },
    mounted:function(){
       this.$store.commit('updateEnvShow', true)
    },
    methods: {
        add(){
            if(this.multipleSelection.length == 0){
                this.$message('请选择道具');
            }else{
              debugger
                var param = {
                    "teamId":this.ruleForm.teamId,
                    "itemIds":this.multipleSelection,
                    "num":this.num
                };
                this.$api.item.addItems(param).then(res => {
                  if(res){
                    this.$message('添加成功');
                  }else{
                    this.$message('查询不到该玩家');
                  }
                    
                });
            }
        },
      query(formName) {
          
          this.$refs[formName].validate((valid) => {
              if (valid) {
                this.tableData=[];
                var param = {
                    "name":this.ruleForm.item
                };
                this.$api.item.getItems(param).then(res => {
                    if(res.length == 0){
                        this.$message('道具不存在');
                    }else{
                        for(var i=0;i<res.length;i++){
                            this.tableData.push({itemId:res[i].itemId,name:res[i].name})
                        }
                    }
                })
              }else{
                alert("error")
              }
          })
         
      },
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = [];
        debugger
        for(var i=0;i<val.length;i++){
          this.multipleSelection.push(val[i].itemId)
        }
        
      }
    }
  }
</script>