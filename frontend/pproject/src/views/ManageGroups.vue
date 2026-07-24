<template>
  <div class="container-fluid" style="background-color: #f5f9ff;">
    <NavBar />
    <div class="row mt-5">
      <div class="col-12 col-md-3 card childone d-md-block d-none d-sm-none">
        <div class="d-flex flex-column p-3 gap-3 mt-2">
          <div class="d-flex my-3">
            <div>
              <img :src="profilepicture || require('../assets/images/default.jpg')" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;">
            </div>
            <div><h5 class="mt-3 ms-3">{{ name }}</h5></div>
          </div>
          <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/')">
            <img src="../assets/homepage.png" alt="img" width="41px"> 
            <h5 class="mt-3 ms-3">Home</h5>
          </div>
          <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/friend')">
            <img src="../assets/friend.png" alt="img"> 
            <h5 class="mt-3 ms-3">Friends</h5>
          </div>
          <div class="d-flex my-2" @click="this.$router.push('/feeds')" style="cursor: pointer;">
            <img src="../assets/feed.png" alt="img" width="41px"> 
            <h5 class="mt-3 ms-3">Feeds</h5>
          </div>
          <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/profilepicture')">
            <img src="../assets/profilepicture.png" alt="img" width="41px"> 
            <h5 class="mt-3 ms-3">Profile Picture</h5>
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
      <div class="col-12 col-md-8 offset-lg-3 main-content">
        <div class="mt-5"></div>
        <div class="col-12 d-flex justify-content-between align-items-center p-3 mt-2" style="border-bottom: 1px solid lightgrey;">
          <h4 class="">Groups</h4>
          <button class="custom-btn" @click="this.$router.push('/groups/create')">{{ btn }}</button>
        </div>
        <div class="col-12">
          
          <div v-if="checkgroup" class="d-flex justify-content-center align-items-center" style="min-height: 300px;">
            <h5 class="text-muted">{{ msg }}</h5>
          </div>
          <div v-for="group in groups" :key="group.group_id" style="cursor: pointer;" @click="this.$router.push({name:'groupsparam',params:{id:group.uniquenumber}})">
            <div class="group-card shadow p-5 col-md-7 col-12 mx-auto">
              <img  src="../assets/images/default.jpg" alt="" class="rounded">
              <h5 class="mt-3 text-primary"><strong>{{ group.name }}</strong></h5>
              <p>{{ group.privacy }}</p>
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
  components: { NavBar },
  data() {
    return {
      msg: "",
      btn: 'Create New Group',
      check: true,
      studentid: "",
      profilepicture: "",
      name: "",
      groups: [],
      checkgroup: false
    }
  },
  
  mounted() {
    if (!localStorage.getItem('studentid')) {
      this.$router.push('/login')
    }
    this.studentid = JSON.parse(localStorage.getItem('studentid'))
    axios.get(
      `https://backendhivex.onrender.com/api/getcurrentstudent/${this.studentid}`
    )
    .then((res) => {
      this.profilepicture=res.data.student.profilepicture
      this.name=res.data.student.fullname
      console.log(res.data);
      
    })
    .catch((err) => {
      console.log(err.response?.data || err.message);
    });
  

    axios.get(`https://backendhivex.onrender.com/api/getallgroups/${this.studentid}`).then((res) => {
      if (res.data.status === true) {
        console.log(res.data);
        
        this.groups = res.data.allgroups
      } else if (res.data.status == false ) {
        console.log(res.data);
        
        this.msg = res.data.msg;
        this.checkgroup = true
      }
    }).catch((err)=>{
      this.msg = err.response?.data || err.message
      console.log(err.response);
      
    })
  },
  methods: {
    logout() {
      localStorage.removeItem('studentid')
      this.$router.push('/login')
    }
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

.main-content {
  margin-top: 20px; 
  padding-top: 0;
}

.group-card {
  cursor: pointer;
  margin: 20px auto;
  max-width: 900px;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
}

.group-card img {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
}

.group-card h5 {
  margin-top: 15px;
  color: #0d6efd;
  text-align: center;
}

.custom-btn {
  background-color: #fff5f7;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 10px 18px;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}
.custom-btn:hover {
  background-color: #ffe4ec;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
.custom-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
