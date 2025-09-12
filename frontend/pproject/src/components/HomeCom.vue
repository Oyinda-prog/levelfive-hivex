<script>
import useVuelidate from '@vuelidate/core';
import { email,   minLength, required } from '@vuelidate/validators';
// import SignUp from './SignUp';
import SignUp from "./SignUp.vue";

export default{
    data(){
        return{
            lastname:'Johnson',
            form:{
                firstname:'',
                email:'',
                password:''
            },
            // v$:useVuelidate()
        }
    },
    methods:{
        submitform(){
    if(this.v$.form.$invalid){
console.log('form is invalid');

    }
    else{
        console.log(this.form.firstname);
        
    }
        }
    },
   validations(){
    return{
        form:{
            firstname:{required},
            email:{required,email},
            password:{min:minLength}
        }
    }
   },
   setup(){
    return{
        v$:useVuelidate()
    }
   },
   components:{
    SignUp
   }
}
</script>
<template>
    <SignUp :last="lastname"/>
    <div>
        <form @submit.prevent="submitform">
            <input type="text" v-model.trim="v$.form.firstname.$model"> 
            <div v-for="(error,index ) in v$.form.firstname.$errors" :key=index>
     <p  :class="{styles:v$.form.firstname.$invalid && v$.form.firstname.$touched}">{{error.$message}}</p>
            </div>
            <input type="text" v-model.trim="v$.form.email.$model"> 
            <input type="pasword" v-model.trim="v$.form.password.$model">
            <button>register</button>
            <!-- <input type="text" v-model="form.firstname" @blur="v$.form.firstname.$touch()">
        <span v-if=" v$.form.firstname.$error">name is field is Required</span> -->
        </form>
    </div>
    <!-- <SignUp/> -->
</template>
<style scoped>
.styles{
    background-color: red;
    color: white;
    border:2px solid black;
}
</style>