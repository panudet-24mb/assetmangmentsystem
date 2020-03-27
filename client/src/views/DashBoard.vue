<template>
  <div>

    <smart-widget-grid :layout="layout" >
      <smart-widget slot="0"   title="ยอดการใช้งานของระบบ" fullscreen refresh >
        
        <div class="chart-container" style="position: relative;" >
         <LineChart />
        </div>

      </smart-widget>

      <smart-widget slot="1" title="Default Widget">
        <div class="layout-center">
          <h3>Default Widget With Header</h3>
        </div>
      </smart-widget>
      <smart-widget slot="2" title="Full Screen" fullscreen>
        <div class="layout-center">
          <h3>Make any widget full screen</h3>
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
export default {
  components:{
    Floating,LineChart
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 8, i: "0" },
        { x: 4, y: 0, w: 4, h: 4, i: "1" },
        { x: 8, y: 0, w: 4, h: 4, i: "2" }
      ]
    };
  }
};
</script>

<style></style>
