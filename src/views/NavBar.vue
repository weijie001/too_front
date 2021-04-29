<template>
<div class="menu-bar-container">
    <el-menu default-active="1"
      class="menu-bar-width">
    <menu-tree></menu-tree>
    </el-menu>
</div>

</template>

<script>
import MenuTree from "@/components/MenuTree"
export default {
    components:{
        MenuTree
  },
  data() {
    return {
      input: ''
    }
  }
}
</script>

<style scoped lang="scss">
.menu-bar-container {
  position: fixed;
  top: 0px;
  left: 0;
  bottom: 0;
  z-index: 1020;
  .el-menu {
    position:absolute;
    top: 0px;
    bottom: 0px;
    text-align: left;
    // background-color: #2968a30c;
  }
   .menu-bar-width {
    width: 200px;
  }
}

</style>