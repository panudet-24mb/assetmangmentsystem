<template>
  
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
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Panudet Panumaw</v-list-item-title>
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
              <v-switch v-model="message" color="primary"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable messages</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-action>
              <v-switch v-model="hints" color="primary"></v-switch>
            </v-list-item-action>
            <v-list-item-title>Enable hints</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menu = false">Cancel</v-btn>
          <v-btn color="primary" text @click="menu = false">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

</template>

<script>
export default {
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }),

}
</script>

<style>

</style>