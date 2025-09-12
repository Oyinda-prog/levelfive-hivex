<template>
  <div class="fluid-container">
<div class="col-12 col-sm-12 col-md-6 shadow mx-auto p-3 m-2">
<div v-for="post in allposts" v-bind:key="post.id" class="p-3 my-2">
<div class="d-flex align-items-center gap-3 mb-2 p-3" v-if="post.student">
    <img
      :src="`http://localhost:8000/profilepictures/` + post.student.profilepicture"
      alt="profile"
      width="50"
      height="50"
      class="rounded-circle"
      style="object-fit: cover;"
    />
    <h5 class="mb-0">{{ post.student.fullname }}</h5>
  </div>

 
  <div class="mx-auto col-11">
<p class="mb-3 content">{{ post.content }}</p>
  </div>

 
  <div v-if="post.post_img" class="d-flex justify-content-center mt-3 ">
    <img
      :src="`http://localhost:8000/postimages/` + post.post_img"
      alt="post image"
      class="rounded"
      style="width: 100%; max-width: 600px; height: 400px; object-fit: cover;"
    />
    
</div>

<div class="row justify-content-between m-5 p-1">
        <div class="col-2 " >
          <p v-if="Array.isArray(post.likes)" class="text-primary">{{ post.likes.filter(like=>like.status==1).length }} Likes</p>
        </div>
        <div class="col-3" ><p>{{ post.comments.length }} comments</p></div>
      </div>
<div class="row justify-content-around m-5  p-2">
<div class="col-3">
    <div v-if="post.likes.find(like=>like.student_id == this.userid && like.status==1 )" @click="likebutton(post.id)" style="cursor: pointer;" >
    <img src="../assets/images/liketwo.jpeg" alt="" width="15px" height="15px"><span class="text-primary">Liked</span> 
</div>
<div v-else @click="likebutton(post.id)" style="cursor: pointer;">
  <img src="../assets/images/likeone.jpg" alt="" width="30px" height="30px"><span>Like</span>
</div>
</div>
<div class="col-3">
<div  style="cursor: pointer;" @click="openmodal(post)" data-bs-toggle="modal" data-bs-target="#exampleModal">
         <img  src="../assets/images/messageicon.jpg" alt="" width="20px" height="20px"><span style="margin-left: 10px;">comment</span>
     </div>
</div>
<hr>
</div>
</div>    
  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
data(){
    return{
      userid:'',
      profilepicture:"",
      fullname:"",
      allposts:[],
    }
},
mounted(){
    
  setInterval(() => {
    
  }, 5000);
      this.userid=JSON.parse(localStorage.getItem('honeyuserid'))
      this.profilepicture=JSON.parse(localStorage.getItem('honeyprofilepicture'))
     console.log(this.userid);  
     
    
    axios.post('http://127.0.0.1:8000/api/mypost',{studentid:this.userid}).then((res)=>{
        console.log(res.data);
        this.allposts=res.data.post
        
    })
    // this.allposts.forEach(post => {
    //   console.log(post);
      
    // });
    

 this.fullname=JSON.parse(localStorage.getItem('honeyfullname'))

 
  },
  methods:{
    
    likebutton(postid){
      let like={
        postid,
        studentid:this.userid
      }
       axios.post('http://127.0.0.1:8000/api/like',like)
       .then((res)=>{
           if(res.data){
         
            
        //     axios.post('http://127.0.0.1:8000/api/mypost',{userid:this.userid}).then((res)=>{
    
        // this.allposts=res.data.post
        //  if (this.selectedpostimage && this.selectedpostimage.id === postid) {
        //       this.selectedpostimage = this.allposts.find(post => post.id === postid);
        //     }
       
        
    // })
           }
        
       })
       .catch((err)=>{
        console.log(err);
        
       })

},
  }
  
}
</script>

<style>

</style>