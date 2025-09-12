<script>
import useVuelidate from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';

// import useVuelidate from '@vuelidate/core';
// import { required } from '@vuelidate/validators';

export default{
  // setup(){
  //   return {v$:useVuelidate()}
  // },
  props:['name'],
  data(){
    return{
      firstname:'',
      email:'',
      form:{
        name:'',
        lastname:""
      },
      v$:useVuelidate()
    }
  },
  methods:{
  mounted(){


  },
    submitform(){  
      // let obj={
      //   firstn ame:this.firstname,
      //   email:this.email
      // }
      if(this.v$.form.$invalid){
        console.log('invalid form');
        
      }
      else{
        console.log(this.form.name);
        
      }
      
      
    }
  },
validations(){
  return {
    form:{
      name:{required,min:minLength(3)}
    }
  }
}
}
</script>
<template>
  <p>{{name}}</p>
<form action="" @submit.prevent="submitform">
  <input type="text" v-model.trim="v$.form.name.$model">
   <div  v-for="(errors,index) in v$.form.name.$errors" :key="index">
    <p v-if="v$.form.name.$dirty">{{ errors.$message }}</p> 
<!-- <div v-if=" !form.name">
  <p>{{ 'This field is required' }}</p>
</div>     -->
   </div>
  <input type="text"  v-model.trim="email" placeholder='Enter email'>

  <button>Submit</button>
</form>
</template>