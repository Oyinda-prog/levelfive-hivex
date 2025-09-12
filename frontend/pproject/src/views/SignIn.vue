<script>

import CoPut from "@/views/CoPut.vue";
export default{
    
    data(){
    return{
        email:'',
        password:"",
        username:'',
        all:[],
        msg:'',
        allarrays:[{name:'oyindamola',age:20},
        {name:'ola',age:24}
        ]
    }
},
mounted(){
    this.all=JSON.parse(localStorage.getItem('allvueusers')) || []
    // let user=this.all.find((user)=>user.email==this.email)
  
    },
    methods:{
    loginform(){
    let user=this.all.find((user)=>user.username===this.username && user.password===this.password)
    if(user){
        
        this.$router.push('/home')
//    this.$router.push('/home')
    }
    else{
        this.msg='Please enter correct email and password'
    }
    

    setTimeout(() => {
       this.msg='' 
    }, 3000);
          
    }
},
components:{
    CoPut
}
}
</script>
<template>
    <div>
        <p>{{ msg }}</p>
<span>Already have an account?</span><router-link :to="{name:'signups'}">Signup</router-link>
    </div>
    <form @submit.prevent="loginform">
        <input type="text" name="" id="" v-model.trim="username">
        <input type="text" name="" id="" v-model.trim="password">
        <button>Submit</button>
    </form>
<CoPut  name="Oyindamola" :array="allarrays"/>
</template>
<style scoped>

</style>