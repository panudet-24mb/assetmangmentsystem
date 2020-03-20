<template>
  <div>
    
  </div>
</template>

<script>
import apiClient from '@/services/AxiosService'
export default {
methods:{
  
getword(){
  apiClient.get('/user/infomation')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
},
},
mounted(){
 this.getword()
}
}
</script>

<style>
</style>