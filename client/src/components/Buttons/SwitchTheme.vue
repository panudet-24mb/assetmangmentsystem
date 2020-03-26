<template>
<div>
  {{$vuetify.theme.dark}}
      <v-switch
        v-model="$vuetify.theme.dark"
        @change ="ThemeSetting"
      ></v-switch>

</div>
         
 
</template>

<script>
  export default {
    props: {
      attrs: {
        type: Object,
        default: () => ({}),
      },
    },

    data: vm => ({
      initialDark: vm.$vuetify
        ? vm.$vuetify.theme.dark
        : true,
    }),

    beforeDestroy () {
      if (!this.$vuetify) return
      this.$vuetify.theme.dark = this.initialDark
    },
    methods:{
      ThemeSetting(){
       if (this.$vuetify.theme.dark === true){
          localStorage.setItem("darkmode", true);
       }else{
         localStorage.setItem("darkmode", false);
       }
      }

    }
  }
</script>