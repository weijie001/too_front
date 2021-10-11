<template>
    <div>
    <gc-spread-sheets
      :hostClass="hostClass"
      @workbookInitialized="initWorkbook"
    >
    </gc-spread-sheets>
  </div>
</template>

<script>
import "@grapecity/spread-sheets/styles/gc.spread.sheets.excel2016colorful.css";
import * as GC from "@grapecity/spread-sheets";
import "@grapecity/spread-sheets-vue";
import { IO } from "@grapecity/spread-excelio";
  export default {
    data() {
      return {
        hostClass: "spread-host",
       
    }
  },
  mounted:function(){
     
  },
   methods: {
      initWorkbook: function (spread) {
        
      var sheet = spread.getSheet(0);
      var person = { name: 'Peter Winston', age: 25, gender: 'Male', address: { postcode: '10001' } };
      var source = new GC.Spread.Sheets.Bindings.CellBindingSource(person);
      sheet.setBindingPath(2, 2, 'name');
      sheet.setBindingPath(3, 2, 'age');
      sheet.setBindingPath(4, 2, 'gender');
      sheet.setBindingPath(5, 2, 'address.postcode');
      sheet.setDataSource(source);
      var json = spread.toJSON();
      debugger
      let excelIo = new IO();
       let fileName = "test.xlsx";
      // here is excel IO API
            excelIo.save(json, function (blob) {
              debugger
                //saveAs(blob, fileName);
            }, function (e) {
                // process error
                console.log(e);
            });

      },
    }
  }
</script>
<style>
.spread-host {
  width: 100%;
  height: 600px;
}
</style>