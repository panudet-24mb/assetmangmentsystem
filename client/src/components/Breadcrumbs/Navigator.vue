<template>
  <v-breadcrumbs >
      <v-breadcrumbs-item
           v-for="(breadcrumb, idx) in breadcrumbList"
        :key="idx"
        @click="routeTo(idx)"
        :class="{'linked': !!breadcrumb.link}"
      >
      <v-icon>mdi-chevron-right</v-icon>
         {{ breadcrumb.name }}
      </v-breadcrumbs-item>

  </v-breadcrumbs>
</template>


<script>
export default {
 
  data () {
    return {
      breadcrumbList: []
    }
  },
  mounted () { this.updateList() },
  watch: { '$route' () { this.updateList() } },
  methods: {
    routeTo (pRouteTo) {
      if (this.breadcrumbList[pRouteTo].link) this.$router.push(this.breadcrumbList[pRouteTo].link)
    },
    updateList () { this.breadcrumbList = this.$route.meta.breadcrumb }
  }
}
</script>
