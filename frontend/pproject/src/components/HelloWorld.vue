<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core';
import { required,minLength, maxLength } from '@vuelidate/validators';


required
export default {
data(){
    return{
        studentid:6,
        form:{
            email:'',
            firstname:'',
        },
        v$:null
    }
 } ,
 validations(){
    return{
        form:{
        email:{required, minLength:minLength(3),maxlength:maxLength(13)},
        firstname:{required}
    }
    }
}
  ,
  mounted()
{
axios.get('https://jsonplaceholder.typicode.com/users').
then((response)=>{
    console.log(response.data);
    
})
.catch((err)=>{
    console.log(err);
    
})
} ,
//  
 created(){
this.v$=useVuelidate()

 } ,
 methods:{
    submitForm(){
        this.v$.$touch()
        if(this.v$.form.$invalid){
      console.log('form is invalid');
      
        }
        else{
            console.log('form is valid');
            
        }
        
        
    }
 }
}

</script>

<template>
    <div>
        <form @submit.prevent="submitForm">
            <input type="text" v-model="form.email">
            <div  v-for="(errors,index) in v$.form.email.$errors" :key="index">
    <p v-if="v$.form.email.$dirty">{{ errors.$message }}</p> 
   </div>
         

        

        <button>Submit form</button>
        </form>
    </div>
    <div>

    </div>
</template>
<!-- <style scoped>

</style> -->