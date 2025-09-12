<template>
  <div class="col-6 mx-auto shadow p-5">
     <h5 class="text-center text-primary">Sign Up Page</h5>
     <form @submit.prevent="handleSubmit">
        <input type="text" v-model.trim="username" placeholder="Username" class="form-control">
        <input type="text" class="form-control" placeholder="Full Name" v-model.trim="fullname">
        <input type="password" class="form-control" placeholder="Password" v-model.trim="password">
       <button type="" class="btn btn-outline-primary">Sign Up Here!</button>
     </form>
    </div>
    <div v-for="user in this.userstore.getuser()" :key="user.username">
<p>Fullname: {{ user.fullname }}</p>
<p>Username: {{ user.username }}</p>
    </div>
</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
data(){
   return{
      username:'',
      fullname:'',
      password:"",
      userstore:useUserStore()

   }
},
methods:{
    handleSubmit(){
        this.userstore.receiveuser(this.username,this.fullname,this.password);
  
   
    }
}
}
</script>

<style>

</style>