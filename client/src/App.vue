<template>

  <v-app>

      
      <router-view />
          

    <v-footer color="blue darken-4" app>
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