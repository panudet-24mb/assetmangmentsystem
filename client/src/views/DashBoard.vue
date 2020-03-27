<template>
  <div>

    <smart-widget-grid :layout="layout" >
      <smart-widget slot="0"  resized  container-resized  title="ยอดการใช้งานของระบบ"  fullscreen refresh >
        
        <div class="chart-container"  >
         <LineChart style="position: relative;"/>
        </div>

      </smart-widget>

      <smart-widget slot="1" title="ผู้ใช้งานล่าสุด" fixedHeight="true">
        <div class="layout-center">
                <simpletable/>
      
        </div>
      </smart-widget>
      <smart-widget slot="2" title="สถานะของเครื่อง Server" fullscreen>
        <div class="layout-center">
          <h3>CPU SERVER 100  </h3>
        </div>
      </smart-widget>
    </smart-widget-grid>

       <Floating/>

    
  
  </div>

</template>

<script>
import apiClient from "@/services/AxiosService";
import Floating from '../components/Buttons/Float';
import LineChart from '../components/Charts/Line';
import simpletable from '../components/Tables/Simple';
export default {
  components:{
    Floating,LineChart,simpletable
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 4, i: "0" },
        { x: 4, y: 0, w: 4, h: 4, i: "1" },
        { x: 8, y: 0, w: 4, h: 4, i: "2" }
      ]
    };
  }
};
</script>

<style></style>
