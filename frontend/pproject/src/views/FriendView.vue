<template>
  
  <div class="container-fluid">
      <div v-if="load===false" class="mx-auto col-12 col-md-9 ">
      <div class="text-center mt-5">
<img src="../assets/loading.png" alt="" class="d-block mx-auto " width="100px">
      </div>
</div>
<div class="d-flex justify-content-between">
<div>
<div class=" mt-2">
<button type="button" class="btn btn-primary position-relative" @click="this.$router.push('/friend')">
<strong>Friends</strong>
<span class=" badge rounded-pill bg-danger">
  
  <span ><strong>{{ allfriends.length }}</strong></span>
</span>
</button>
</div>
</div>
<div class="d-flex justify-content-between">
  <div>
  
<div class=" mt-2">
<button type="button text-white" style="background-color:  rgb(0, 38, 77);color: white;" class="btn  position-relative"  @click="this.$router.push('/notification')">
<strong>Notification</strong>
<span class=" badge rounded-pill bg-danger">
  
  <span ><strong>{{ allinvites.length }}</strong></span>
</span>
</button>
      </div>
</div>
<div class="mt-2 ms-1">
<button class="btn btn-primary" @click="this.$router.push('/')">Home</button>
</div>
</div>
</div>
    <div class="">
      <div class="row">
      
      <h3 class="text-center text-primary"  v-if="allfriends.length>0">All Friends</h3>
      
        <div class="col-12 col-md-3 card childone d-md-block d-none d-sm-none">
     <div class="d-flex flex-column p-3 gap-3 mt-2">
         <div class="d-flex my-3">
   <div><img :src="`http://localhost:8000/profilepictures/`+profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;"></div>
   <div><h5 class="mt-3 ms-3">{{ followername }}</h5></div>
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
        <div class="col-12 col-lg-9 offset-md-3 " v-if="allfriends.length>0">

           <div class="row mx-auto col-12 col-md-10">
 <div v-for="friend in allfriends" v-bind:key="friend" class="col-lg-6 col-md-5 col-sm-6 col-12" >
              <div  class="shadow d-block m-3">
                <div class="card" style="width: 100%;max-height: 450px;">
 
   <img
    :src="friend.profilepicture
      ? `http://localhost:8000/profilepictures/${friend.profilepicture}`
      : require('../assets/images/default.jpg')"
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

export default {
    data(){
return{
    userid:'',
    profilepicture:"",
    followername:'',
    allfriends:[],
    msg:"",
    load:false,
    allinvites:[]
}
    },
    mounted(){
      if(!localStorage.getItem('honeyuserid')){
        this.$router.push('/login')
      }
      this.userid=JSON.parse(localStorage.getItem('honeyuserid'))
      this.profilepicture=JSON.parse(localStorage.getItem('honeyprofilepicture'))
      this.followername=JSON.parse(localStorage.getItem('honeyfullname'))
        
      
      axios.post('http://127.0.0.1:8000/api/allfriends',{userid:this.userid}).then((res)=>{
     
        if(res.data.status==200){
          this.load=true
          this.allfriends=res.data.friends
        }
        else if(res.data.status==201){
this.msg=res.data.msg
this.load=true
        }
      
      axios.post('http://127.0.0.1:8000/api/getinvite',{student_id:this.userid}).then((res)=>{
   
    if(res.data.status==200){

        this.allinvites=res.data.allinvites
     
        
    }
    else if(res.data.status==500){
this.msg=res.data.msg
    }
       
      
    })
      })

    },
    methods:{
    logout(){
      localStorage.removeItem('honeyuserid')
      localStorage.removeItem('honeyprofilepicture')
      localStorage.removeItem('honeyfullname')
      this.$router.push('/login')
    }
  },
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
