<template>

  <v-app teal>
    <!-- <NavBar /> -->
    <v-content>
      <router-view />
          
    </v-content>
    <v-footer color="blue darken-4" app>
      <span class="white--text">© 2019</span>
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