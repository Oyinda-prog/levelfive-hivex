<template>
    <!-- <PageNotFound/> -->
  <div class="col-10 mx-auto shadow">
    <div class="row" v-for="blog in blogs" :key="blog.id">
 <div class="col-lg-3 col-md-6 col-sm-12 col-xl-4">
<p>{{blog.id}}</p>
<p>{{ blog.title }}</p>
<p>{{ blog.content.slice(0,50) }}.........</p>
<router-link :to="{name:'viewblog',params:{id:blog.id} }">Read more</router-link>
 </div>
    </div>

    <p>Parent: {{ count }}</p>
  </div>
  <div>
    <ViewBlog :msg="{name:'I love Johnson'}" :blog="blogs" @increasecount="parentcount"/>
  </div>
  
</template>

<script>
// import PageNotFound from './PageNotFound.vue';
import ViewBlog from './ViewBlog.vue';




export default {
    methods:{
    parentcount(msg){
        this.count=msg
    }
        },
        components:{
// PageNotFound,
ViewBlog
        },
data(){
    return{
        count:0,
        blogs:[
            {id:1,title:'Real Estate',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed fugiat veritatis neque nemo reprehenderit veniam, id doloremque totam dolorum reiciendis tempora, eligendi, illum facere? Amet consectetur repellat officia adipisci, eum reiciendis a veniam aliquam quidem eos libero ducimus id officiis nobis reprehenderit unde delectus modi aut eius obcaecati deserunt dolorem odit. Eligendi, corrupti consequatur. Laborum assumenda vitae, quas perferendis quia sed reprehenderit quidem delectus ratione, blanditiis magnam eveniet natus pariatur? Atque corrupti, aspernatur modi expedita nulla pariatur ut ad doloremque quaerat ratione, quo eius nihil, sit voluptatum et. Quibusdam nulla placeat odio id corrupti sapiente quos in, recusandae quaerat!'},
            {id:2,title:'Housing',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed fugiat veritatis neque nemo reprehenderit veniam, id doloremque totam dolorum reiciendis tempora, eligendi, illum facere? Amet consectetur repellat officia adipisci, eum reiciendis a veniam aliquam quidem eos libero ducimus id officiis nobis reprehenderit unde delectus modi aut eius obcaecati deserunt dolorem odit. Eligendi, corrupti consequatur. Laborum assumenda vitae, quas perferendis quia sed reprehenderit quidem delectus ratione, blanditiis magnam eveniet natus pariatur? Atque corrupti, aspernatur modi expedita nulla pariatur ut ad doloremque quaerat ratione, quo eius nihil, sit voluptatum et. Quibusdam nulla placeat odio id corrupti sapiente quos in, recusandae quaerat!'},
            {id:3,title:'Agriculture',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed fugiat veritatis neque nemo reprehenderit veniam, id doloremque totam dolorum reiciendis tempora, eligendi, illum facere? Amet consectetur repellat officia adipisci, eum reiciendis a veniam aliquam quidem eos libero ducimus id officiis nobis reprehenderit unde delectus modi aut eius obcaecati deserunt dolorem odit. Eligendi, corrupti consequatur. Laborum assumenda vitae, quas perferendis quia sed reprehenderit quidem delectus ratione, blanditiis magnam eveniet natus pariatur? Atque corrupti, aspernatur modi expedita nulla pariatur ut ad doloremque quaerat ratione, quo eius nihil, sit voluptatum et. Quibusdam nulla placeat odio id corrupti sapiente quos in, recusandae quaerat!'},
            {id:4,title:'Petroleum',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis sed fugiat veritatis neque nemo reprehenderit veniam, id doloremque totam dolorum reiciendis tempora, eligendi, illum facere? Amet consectetur repellat officia adipisci, eum reiciendis a veniam aliquam quidem eos libero ducimus id officiis nobis reprehenderit unde delectus modi aut eius obcaecati deserunt dolorem odit. Eligendi, corrupti consequatur. Laborum assumenda vitae, quas perferendis quia sed reprehenderit quidem delectus ratione, blanditiis magnam eveniet natus pariatur? Atque corrupti, aspernatur modi expedita nulla pariatur ut ad doloremque quaerat ratione, quo eius nihil, sit voluptatum et. Quibusdam nulla placeat odio id corrupti sapiente quos in, recusandae quaerat!'},
        ]
    }
},

mounted(){
    localStorage.setItem('allblogs',JSON.stringify(this.blogs))
},

}
</script>

<style>

</style>