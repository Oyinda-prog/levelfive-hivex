<template>
    <div class="signup-wrapper">
      
        <div class="signup-image">
            <div class="overlay-text">
              
                <h1>HiveX</h1>
                <p>Join the community, connect, and share moments.</p>
            </div>
        </div>

        
        <div class="signup-form-container d-flex justify-content-center align-items-center">
            <div class="signup-card p-4">
                <div class="text-center mb-3">
                    
                      <div class="m-3" title="Menu"  @click="menu" >
            <img src="../assets/hivex.png" alt="" width="70px" class="d-block mx-auto" style="cursor: pointer;">
        </div>
                    <div class="alert alert-primary text-center" v-if="msg!==''">{{ msg }}</div>
                    <h2>Log in to HiveX</h2>
                    <p>Welcome back! Please log in to your account.</p>
                </div>
                <input type="text" class="form-control my-3" placeholder="Email" v-model.trim="email">
                <input type="password" class="form-control my-3" placeholder="Password" v-model.trim="password">
                <button class="btn-login w-100" @click="handleLogin">Log In</button>
                <div class="mt-4 text-center">
                    <p><router-link to="forgotpassword">Forgot password?</router-link></p> 
                    <p>Don't have an account? <router-link :to="{name:'register'}">Sign up</router-link></p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';

export default{
    data(){
       return{
            email:'',
            password:'',
            username:'',
            allusers:[],
            msg:'',
            counter:useCounterStore()
       }
    },
    mounted(){
        this.allusers=JSON.parse(localStorage.getItem('allsignupusers')) || []
      
    },
    methods:{
       handleLogin(){
            let user={
                email:this.email,
                password:this.password
            }
            axios.post('https://backendhivex.onrender.com/api/createlogin',user)
            .then((res)=>{
              
                if(res.data.status==true){
                    this.counter.getprofile(res.data.profilepicture)
                    localStorage.setItem('honeyuserid',JSON.stringify(res.data.userid))
                    localStorage.setItem('honeyfullname',JSON.stringify(res.data.fullname))
                    localStorage.setItem('honeyprofilepicture',JSON.stringify(res.data.profilepicture))
                    this.$router.push('/')
                }
                else if(res.data.status==204){
                    this.msg=res.data.msg
                }
                else if(res.data.status==208){
                    this.msg=res.data.msg
                }
                else{
                    this.msg='Something went wrong. Try again!'
                }
            })
            .catch((err)=>{

                this.msg=err;
            })
            setTimeout(() => {
                this.msg=''
            }, 6000);
        } 
    }
}
</script>



<style scoped>

.signup-wrapper {
    display: flex;
    height: 100vh;
}
.signup-image {
    flex: 1;
    background: linear-gradient(135deg, #ffe6f0, #cce5ff);
    background-image: url('../assets/one.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    border-radius: 20px 40px 50px 20px;
}

.signup-image::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(255, 192, 203, 0.5), rgba(0, 123, 255, 0.5));
}
.overlay-text {
    position: absolute;
    bottom: 50px;
    left: 40px;
    color: white;
    z-index: 2;
}
.overlay-text h1 {
    font-size: 2.5rem;
    font-weight: 700;
}
.overlay-text p {
    font-size: 1.1rem;
}


.signup-form-container {
    flex: 1;
    background: linear-gradient(135deg, #f0faff, #fff0f6);
    display: flex;
}


.signup-card {
    width: 100%;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
}


.form-control {
    border-radius: 8px;
    padding: 12px;
    border: none;
    background: rgba(255,255,255,0.8);
    transition: 0.3s;
}
.form-control:focus {
    background: rgba(255,255,255,0.95);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.4);
}
.btn-login {
    background: linear-gradient(135deg, #00aaff, #ff70a6);
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    color: white;
    transition: 0.3s;
}
.btn-login:hover {
    background: linear-gradient(135deg, #ff70a6, #00aaff);
    transform: translateY(-2px);
}


a {
    color: #007bff;
    font-weight: 500;
    text-decoration: none;
}
a:hover {
    text-decoration: underline;
}


@media (max-width: 768px) {
    .signup-wrapper {
        flex-direction: column;
    }
    .signup-image {
        height: 40vh;
    }
}
</style>
