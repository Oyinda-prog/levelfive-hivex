<template>
  <div class="bg-light col-lg-3 sidebar">
          <div class="d-flex flex-column p-3 gap-3">
            <div class="d-flex my-3">
              <div>
                <img :src="`http://localhost:8000/profilepictures/`+profilepicture" 
                     alt="picture" height="50px" width="50px" 
                     style="border-radius: 100%; border: none;">
              </div>
              <div><p style="font-size: 13px;font-weight: bold;" class="mt-3 ms-3">{{ fullname }}</p></div>
            </div>

           
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/')" title="Home">
              <img src="../assets/homepage.png" width="41px"> 
              <h5 class="mt-3 ms-3">Home</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/friend')" title="Friends">
              <img src="../assets/friend.png"> 
              <h5 class="mt-3 ms-3">Friends</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/feeds')" title="Feeds">
              <img src="../assets/feed.png" width="41px" > 
              <h5 class="mt-3 ms-3">Feeds</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/profilepicture')" title="Profile Picture">
              <img src="../assets/profilepicture.png" width="41px"> 
              <h5 class="mt-3 ms-3">Profile Picture</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/groups/feed')"  title="Start a Group">
              <img src="../assets/group.png" width="41px"> 
              <h5 class="mt-3 ms-3">Start a Group</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/marketplace')" title="Marketplace">
              <img src="../assets/marketplace.png" width="41px"> 
              <h5 class="mt-3 ms-3">Marketplace</h5>
            </div>
            <div class="menu-item d-flex my-2 " @click="$router.push('/createpost')" style="cursor: pointer;" title="Start Post">
              <img src="../assets/createicon.png" width="41"> <h5 class="ms-3 mt-3">Start Post</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="this.$router.push('/manage_groups')" title="Manage Groups">
              <img src="../assets/birthday.png" width="41px"> 
              <h5 class="mt-3 ms-3">Manage Groups</h5>
            </div>
            <div class="d-flex my-2 menu-item" @click="logout()" title="Logout">
              <img src="../assets/logout.png" width="41px"> 
              <h5 class="mt-3 ms-3">LogOut</h5>
            </div>
            <div class="d-md-none d-flex my-2 menu-item " title="Settings"  @click="this.$router.push('/settings')" style="cursor: pointer;">
              <img src="../assets/setting.png" alt="Settings" width="41px" >
              <h5 class="mt-3 ms-3">Settings</h5>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  data(){
    return{
profilepicture:'',
fullname:''
    }
  },
  mounted(){
 this.profilepicture=JSON.parse(localStorage.getItem('honeyprofilepicture'))
  this.fullname=JSON.parse(localStorage.getItem('honeyfullname'))
  },
  methods:{
    logout(){
      localStorage.removeItem('honeyuserid')
      localStorage.removeItem('honeyprofilepicture')
      localStorage.removeItem('honeyfullname')
      this.$router.push('/login')
    },
  }
}
</script>

<style scoped>
.sidebar{
    position: fixed;
top: 0;
left: 0;
height: 100%;
width: 250px;
z-index: 1050;
background-color: #fff;
transition: transform 0.3s ease;

}

</style>