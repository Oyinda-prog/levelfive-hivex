<template>
  <div>view blog</div>
  <!-- <p>{{ this.$route.params.id }}</p> -->

  <div>
    <p>Title: <i>{{ getblog.title }}</i></p>
    <p>Content: {{ getblog.blog_content }}</p> 
    </div>
</template>

<script>
export default {
data(){
    return{
        allblogs:JSON.parse(localStorage.getItem('allblogdetails')),
    }
},
computed:{
      getblog(){
        return this.allblogs.find((blog)=>blog.blog_id==this.$route.params.id)
      }
},
mounted(){
    console.log(this.getblog);
    
}
}
</script>

<style>

</style>