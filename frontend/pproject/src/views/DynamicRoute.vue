<template>
  <div>Dynamic page</div>
  
  <div v-for="blog in allblogs" :key="blog.blog_id" class="shadow col-6 mx-auto p-5">
   <h1 class="text-center text-primary">{{ blog.title }}</h1>
   <p>{{ blog.blog_content.slice(0,70) }}......</p>
  

   <img src="../assets/images/slay.png" alt="" width="100px">
   


    <router-link :to="{name:'blogview',params:{id:blog.blog_id}}" >Read more.....</router-link>


  </div>
</template> 

<script>
export default {
  methods:{
  // storeuser(blog){
  //   localStorage.setItem('blogdetail',JSON.stringify(blog))
  // console.log(blog);
  
  // }  
  },
data(){
    return{
        allblogs:[
            {blog_id:1,title:'Housing',blog_content:'Housing Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus autem vero, voluptatem aliquam, deleniti provident atque molestias exercitationem earum voluptas libero odio recusandae error magni suscipit quas quasi. Dolorum officiis accusamus voluptates cupiditate aspernatur fugiat atque, assumenda necessitatibus adipisci! Temporibus laborum fugit, explicabo odit vel, dolorem maxime, eligendi minima quasi soluta odio quisquam iure similique beatae. Maxime dignissimos vitae hic odit doloribus ex delectus repellat autem voluptatem dolor, ad architecto a, dicta enim iste cum animi assumenda fugit omnis sequi similique doloremque. Sapiente eveniet rerum asperiores tenetur inventore ipsum soluta rem ratione, odio corporis, laudantium repudiandae sed totam obcaecati debitis.',
              img:'slay.png'
            },
            {blog_id:2,title:'Agriculture',blog_content:'Agriculture Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus autem vero, voluptatem aliquam, deleniti provident atque molestias exercitationem earum voluptas libero odio recusandae error magni suscipit quas quasi. Dolorum officiis accusamus voluptates cupiditate aspernatur fugiat atque, assumenda necessitatibus adipisci! Temporibus laborum fugit, explicabo odit vel, dolorem maxime, eligendi minima quasi soluta odio quisquam iure similique beatae. Maxime dignissimos vitae hic odit doloribus ex delectus repellat autem voluptatem dolor, ad architecto a, dicta enim iste cum animi assumenda fugit omnis sequi similique doloremque. Sapiente eveniet rerum asperiores tenetur inventore ipsum soluta rem ratione, odio corporis, laudantium repudiandae sed totam obcaecati debitis.'},
            {blog_id:3,title:'Oil and Gas',blog_content:'Oil and Gas Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus autem vero, voluptatem aliquam, deleniti provident atque molestias exercitationem earum voluptas libero odio recusandae error magni suscipit quas quasi. Dolorum officiis accusamus voluptates cupiditate aspernatur fugiat atque, assumenda necessitatibus adipisci! Temporibus laborum fugit, explicabo odit vel, dolorem maxime, eligendi minima quasi soluta odio quisquam iure similique beatae. Maxime dignissimos vitae hic odit doloribus ex delectus repellat autem voluptatem dolor, ad architecto a, dicta enim iste cum animi assumenda fugit omnis sequi similique doloremque. Sapiente eveniet rerum asperiores tenetur inventore ipsum soluta rem ratione, odio corporis, laudantium repudiandae sed totam obcaecati debitis.'},
            {blog_id:4,title:'Media',blog_content:'Media Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus autem vero, voluptatem aliquam, deleniti provident atque molestias exercitationem earum voluptas libero odio recusandae error magni suscipit quas quasi. Dolorum officiis accusamus voluptates cupiditate aspernatur fugiat atque, assumenda necessitatibus adipisci! Temporibus laborum fugit, explicabo odit vel, dolorem maxime, eligendi minima quasi soluta odio quisquam iure similique beatae. Maxime dignissimo.'},
            {blog_id:5,title:'Education',blog_content:'Education Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus autem vero, voluptatem aliquam, deleniti provident atque molestias exercitationem earum voluptas libero odio recusandae error magni suscipit quas quasi. Dolorum officiis accusamus voluptates cupiditate aspernatur fugiat atque, assumenda necessitatibus adipisci! Temporibus laborum fugit, explicabo odit vel, dolorem maxime, eligendi minima quasi soluta odio quisquam iure similique beatae. Maxime dignissimos vitae hic odit doloribus ex delectus repellat autem voluptatem dolor, ad architecto a, dicta enim iste cum animi assumenda fugit omnis sequi similique doloremque. Sapiente eveniet rerum asperiores tenetur inventore ipsum soluta rem ratione, odio corporis, laudantium repudiandae sed totam obcaecati debitis.'},

        ]
    }
},
mounted(){
  localStorage.setItem('allblogdetails',JSON.stringify(this.allblogs))
  console.log(localStorage['allblogdetails']);
  
}
}
</script>

<style>

</style>