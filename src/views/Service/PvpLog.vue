<template>
    <ul>
        <li  v-for="(item,index) in files" :key="index">
            <div @click="select(item)"><a :href = "url">{{item}}</a></div>
            
        </li>
    </ul>       

</template>

<script>
import { baseUrl } from '@/utils/global'
  export default {
    data() {
      return {
        files:[],
        fileName:"",
        url:""
    }
  },
  mounted:function(){
    this.$store.commit('updateEnvShow', false)
     this.$api.jk.getLogFile().then(res => {
            this.files = res;
        })
  },
   methods: {
      select(val) {
          this.fileName = val;
          this.url = baseUrl+"/jk/downFile?fileName="+this.fileName
      }
    }
  }
</script>