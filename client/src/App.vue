<template>

  <v-app>

      
      <router-view />
          

    <v-footer color="blue darken-3" app>
      <span class="white--text">Nok Soft ©2020</span>
    </v-footer>
  </v-app>
</template>
 
<script>
// import NavBar from "./components/NavBar";
 
export default {
    name: "App",
    components: {
        // NavBar
    },
    data: () => ({
        //
    }),
    
};
</script>


<style>

#nprogress .bar {
  background: rgb(38, 184, 45);
  position: fixed;
  z-index: 1031;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
}
</style>