<template>
  <div class="container-fluid" style="background-color: #f5f9ff; min-height: 100vh; overflow-y: auto;">
   
    <NavBar />

    <div class="">
      <div class="row shadow justify-content-between mt-5">
     
        <div class="bg-light col-lg-3 d-lg-block d-none d-sm-none sidebar childone">
          <div class="d-flex flex-column p-3 gap-3">
            <div class="d-flex my-3">
              <div>
                <img :src="`http://localhost:8000/profilepictures/`+profilepicture" 
                     alt="picture" height="50px" width="50px" 
                     style="border-radius: 100%; border: none;">
              </div>
              <div><h5 class="mt-3 ms-3">{{ followername }}</h5></div>
            </div>

           
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/')">
              <img src="../assets/homepage.png" width="41px"> 
              <h5 class="mt-3 ms-3">Home</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/friend')">
              <img src="../assets/friend.png"> 
              <h5 class="mt-3 ms-3">Friends</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/feeds')">
              <img src="../assets/feed.png" width="41px"> 
              <h5 class="mt-3 ms-3">Feeds</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/profilepicture')">
              <img src="../assets/profilepicture.png" width="41px"> 
              <h5 class="mt-3 ms-3">Profile Picture</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/groups/create')">
              <img src="../assets/group.png" width="41px"> 
              <h5 class="mt-3 ms-3">Start a Group</h5>
            </div>
            
            <div class="menu-item d-flex my-2 " @click="$router.push('/createpost')" style="cursor: pointer;">
              <img src="../assets/createicon.png" width="41"> <h5 class="ms-3 mt-3">Start Post</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/manage_groups')">
              <img src="../assets/birthday.png" width="41px"> 
              <h5 class="mt-3 ms-3">Manage Groups</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="logout()">
              <img src="../assets/logout.png" width="41px"> 
              <h5 class="mt-3 ms-3">LogOut</h5>
            </div>
          </div>
        </div>

       
        <div class="col-lg-9 col-12 mt-5 offset-lg-3">
        
        
          <div class="col-12 col-lg-5 mx-auto mt-4 p-2" v-if="Array.isArray(allinvites)">
            <div v-for="invite in allinvites" :key="invite.grouppostinvites_id"
                 class=" mb-4 shadow invitation-card ">
              <div class="d-flex align-items-center">
                <img :src="`http://localhost:8000/profilepictures/`+invite.group.profilepicture" 
                     class="rounded-circle me-3" width="60" height="60">
                <div>
                  <p class="mb-1 p-3">
                    <strong>{{ invite.group.fullname }}</strong> invited you to join 
                    <span class="fw-bold">{{ invite.group.name }}</span>, 
                    <span class="text-muted">a {{ invite.group.privacy }} group</span>
                  </p>

                  <div class="d-flex  mt-2 p-2">
                    <button v-if="invite.status=='Sent' || invite.status==null"
                            class="btn btn-primary btn-s"
                            @click="receiveInvite(invite.grouppostinvites_id)">
                      Accept
                    </button>
                    
                    <button v-if="invite.status=='Accepted'" 
                            class="btn btn-primary"
                            >
                      Accepted
                    </button>
                    <button v-if="invite.status=='Sent'" class="btn btn-outline-danger btn-sm">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        
          <div v-else class="d-flex justify-content-center align-items-center" 
               style="height: 50vh;">
            <p class="text-muted fs-4">{{ msg }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import NavBar from './NavBar.vue'

export default {
  data(){
    return{
      userid:"",
      profilepicture:"",
      followername:"",
      name:"",
      allinvites:"",
      msg:'',
      check:false
    }
  },
  mounted(){
    if(!localStorage.getItem('honeyuserid')){
      this.$router.push('/login')
    }
    this.userid=JSON.parse(localStorage.getItem('honeyuserid'))
    this.profilepicture=JSON.parse(localStorage.getItem('honeyprofilepicture'))
    this.followername=JSON.parse(localStorage.getItem('honeyfullname'))
    axios.post('http://127.0.0.1:8000/api/getinvite',{student_id:this.userid}).then((res)=>{
      if(res.data.status==200){
        this.allinvites=res.data.allinvites
      }
      else if(res.data.status==501){
        this.msg=res.data.msg
        this.check=true
      }
    })
  },
  methods:{
    logout(){
      localStorage.removeItem('honeyuserid')
      localStorage.removeItem('honeyprofilepicture')
      localStorage.removeItem('honeyfullname')
      this.$router.push('/login')
    },
    receiveInvite(id){
      axios.post('http://127.0.0.1:8000/api/acceptinvite',{id}).then((res)=>{
        console.log(res.data);
      })  
      alert(id)
    }
  },
  components:{
    NavBar
  }
}
</script>

<style scoped>
.sidebar {
 
  overflow-y: auto;

}
.childone {
  position: fixed;
  top: 100px;
  left: 0;
  overflow-y: auto;
  height: calc(100vh - 100px);
  width: 25%;
}
.menu-item {
  cursor: pointer;
  transition: background 0.2s;
  padding: 6px;
  border-radius: 8px;
}
.menu-item:hover {
  background: #eef3f8;
}
.invitation-card {
  border-left: 6px solid #0a66c2;
  background: linear-gradient(135deg, #f0f6ff, #ffffff);
  border-radius: 12px;
  transition: transform 0.2s;
}
.invitation-card:hover {
  transform: translateY(-3px);
}
</style>
