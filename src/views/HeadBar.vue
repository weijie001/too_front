<template>
  <div class="headbar position-left">
     <span class="navbar">
      <el-menu default-active="1" class="el-menu-demo" 
           text-color="#fff" active-text-color="#ffd04b" mode="horizontal">
        <el-menu-item index="1" @click="$router.push('/')"><span>主页</span></el-menu-item>
      </el-menu>
    </span>
  </div>
</template>

<script>

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
}
</style>  