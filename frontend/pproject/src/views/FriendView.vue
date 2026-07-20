<template>
  <NavBar/>
  <div class="container-fluid">
      
    <div class="">
      <div class="row">
      
      <!-- <h3 class="text-center text-primary"  v-if="allfriends.length>0">All Friends</h3> -->
      
        <div class="col-12 col-md-3 card childone d-md-block d-none d-sm-none">
     <div class="d-flex flex-column p-3 gap-3 mt-2">
         <div class="d-flex my-3">
   <div><img :src="profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;"></div>
   <div><h5 class="mt-3 ms-3">{{fullname }}</h5></div>
         </div>
          <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/')">
     <img src="../assets/homepage.png" alt="img" width="20px" height="20px"> 
     <p class="mt-3 ms-3">Home</p>
         </div>
         <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/friend')" >
     <img src="../assets/friend.png" alt="img" width="41px"> 
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
         <div class="d-flex my-2" @click="this.$router.push('/groups/feed')" style="cursor: pointer;">
     <img src="../assets/group.png" alt="img" width="41px"> 
     <h5 class="mt-3 ms-3">Start a Group</h5>
         </div>
         <div class="d-flex my-2"  @click="this.$router.push('/marketplace')" style="cursor: pointer;">
     <img src="../assets/marketplace.png" alt="img" width="41px"> 
     <h5 class="mt-3 ms-3">Marketplace</h5>
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
        <!-- <div class="col-12 col-lg-9 offset-md-3 " v-if="allfriends.length>0"> -->
           <div class="col-12 col-lg-9 offset-md-3 " >
                  <div v-if="load===true" class="mx-auto col-12 col-md-9 ">
      <div class="text-center mt-5">
<img src="../assets/loading.png" alt="" class="d-block mx-auto " width="100px">
      </div>
</div>
           <div class="row mx-auto col-12 col-md-10">
 <div v-for="friend in allfriends" v-bind:key="friend" class="col-lg-6 col-md-5 col-sm-6 col-12" >
              <div  class="shadow d-block m-3">
                <div class="card" style="width: 100%;max-height: 450px;">
 
   <img
    :src="friend.profilepicture || require('../assets/images/default.jpg')"
    alt="picture"
    style="width: 100%; height: 100%; object-fit: cover; display: block;"
    class="rounded"
  />
  <div class="p-2">
    <button disabled class=" btn btn-outline-primary  p-2 my-5">{{ friend.fullname}}</button>
    <hr>
  </div>
</div>
              </div>
               </div>
           </div>
        </div>

   </div>
   
<div 
  class="col-12 col-lg-9 offset-md-3 d-flex justify-content-center align-items-center"
  style="min-height: calc(100vh - 100px); background: linear-gradient(to bottom, rgba(245, 249, 255, 0.8), rgba(214, 228, 245, 0.8));"
 v-if="this.msg!==''"  
>
  <h3 class="text-center text-primary fs-4 fw-bold">{{ msg }}</h3>
  
  <button class=" ms-2 btn btn-outline-primary" @click="this.$router.push('/')">Follow friends</button>
</div>


</div>
 </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue';


export default {
    data(){
return{
    studentid:'',
    fullname:'',
    profilepicture:'',
    allfriends:[],
    msg:'',
    load:true,
    allinvites:[]
}
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
      axios.get(`https://backendhivex.onrender.com/api/allfriends/${this.studentid}`).then((res)=>{
          this.load=false
          this.allfriends=res.data.friends
          console.log(this.allfriends);
          
       
      }).catch((err)=>{
    
        console.log(err.response?.data || err.message);
        
      })

    },
    methods:{
    logout(){
      localStorage.removeItem('studentid')
      localStorage.removeItem('honeyprofilepicture')
      this.$router.push('/login')
    },
  },
  components:{
 NavBar
}
}
</script>

<style>
html, body {
  height: 100%;
  margin: 0;
}

body {
  background: linear-gradient(
    to right,
    rgba(79, 172, 254, 0.04),
    rgba(251, 40, 196, 0.04)
  );
  background-repeat: no-repeat;
  background-attachment: fixed;
}


.childone {
  position: fixed;
  top: 100px;
  left: 0;
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 25%;
}
</style>
