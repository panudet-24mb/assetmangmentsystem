<template >
  <v-container>
    <v-col>
      <Datatable
        :headers="this.headers"
      />
    </v-col>
    <v-spacer></v-spacer>
    <br />
    <v-col></v-col>
  </v-container>
</template>

<script>
// import apiClient from '@/services/AxiosService'
import Datatable from '@/components/Datatables/CrudDatatable.vue'

export default {
 
components:{
  Datatable
},
data: () =>({
   headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      
})

}



</script>

<style>

</style>