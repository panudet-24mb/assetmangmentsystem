<template>

    <v-dialog
      v-model="$store.state.loader.login"
      hide-overlay
      persistent
      width="300"
      :timeout="2000"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          กรุณารอสักครู่ . . .
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

</template>

