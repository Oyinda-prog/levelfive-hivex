<template>
  <NavBar/>
  <div class="container-fluid shadow mt-5" style="background-color: #f5f9ff;">
   
    <div class="row shadow justify-content-between">
      
      <div class=" bg-light childone col-md-3 d-md-block d-none d-sm-none">
           <div class="d-flex flex-column p-3 gap-3 mt-2">
         <div class="d-flex my-3">
   <div>
    <img
    :src="profilepicture || require('../assets/images/default.jpg')"
alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;"
    class="rounded"
  />
   <!-- <img :src="profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;"> -->
   </div>
   
   <div><h5 class="mt-3 ms-3">{{ fullname }}</h5></div>
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

    <div class="col-md-1 col-12">

    </div>
      <div class="col-12 col-sm-12 col-md-6 mx-auto two offset-md-3">
         <div v-if="load" class="text-center py-5">
          <img src="../assets/loading.png" alt="Loading..." class="d-block mx-auto spinner-animation" width="100px">
        </div>
      <div class="w-100 mx-auto shadow row p-5">
        <h5 class="" style="color:  rgb(0, 38, 77);">See your friends</h5>
  <div
    class="d-flex  bg-success border-2 overflow-auto gap-3 p-3 bg-light rounded shadow-sm"
    style="white-space: nowrap; height: 400px;"
  >
    <div
      class=" p-3 d-flex flex-column align-items-center"
      style="min-width: 300px;"
      v-for="student in allfriends"
      :key="student.student_id"
    >
    <div
  class="mb-4 rounded overflow-hidden"
  style="width: 100%; height: 400px;"
>
  <img
    :src="student.profilepicture || require('../assets/images/default.jpg')"
    alt="picture"
    style="width: 100%; height: 100%; object-fit: cover; display: block;"
    class="rounded"
  />
</div>

    <p>{{ student.fullname }}</p> 
      <div class="mt-5">
        <button  class="btn btn-outline-primary">View</button>
      </div>
    </div>
  </div>
</div>
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
    load:true,
    msg:'',
    allfriends:[],
    studentid:"",
    fullname:"",
    profilepicture:''

        }
    },

  mounted(){
  if (!localStorage.getItem('studentid'))
  {
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
  });

  axios.get(`https://backendhivex.onrender.com/api/allfriends/${this.studentid}`)
      .then((res) => {
        this.load=false
        this.allfriends = res.data.friends || [];
        if(this.allfriends.length === 0) {
          this.msg = "You have no friends yet.";
        }
      })
      .catch((err) => {
        this.msg = "Failed to load friends.";
        console.error(err.response?.data || err.message);
      })
      .finally(() => {
        this.load = false; 
      });
   
  },
  
 methods:{
 },
  components:{
    NavBar
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
.two{
    margin-top: 50px;
}
.modal-body{
    overflow-y: auto;
    max-height: 60vh;

}

.childthree {
 top:100px;
 right:0;
 position: fixed;
 overflow-y: auto;
 width: 25%;
 height:calc(100vh - 100px);
}
.navbar{
    display: grid;
    grid-template-columns:30%  50% 20% ;
    justify-content: space-between;
}
.navtwo{
    display: grid;
    place-content: center space-around;
    grid-template-columns: 20% 20% 20% 20%;
}
.postimage{
    overflow: hidden;
}
.content {
  text-align: justify;
}

</style>
