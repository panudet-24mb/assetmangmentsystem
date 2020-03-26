<template>
  <div>

    <div v-if="stateLoading ===true">

          <v-progress-circular 
      :indeterminate="stateLoading"
      color="green"
    />

    </div>
    <div v-else>
   
   

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on }">
      <v-btn
        icon
        large
        v-on="on"
      >
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          /></v-avatar>
             </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/logos/logo.svg" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{fullname}}</v-list-item-title>
              <v-list-item-subtitle>Founder of Noksoft</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              
            <v-list-item-subtitle  :class="fav ? 'green--text' : 'red--text'"  >{{ fav ? 'online' : 'offline ' }}</v-list-item-subtitle>
              <v-btn
                :class="fav ? 'green--text' : 'red--text'"
                icon
                @click="fav = !fav"
              >
              
                <v-icon>mdi-circle</v-icon>
          
 
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
         

            <v-list-item>
            <v-list-item-action>
                <SwitchTheme/>
                </v-list-item-action>
            <v-list-item-title>Dark Theme</v-list-item-title>
          </v-list-item>


        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

      
          <v-btn color="primary" text @click="logout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
    
    </div>
  </div>
</template>

<script>
import SwitchTheme from '../Buttons/SwitchTheme'
import apiClient from '../../services/AxiosService'
export default {
  components:{
    SwitchTheme
  },
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
      fullname :null,
      stateLoading:true,

    }),

  methods:{
    initialize: (vm) => {
      apiClient.get('/user/infomation').then((response) => {
         vm.fullname = response.data.data.name
         console.log(vm.fullname)
         
         setTimeout(()=>{
            vm.stateLoading = false
          },1500);
      })
      .catch((error) => {
        console.log(error)
      });
    },
   logout () {
      this.$store.dispatch('logout')
    }

    },
    mounted  () {
      const vm = this;
      this.initialize(vm)
    },
  
}
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>