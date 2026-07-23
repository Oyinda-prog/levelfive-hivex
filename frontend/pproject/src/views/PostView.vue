<template>
  <div class="container-fluid" style="background-color: #f5f9ff;">
    <NavBar/>
    <!-- <div class="alert alert-primary mt-5" v-if="check">
{{ msg }}
  </div> -->
  <div
  class=" mt-5 d-flex justify-content-center align-items-center"
  v-if="check"
  style="height: calc(100vh - 150px);width: calc(100vw - 400px)" 
>
  <h3 class="text-primary text-center">{{ msg }}</h3>
</div>

    <div class="row ">
      <div class="col-12 col-lg-3 card childone d-md-block d-none d-sm-none">
<div class="d-flex flex-column p-3 gap-3 mt-2">
         <div class="d-flex my-3">
   <div><img :src="profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;"></div>
   <div><h5 class="mt-3 ms-3">{{ this.fullname}}</h5></div>
         </div>
          <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/')">
     <img src="../assets/homepage.png" alt="img" width="41px"> 
     <h5 class="mt-3 ms-3">Home</h5>
         </div>
         <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/friend')" >
     <img src="../assets/friend.png" alt="img"> 
     <h5 class="mt-3 ms-3">Friends</h5>
         </div>
         <div class="d-flex my-2" @click="this.$router.push('/feeds')" style="cursor: pointer;">
     <img src="../assets/feed.png" alt="img" width="41px" > 
     <h5 class="mt-3 ms-3">Feeds</h5>
         </div>
         <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/profilepicture')">
     <img src="../assets/profilepicture.png" alt="img" width="41px"> 
     <h5 class="mt-3 ms-3">profile Picture</h5>
         </div>
         <div class="d-flex my-2" @click="this.$router.push('/groups/create')" style="cursor: pointer;">
     <img src="../assets/group.png" alt="img" width="41px"> 
     <h5 class="mt-3 ms-3">Start a Group</h5>
         </div>
        
         <div class="d-flex my-2" @click="$router.push('/createpost')" style="cursor: pointer;">
              <img src="../assets/createicon.png" width="41"> 
              <h5 class="ms-3 mt-3">Start Post</h5>
            </div>
         <div class="d-flex my-2" @click="this.$router.push('/manage_groups')" style="cursor: pointer;">
     <img src="../assets/birthday.png" alt="img" width="41px"> 
     <h5 class="mt-3 ms-3">Manage Groups</h5>
         </div>
         <div class="d-flex my-2" @click="logout()" style="cursor: pointer;">
     <img src="../assets/logout.png" alt="img" width="41px"> 
     <h5 class="mt-3 ms-3">LogOut</h5>
         </div>
         
           
      </div>
  </div>
  
  <div class="col-12 col-lg-7 offset-md-3 mt-5"   v-if="Array.isArray(posts)">
        <div v-if="load" class="text-center py-5">
          <img src="../assets/loading.png" alt="Loading..." class="d-block mx-auto spinner-animation" width="100px">
        </div>

 
        <div v-else>
          
          <div class="shadow col-12 col-md-10 p-2 mx-auto mt-5" v-for="post in posts" :key="post.id" >
           <div class="d-flex p-3 mt-5">
             <img :src="post.student.profilepicture" alt="profile picture" width="50px" height="50px" style="border-radius: 100%; border: none;" v-if="post.student.profilepicture!=null">
             <h5 class="m-3">{{ post.student.fullname }}</h5>
           </div>
           <div class="col-12 col-md-12 p-2">
             <p>{{ post.content }}</p>
       <img :src="post.post_img" alt="post image"   class="img-fluid w-100 d-block mx-auto" style="max-height: 600px; object-fit: cover;" v-if="post.post_img">
             <div class="d-flex justify-content-between" >
         
             </div>
            </div>
         
          </div>
        </div>


    <!-- <div class="mt-5"></div>  -->
  </div>
    </div>
  </div> 
  
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue';
export default {
data(){
return{
    studentid:"",
    posts:[],
    check:true,
    fullname:'',
    profilepicture:'',
    load:true
}
},
methods:{
logout(){
      localStorage.removeItem('studentid')
      this.$router.push('/login')
    },
},
  mounted(){
    if(!localStorage.getItem('studentid')){
      this.$router.push('/login')
    }
      this.studentid=JSON.parse(localStorage.getItem('studentid'))
  
 axios.get(
    `https://backendhivex.onrender.com/api/getcurrentstudent/${this.studentid}`
  )
  .then((res) => {
    console.log(res.data.student);

    this.profilepicture=res.data.student.profilepicture
    this.fullname=res.data.student.fullname
   
  })
  .catch((err) => {
     console.log(err.response?.data || err);
      // console.log(err);
  });

    axios.get(`https://backendhivex.onrender.com/api/mypost/${this.studentid}`).then((res)=>{
      if(res.data.status==200){
        this.check=false
             this.posts=res.data.post 
             console.log(this.posts);
             
    }
    else if(res.data.status==201){
this.msg=res.data.msg
this.check=false
    } 
    }).catch((err)=>{
        console.log(err);
        this.check=false
        
    })
 
  },
  components:{
    NavBar,
    
  }
}
</script>

<style scoped>
.childone {
  position: fixed;
  top: 100px;
  left: 0;
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 25%;
}
</style>