<template>
  <v-app id="inspire">
    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
             
              </v-toolbar>
              <v-card-text>
                      <v-form ref="form" v-model="valid">
                                <v-text-field
                                    label="username"
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
              <v-btn color="primary" :disabled="!valid" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
                 <v-snackbar v-model="snackbar" top>
                        {{error_message}}
                    </v-snackbar>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

 
<script>
export default {
    props: {
        source: String
    },
    
    data: () => ({
        drawer: null,
        snackbar:false,
        valid: true,
        username: "",
            //    username: "emasil@email.com",
        usernameRules: [
            v => !!v || "User is required",
        ],
        // password: "123456",
          password: "",
        passwordRules: [
            v => !!v || "Password is required",
            v => ( v.length >= 6) || "Password must be larger than 6 characters"
        ],
        result:null,
        error_message:""
    }),
    methods: {
    login () {
      this.$store
        .dispatch('login', {
          username: this.username,
          password: this.password
        })
        .then(() => {
          this.$router.push({ name: 'dashboard' })
        })
        .catch(err => {
          this.error_message = err.response.data.error
          console.log(this.error_message)
           this.snackbar=true;
        })
    },


        reset() {
            this.$refs.form.reset();
        },
        // doLogin() {
        //     const axios = require('axios');
        //     axios.post("http://localhost:3000/api/v1/user/login", {
        //         username:this.username,
        //         password:this.password,
        //     })
        //     .then(response => {
        //         this.result = response.data.data;
        //         let token_api = this.result.api_token;
      
        //         localStorage.setItem('user',token_api);
                
        //         if(this.result.api_token){
        //             axios.get("http://localhost:3000/api/v1/user/infomation", {
        //                 headers: {
        //                     'Authorization': this.result.api_token,
        //                     'Content-Type': 'application/json'
        //                 }
        //             })
        //             .then(response => {
        //                 this.result = response.data;

        //                 if(this.result.data){
        //                     this.$store.state.user=this.result.data.id;
        //                     this.$store.state.isLogin=true;
        //                     this.$store.state.token=token_api,
        //                     this.$router.push('/dashboard');
                 
        //                 }else{
        //                     this.error_message=response.data.status;
        //                     this.snackbar=true;
        //                 }
        //             })
        //         }
        //     })
        //     .catch(e => {   
        //         if (e.response.status === 401) {
        //             this.error_message=e.response.data.error;
        //             this.snackbar=true;
        //         }
        //     });
        // }
    },
};
</script>