<template>
  <div class="container-fluid">
    <NavBar/>
    <div v-if="load === false" class="mx-auto col-12 col-md-9">
      <div class="text-center mt-5">
        <img src="../assets/loading.png" alt="" class="d-block mx-auto" width="100px">
      </div>
    </div>

    <div>
      <div class="row">
        <div class="col-12 col-md-3 card childone d-md-block d-none d-sm-none">
          <div class="d-flex flex-column p-3 gap-3 mt-2">
            <div class="d-flex my-3">
              <div>
                <img :src="`http://localhost:8000/profilepictures/`+profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%;">
              </div>
              <div><h5 class="mt-3 ms-3">{{ followername }}</h5></div>
            </div>
            <div class="menu-item" @click="$router.push('/')">
              <img src="../assets/homepage.png" width="41"> <h5 class="ms-3">Home</h5>
            </div>
            <div class="menu-item" @click="$router.push('/friend')">
              <img src="../assets/friend.png"> <h5 class="ms-3">Friends</h5>
            </div>
            <div class="menu-item" @click="$router.push('/feeds')">
              <img src="../assets/feed.png" width="41"> <h5 class="ms-3">My Feeds</h5>
            </div>
            <div class="menu-item" @click="$router.push('/profilepicture')">
              <img src="../assets/profilepicture.png" width="41"> <h5 class="ms-3">Profile Picture</h5>
            </div>
            <div class="menu-item" @click="$router.push('/groups/feed')">
              <img src="../assets/group.png" width="41"> <h5 class="ms-3">Start a Group</h5>
            </div>
            <div class="menu-item" @click="$router.push('/marketplace')">
              <img src="../assets/marketplace.png" width="41"> <h5 class="ms-3">Marketplace</h5>
            </div>
            <div class="menu-item" @click="$router.push('/createpost')">
              <img src="../assets/createicon.png" width="41"> <h5 class="ms-3">Start Post</h5>
            </div>
            <div class="menu-item" @click="$router.push('/manage_groups')">
              <img src="../assets/birthday.png" width="41"> <h5 class="ms-3">Manage Groups</h5>
            </div>
            <div class="menu-item" @click="logout">
              <img src="../assets/logout.png" width="41"> <h5 class="ms-3">Log Out</h5>
            </div>
          </div>
        </div>
        
        <div class="mt-5">
        </div>
        <div class="col-12 col-lg-9 offset-md-3">
          <div class="mt-5"></div>
          <div class="create-post-card p-4 rounded shadow my-4">
              <p v-if="msg" class="mt-3 alert alert-primary">{{ msg }}</p>
              <h2 class="mb-4 text-center " style="color:  rgb(0, 38, 77);"> Make a Post</h2>
            <textarea
              rows="4"
              v-model.trim="content"
              class="form-control mb-3"
              placeholder="What's on your mind?"
            ></textarea>
           
             <div class="mb-3">
  <input 
    type="file" 
    ref="fileInput" 
    class="d-none" 
    @change="handleChange"
  >
  <img 
    src="../assets/img.png" 
    alt="Upload" 
    width="40" 
    height="40" 
    class="upload-icon" 
    @click="$refs.fileInput.click()"
  >
</div>


            <button class="btn post-btn w-100" @click="createpost">Post</button>
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
    return {
      studentid: '',
      profilepicture: '',
      followername: '',
      allfriends: [],
      msg: '',
      load: false,
      content: '',
      postMsg: ''
    }
  },
  mounted(){
    if(!localStorage.getItem('studentid')){
      this.$router.push('/login')
    }
    this.studentid = JSON.parse(localStorage.getItem('studentid'))
    this.profilepicture = JSON.parse(localStorage.getItem('honeyprofilepicture'))
    this.followername = JSON.parse(localStorage.getItem('honeyfullname'))

   axios.post(
    'https://backendhivex.onrender.com/api/allfriends',
    {
        userid: this.studentid
    }
)
.then((res) => {
    console.log(res.data.followers);
    this.friends = res.data.followers;
})
.catch((err) => {
    console.log(err);
});
  },
  methods:{
    logout(){
      localStorage.removeItem('studentid')
      localStorage.removeItem('honeyprofilepicture')
      localStorage.removeItem('honeyfullname')
      this.$router.push('/login')
    },
    handleChange(e){
      this.file=e.target.files[0]
    
    },
    createpost(){
      if(this.content.trim() === ''){
        this.msg = 'Post content cannot be empty.'
      } 
      const post=new FormData()
        post.append('student_id',this.studentid)
        post.append('content',this.content)
        if (this.file) {
          post.append('image', this.file);
        }
       axios.post('https://backendhivex.onrender.com/api/post',post,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
       })
        .then((res) => {
    if (res.data.status) {
      this.msg = res.data.message;
      this.content = '';
      this.file = null;
    }
})
.catch((err) => {
  console.log(err.response.data);
  
    this.msg = err.response?.data?.message || err.message;
});
      
      setTimeout(() => {
        this.msg=''
      }, 6000);
    }
  },
  components:{
    NavBar
  }
}
</script>
<style scoped>
html, body {
  height: 100%;
  margin: 0;
 
  background: linear-gradient(180deg, #f5f9ff 0%, rgba(173,216,230,0.4) 70%, rgba(255,255,255,0) 100%);
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
  z-index: 10;
}


@media (min-width: 992px) {
  .col-12.col-lg-9.offset-md-3 {
    margin-left: 25%; 
  }
}

.menu-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background 0.3s;
}
.menu-item:hover {
  background: rgba(255, 255, 255, 0.2);
}


.create-post-card {
  max-width: 600px; 
  margin: auto; 
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: white;
  padding: 20px;
}

.create-post-card h2 {
  font-size: 1.5rem;
  font-weight: bold;
}


.post-btn {
  background: linear-gradient(90deg, #ff80ab, #80d0ff);
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  transition: all 0.3s ease;
}
.post-btn:hover {
  background: linear-gradient(90deg, #ff99c8, #99e0ff);
}

.no-friends-card {
  min-height: calc(100vh - 100px);
  background: rgba(255, 255, 255, 0.1);
}
</style>

