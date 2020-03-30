<template>
  <div>
    <LoadingPartials />
    <v-app id="inspire">
      <v-content>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>ระบบจัดการทรัพย์สิน (AMS)</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-card-text>
                  <v-form ref="form" v-model="valid">
                    <v-text-field
                      label="Username"
                      v-model="username"
                      prepend-icon="mdi-account"
                      type="text"
                      :rules="usernameRules"
                      required
                    ></v-text-field>

                    <v-text-field
                      label="Password"
                      v-model="password"
                      prepend-icon="mdi-lock"
                      type="password"
                      :rules="passwordRules"
                      required
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" :disabled="!valid" @click="login">
                    Login</v-btn
                  >
                </v-card-actions>
              </v-card>
              <v-snackbar v-model="snackbar" top>
                {{ error_message }}
              </v-snackbar>
            </v-col>
          </v-row>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import LoadingPartials from "../components/Partials/_loader";
export default {
  components: {
    LoadingPartials
  },
  props: {
    source: String
  },

  data: () => ({
    drawer: null,
    snackbar: false,
    valid: true,
    username: "",
    usernameRules: [v => !!v || "User is required"],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must be larger than 6 characters"
    ],
    result: null,
    error_message: ""
  }),
  methods: {
    login() {
      this.$store.commit("LOADER", true);
      this.$store
        .dispatch("login", {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$store.commit("LOADER", false);
          // this.$router.reload();
          window.location.href = "/dashboard";
          // this.$router.push('/dashboard');
        })
        .catch(err => {
          this.$store.commit("LOADER", true);
          switch(err.response.status){
            case 404:
          
              this.error_message = "ไม่พบเจอผู้ใช้งาน"
              
       
              break;
              
            case 401:

              this.error_message = "รหัสผ่านไม่ถูกต้อง"
              
              break;

          }
         
   
          this.$store.commit("LOADER", false);
          this.snackbar = true;
        });
    },

    reset() {
      this.$refs.form.reset();
    }
  
  },
  mounted() {
    let self = this;
    window.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        self.login();
      }
    });
  }
};
</script>
