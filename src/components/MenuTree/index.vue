<template>
<el-menu default-active="2">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-location"></i>
      <span>接口管理</span>
    </template>
     <el-menu-item index="1" @click="handleRoute('interface/test')">
         <span>接口测试</span>
     </el-menu-item>
     <el-menu-item index="2" @click="handleRoute('interface/config')">
         <span>接口配置</span>
     </el-menu-item>
     <el-menu-item index="3" @click="handleRoute('interface/user')">
         <span>账号配置</span>
     </el-menu-item>
  </el-submenu>
  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-menu"></i>
      <span>内容管理</span>
    </template>
    <el-menu-item index="1" @click="handleRoute('service/item')">
         <span>背包</span>
    </el-menu-item>
     <el-menu-item index="2" @click="handleRoute('service/player')">
         <span>球员</span>
    </el-menu-item>
      <el-menu-item index="3" @click="handleRoute('content/daochu')">
        <span>表导出</span>
    </el-menu-item>
      <el-menu-item index="4" @click="handleRoute('content/daoru')">
        <span>表导入</span>
    </el-menu-item>
  </el-submenu>
  
</el-menu>
</template>

<script>
export default {
  name: 'MenuTree',
  props: ['title'],
  methods: {
    handleRoute (url) {
      this.$router.push("/" + url)
    }
  }
}
</script>

<style scoped lang="scss">

</style>