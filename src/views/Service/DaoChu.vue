<template>
  <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
			<el-form-item prop="tableName">
				<el-input  v-model="ruleForm.tableName" placeholder="table" style="width:250px"></el-input>
			</el-form-item>
			<el-form-item>
                <el-button type="primary" @click="query('ruleForm')">查询</el-button>
			</el-form-item>
            <el-form-item>
                <el-checkbox :indeterminate="ruleForm.isIndeterminate" v-model="ruleForm.checkAll" v-show ="ruleForm.show" @change="handleCheckAllChange">全选</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-checkbox-group  v-model="ruleForm.checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in ruleForm.cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-show ="ruleForm.show" @click="daochu('ruleForm')">导出</el-button>
			</el-form-item>
		</el-form>
  </div>
</template>

<script>
import { baseUrl } from '@/utils/global'
  export default {
    data() {
      return {
        ruleForm: {
            tableName:'',
            checkAll: false,
            isIndeterminate: true,
            checkedCities: [],
            cities: [],
            show: false
            },
        rules: {
            tableName: [
            { required: true, message: '请输入表名', trigger: 'blur' }
            ]
        },
      }
     
    },
    methods: {
        handleCheckAllChange(val) {
            this.ruleForm.checkedCities = val ? this.ruleForm.cities : [];
            this.ruleForm.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            
            let checkedCount = value.length;
            this.ruleForm.checkAll = checkedCount === this.ruleForm.cities.length;
            this.ruleForm.isIndeterminate = checkedCount > 0 && checkedCount < this.ruleForm.cities.length;
        },
        daochu(formName){
            var lengh = this.ruleForm.checkedCities.length
            if(lengh >0){
                // var param = {
                //         "tableStr":this.ruleForm.checkedCities
                //     };
                var url2 = baseUrl+"/itemC/exportData?tableStr="+this.ruleForm.checkedCities;
                window.location.href = url2;
                // this.$api.item.exportData(param).then(res => {
                //         let blob = new Blob([res], {type: "application/vnd.ms-excel"}); 
                //         let objectUrl = URL.createObjectURL(blob); 
                //         window.location.href = objectUrl;  
                // });
            }else{
                this.$message('请选择表');
            }
        },
        query(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                     var param = {
                        "tableName":this.ruleForm.tableName
                    };
                    this.$api.item.getTables(param).then(res => {
                        this.ruleForm.cities=[]
                        if(res.length>0){
                            this.ruleForm.show = true;
                            this.ruleForm.checkedCities=[]
                            for(var i=0;i<res.length;i++){
                                this.ruleForm.cities.push(res[i].TABLE_NAME);
                            }
                        }else{
                            this.ruleForm.show = false;
                            this.$message('查不到表');
                        }
                        
                    })
                }else{
                    this.$message('error');
                }
            });
        }
    }
  }
</script>