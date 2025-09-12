<template>
  <!-- <div>{{ $route.params.id }}</div> -->
  <!-- <div>
     {{ getblog.id }}
    {{ getblog.title }}
    {{ getblog.content }} 
  
  </div> -->
  <div>
    <input type="text" v-model="content">
    <button @click="checkp">Check palindrome</button>

  </div>
  <div>
    <p>child: {{ count }}</p>
    <button @click="increaseCount">increase count</button>
  </div>
  <!-- <p>{{ getreverse }}</p>
  <p>{{ getcontent }}</p>
  <p>{{ msg }}</p>
  <div v-for="blogs in blog" :key=blogs.id>
<p>{{ blogs.id }}</p>
<p>{{ blogs.title }}</p> -->
  <!-- </div> -->
</template>

<script>


export default {
    props:['msg','blog'],

    data(){
        return{
         allblogs:JSON.parse(localStorage.getItem('allblogs')),
         content:'',
         count:0
        
        }
    },
     computed:{
        
        getblog(){
            return this.allblogs.find((blog)=>blog.id==this.$route.params.id)
        },
        getcontent(){
            return this.content.toLocaleLowerCase()
        },
        getreverse(){
            return this.content.split('').reverse().join('')
        }
     },
     methods:{
        checkp(){
      if(this.getcontent===this.getreverse){
        alert('palindrome')
      }
      else{
        alert('no')
      }
        },
        increaseCount(){
      this.count++
      this.$emit('increasecount',this.count)
        }
     }
}
</script>

<style>

</style>