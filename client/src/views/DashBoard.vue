<template>
  <div>

    <smart-widget-grid :layout="layout">
      <smart-widget slot="0" simple>
        <div class="layout-center">
          <h3>Simple Widget Without Header</h3>
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
  </div>
</template>

<script>
import apiClient from "@/services/AxiosService";
export default {
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
