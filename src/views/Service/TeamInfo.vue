<template>
<div>
<div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="100px">
        <el-form-item label="球队名称|ID">
            <el-input v-model="formInline.teamName" placeholder="teamName|teamId"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="query">查询</el-button>
        </el-form-item>
    </el-form>
</div>
<div>
    <el-form :inline="true" :model="form" class="demo-form-inline" label-width="100px" v-show="show" >
        <el-row>
            <el-form-item label="球队ID">
            <el-input v-model="form.teamId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="球队名称">
                <el-input v-model="form.teamName"></el-input>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="幸运值">
                <el-input-number v-model="form.luckyNum" controls-position="right" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item label="能量上限">
                <el-input-number v-model="form.max" controls-position="right" :min="1"></el-input-number>
            </el-form-item>
        </el-row>
        <el-row>
            <el-form-item label="当前能量">
                <el-input-number v-model="form.cur" controls-position="right" :min="1"></el-input-number>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="update">修改</el-button>
            </el-form-item>
        </el-row>
        </el-form>
    </div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        show: false,
        formInline: {
          teamName: '',
        },
         form: {
          teamId: '',
          teamName: '',
          luckyNum: '',
          max: '',
          cur: '',
        }
      }
    },
    mounted:function(){
       this.$store.commit('updateEnvShow', true)
    },
    methods: {
        update() {
            var param ={
                teamId:this.form.teamId,
                teamName:this.form.teamName,
                luckyNum:this.form.luckyNum,
                max:this.form.max,
                cur:this.form.cur
            }
            this.$api.jk.updateTeamInfo(param).then(res => {
                this.$message('更新成功');
            });
      },
       query() {
           var param ={
               teamName:this.formInline.teamName
            }
        this.$api.jk.queryTeamInfo(param).then(res => {
            if(res != null){
                this.form.teamId = res.team_id;
                this.form.teamName = res.team_name;
                this.form.luckyNum = res.lucky_num;
                this.form.max = res.max;
                this.form.cur = res.cur;
                this.show = true;
            }else{
                this.$message('查询不到该玩家');
            }
        });
      }
    }
  }
</script>