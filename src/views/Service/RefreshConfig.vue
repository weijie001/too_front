<template>
<div>
    <div>
        <el-select v-model="value" placeholder="请选择">
            <el-option
             v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
    <br/>
    <br/>
    <div>
        <el-button type="primary" @click="refreshConfig">Refresh</el-button>
    </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '105',
          label: '经纪人'
        }, {
          value: '107',
          label: 'PVP'
        }],
        value: ''
    }
  },
  mounted:function(){
       this.$store.commit('updateEnvShow', false)
    },
   methods: {
      refreshConfig(val) {
         var account = sessionStorage.getItem("account");
         var env = sessionStorage.getItem("env");
         if(account&&env){
            var param = {
                module:this.value,
                env:env
            }
          this.$api.jk.refreshConfig(param).then(res => {

          })
         }else{
              this.$confirm('请设置账号', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                  }).then(() => {
                    this.$router.push("/interface/user2")
                  }).catch(() => {
                        
                  });
         }
          
      }
    }
  }
</script>