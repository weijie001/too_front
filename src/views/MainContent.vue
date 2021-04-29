<template>
  <div  class="main-container position-left">
     <!-- 主内容区域 -->
    <div class="main-content">
      <keep-alive>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed:{
    teamId: {
      get () { return this.$store.state.tab.teamId },
      set (val) { this.$store.commit('updateTeamId', val) }
    },
    visible:{
      get () { return this.$store.state.tab.visible },
      set (val) { this.$store.commit('updateVisible', val) }
    }
  }
  // ,
  // mounted:function(){
  //   this.visible = true
  // }
}
</script>

<style scoped lang="scss">
.main-container {
  padding: 0 5px 5px;
  position: absolute;
  top: 60px;
  left: 1px;
  right: 1px;
  bottom: 0px;
  .main-content {
    position: absolute;
    top: 15px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    padding: 5px;
    // background: rgba(209, 212, 212, 0.5);
  }
}
.position-left {
  left: 200px;
}
</style>  