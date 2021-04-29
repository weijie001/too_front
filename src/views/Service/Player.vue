<template>
<div>
    <el-form :inline="true" :model="ruleForm">
        <el-form-item prop="playerId">
            <el-input  v-model="ruleForm.playerId" placeholder="playerId" ></el-input>
        </el-form-item>
        <el-form-item prop="rarity">
            <el-select v-model="ruleForm.rarity" placeholder="rarity" clearable>
                <el-option label="S+" value="4"></el-option>
                <el-option label="S" value="3"></el-option>
                <el-option label="A" value="2"></el-option>
                <el-option label="B" value="1"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="query('ruleForm')">查询</el-button>
        </el-form-item>
    </el-form>
    <el-table
        ref="multipleTable"
        :data="tableData"
        highlight-current-row
        @selection-change="handleSelectionChange">
        style="width: 100%">
        <el-table-column
        type="selection"
        width="50">
        </el-table-column>
        <el-table-column
        property="playerId"
        label="playerId"
        width="120">
        </el-table-column>
        <el-table-column
        property="model"
        label="model"
        width="120">
        </el-table-column>
        <el-table-column
        property="englishName"
        label="englishName">
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
    <el-form :model="addForm" :rules="rules" ref="addForm" style="margin-top:20px">
        <el-form-item label="球队ID" prop="teamId">
            <el-input v-model="addForm.teamId" placeholder="teamId"  style="width:250px"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="add('addForm')">Add</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {playerId:'',rarity:''},
        addForm: {teamId:''},
        tableData:[],
        current:1,
        size:10,
        total:1000,
        show:false,
        multipleSelection: [],
        rules: {
            teamId: [
            { required: true, message: '请输入teamId', trigger: 'blur' }
            ]
        },
      }
    },
    methods: {
        query(formName){
            this.getData("1",this.size)
        },
        getData(page,pageRow){
            this.tableData=[]
            var param = {
                playerId:this.ruleForm.playerId,
                rarity:this.ruleForm.rarity,
                page:page,
                pageRow:pageRow
            }
            this.$api.player.getPlayers(param).then(res => {
                this.total = res.totalRows
                this.current = res.page
                this.show = true;
                if(res.list.length>0){
                    for(var i=0;i<res.list.length;i++){
                        this.tableData.push({playerId:res.list[i].player_id,model:res.list[i].model,englishName:res.list[i].english_name})
                    }
                }else{

                }
            })
        },
        add(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.multipleSelection.length == 0){
                        this.$message('请选择球员');
                    }else{
                        var param = {
                            playerIds:this.multipleSelection,
                            teamId:this.addForm.teamId
                        }
                        this.$api.player.addPlayers(param).then(res => {
                            if(res){
                                this.$message.success("添加成功")
                            }else{
                                this.$message('查询不到该玩家');
                            }
                            
                        })
                    }
                    
                }else{

                }
                
            })
            
        },
        handleSelectionChange(val) {
            this.multipleSelection = [];
            debugger
            for(var i=0;i<val.length;i++){
            this.multipleSelection.push(val[i].playerId)
            }
        },
        handleSizeChange(val){
            this.size = val
            this.getData(this.current,this.size)
        },
        handleCurrentChange(val){
           this.getData(val,this.size)
        }
    }
  }
</script>