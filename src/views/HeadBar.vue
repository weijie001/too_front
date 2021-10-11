<template>
<div>
  <div class="headbar position-left">
     <span class="navbar">
      <el-menu default-active="1" class="el-menu-demo" 
           text-color="#6666666" active-text-color="#ffd04b" mode="horizontal">
        <el-menu-item index="1" @click="$router.push('/')"><span>主页</span></el-menu-item>
      </el-menu>
    </span>
  </div>
  <div class="headbar position-right" v-show="envShow">
    <el-select v-model="value" placeholder="choose" @change="select">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
    </el-select>
  </div>
</div>
</template>
<script>
  export default {
    data() {
      return {
        value:'1',
        options:[{
          value:'dev',
          label:'开发环境'
        },{
          value:'test',
          label:'测试环境'
        },{
          value:'gs1',
          label:'改时环境'
        }]
    }
  },
  mounted:function(){
    this.$api.jk.getEnv().then(res => {
        this.value = res.configValue;
    })
  },
  computed: {
      envShow () {
        return this.$store.state.tab.envShow
      }
    },
   methods: {
      select(val) {
        var param = {
                tag:val,
            }
          this.$api.jk.changeEnv(param).then(res => {
            this.value = val;
        })
      }
    }
  }
</script>
<style scoped lang="scss">
.headbar {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1030;
  height: 60px;
  line-height: 60px;
  border-color: rgba(180, 190, 190, 0.8);
  border-left-width: 1px;
  border-left-style: solid;
}
.position-left {
  left: 200px;
  right:200px;
}
.position-right {
  right: 100px;
}
</style>  