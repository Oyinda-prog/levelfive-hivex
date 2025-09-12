<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const fullname=ref('')
const email=ref('')
const password=ref('')
const username=ref('')
let msg=ref('')
// let usernameexist=ref({})
let allusers=[]
const route=useRouter()
onMounted(()=>{
    allusers=JSON.parse(localStorage.getItem('allsignupusers')) || []
  
    
})
const handleSubmit=()=>{
    let obj={
        fullname:fullname.value,
        email:email.value,
        password:password.value,
        username:username.value
    }
   const usernameexist=allusers.find((user)=>user.username===username.value)
    if(usernameexist){
        msg.value='username exists';
      
        
    }
    else{

        allusers.push(obj)
        localStorage.setItem('allsignupusers',JSON.stringify(allusers))
        
            route.push('/login')
    }
    
    setTimeout(() => {
        msg.value=''
    }, 3000);
}
</script>
<template>
    <p>{{ msg }}</p>
    <div class="col-6 mx-auto shadow p-5">
     <h5 class="text-center text-primary">Sign Up Page</h5>
     <form @submit.prevent="handleSubmit">
        <input type="text" v-model.trim="username" placeholder="Username" class="form-control">
        <input type="text" class="form-control" placeholder="Full Name" v-model.trim="fullname">
        <input type="text" class="form-control" placeholder="Email" v-model.trim="email">
        <input type="password" class="form-control" placeholder="Password" v-model.trim="password">
       <button type="" class="btn btn-outline-primary">Sign Up Here!</button>
     </form>
    </div>
</template>
<style scoped>

</style>