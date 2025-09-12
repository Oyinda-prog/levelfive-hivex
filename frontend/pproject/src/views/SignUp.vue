<script setup>
import { onMounted, ref } from 'vue';
// import { useRouter } from 'vue-router';

const firstname=ref('')
const password=ref('')
const email=ref('')
const username=ref('')
// let usernameexist=ref({})
// const route=useRouter('')

// let all=[]
onMounted(()=>{
// all=JSON.parse(localStorage.getItem('allvueusers')) || []
})
const submitform=()=>{
    let obj={
        firstname:firstname.value,
        password:password.value,
        email:email.value,
        username:username.value
    }
    

console.log(obj);

}
</script>
<template>
   
    <form action="" @submit.prevent="submitform">
        <input type="text" placeholder="First Name" v-model="firstname">
        <input type="text" v-model="email" placeholder="Email">
        <input type="text" v-model="username" placeholder="Username">
        <input type="text" v-model="password" placeholder="Password">
        <button>Submit</button>
        
   
    </form>

</template>
<style>

</style>