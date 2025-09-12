<template>
  <div>page</div>
  <!-- <p>{{ this.$route.params.id }}</p> -->
  <div>
    <p>{{ getid.blog_id }}</p>
    <p>{{ getid.title }}</p>
    <p>{{ getid.blog_content }}</p>
  </div>
</template>

<script>
export default {
data(){
    return{
        allblogs:JSON.parse(localStorage.getItem('vueblogs'))
    }
},
computed:{
    getid(){
        return this.allblogs.find((blog)=>blog.blog_id==this.$route.params.id)
    }
}
}
</script>

<style>

</style>