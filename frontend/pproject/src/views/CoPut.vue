<template>
  <h1>coput</h1>
  
    <!-- <div>
        {{ name }}
        <div v-for="(item,index) in this.getnewarray" :key="index" :class="item.status=='active'?'active':'inactive'">
  <p>{{item.name }}</p>
<p>{{ item.age }}</p>
<p>{{ item.status }}</p>
        </div>
      
        <div>hello</div>
        <input type="text" v-model="message" placeholder="ENTER TEXT">
        <button @click="getpalindrome" class="btn btn-primary">Get palindrome</button>
        <div>{{ newmessage }}</div> -->
      <!-- <p>Count: {{ count }}</p> -->
  
      <!-- Data is displayed directly -->
      <!-- <p>Double (Computed): {{ doubleCount }}</p> -->
      <!-- <p>Double (Method): {{ getDoubleCount() }}</p> -->
  
      <!-- <button @click="increment">Increment Count</button> -->
    <!-- </div> -->
  </template>
  
  <script>
  export default {
    props:[
'name','array'
    ],
    data() {
      return {
        message:'',
        newmessage:'',
        firstname:"",
        lastname:'',
        fullname:'',
        count: 0 ,
        newarray:[{name:'damola',age:20,status:'active'},
        {name:'oe',age:24,status:'inactive'}, {name:'oyindamola',age:20,status:'active',},
        {name:'ola',age:24,status:'inactive'}
        ]
      };
    },
    computed:{
       getnewarray(){
        // console.log(this.newarray);
        
        return this.newarray.filter(item=>item.status=='active')
       },
       getfind(){
        // console.log(this.newarray);
        
        return this.newarray.find(item=>item.status=='active')
       },
       getpalin(){
        return this.message.split('').reverse().join('').toLowerCase()     }
    },
    methods: {
     getpalindrome(){
      return this.newarray.filter(item=>item.status=='inactive')
        // this.message=this.message.toLowerCase()
//    this.newmessage=this.getpalin.toLowerCase()
  //  if(this.message==this.getpalin){
  //    alert('palindrome')
  //  }
  //  else{
  //   alert('not palindrome')
  //  }
     },
      getDoubleCount() {
        console.log('Method called');
        return this.count * 2;
      },
      increment() {
        this.count++;
      }
    }
  };
  </script>
  <style scoped>
    .active{
        background-color:green;
    }
    .inactive{
        background-color:red;
    }
    .styles{
        color:red;
    }
  </style>
  