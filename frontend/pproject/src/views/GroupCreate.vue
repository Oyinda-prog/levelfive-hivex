<template>
  <div class="container-fluid"  style="background-color: #f5f9ff;">
<div>
    <NavBar/>
</div>
<div class="row mt-5" >
   <div class="col-md-3 col-lg-3 col-12 border-3 my-5">
    <div class="alert alert-primary" v-if="checkmsg" >
      {{ msg }}
    </div>
      <h2 class="mt-5"><strong>Create Group</strong></h2>
      <div class="d-flex  my-4 p-3">
        <img :src="profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;">
        <div class="ms-3 mt-2">
          <h5>{{ name }}</h5>
        <h6>Admin</h6>
        </div>
      </div> 
      
   <input type="text" class="shadow-none form-control d-block my-5 " style="height: 80px;" placeholder="Group Name" v-model="groupname">
   <button class="form-select" @click="checkbox=true" >
    
Choose privacy
    </button>
   <button class="form-select" @click="checkbox=true" v-if="privacy && privacy == 'Public'">
    <p class="text-primary"> Choose privacy</p>
    <img src="../assets/public.png" width="30" height="30" alt="public" class="me-5"><strong class="text-bolder">
{{ privacy }}</strong>
    </button>
    <button class="form-select" @click="checkbox=true" v-if="privacy && privacy == 'Private'">
      <p class="text-primary">Choose privacy</p>
    <img src="../assets/padlock.png" width="30" height="30" alt="public" class="me-5">
 <strong>{{ privacy }}</strong>
    </button>
   <div v-if="checkbox" class="my-3 shadow" id="privacy" >
      <div class="d-flex justify-content-between p-3">
<img src="../assets/public.png" width="30" height="30" alt="public" class="me-5">
<div>
  <h6>Public</h6>
  <label for="public" class="w-75">Anyone can see who's in the group and what they post</label>
</div>
<input type="radio" value="Public" id="public" name="privacy" v-model="privacy" @change="handleprivacy">
      </div>
    <div class="d-flex justify-content-between p-3" >
<img src="../assets/padlock.png" width="30" height="30" alt="private" class="me-5" style="filter: grayscale();opacity: 50%;">
<div>
  <h6>Private</h6>
  <label for="private" class="w-75">Only members can see who's in the group and what they post</label>
</div>
<input type="radio" value="Private" id="private" name="privacy" v-model="privacy" @change="handleprivacy">
      </div>  
  </div>
      <div>
        
      </div>
      <div class="shadow my-5 p-5">
        <h5>About this Group</h5>
        <p>
This is a safe space for people who love [topic]. Whether you're here to learn, network, or just have fun, you're in the right place. Let's grow together!
</p>
<div :style="{cursor:groupname===''?'not-allowed':'pointer'}">

<button   class="btn btn-primary w-100" @click="createGroup">Create</button>
</div>
      </div>
   </div>
   <div class="col-md-9 col-12 bg-light mt-5">
     <GroupComponent :name="groupname" :privacy="privacy"/> 
        
     
   </div>
</div>
  </div>
</template>

<script>
import axios from 'axios';
import GroupComponent from './GroupComponent.vue';
import NavBar from './NavBar.vue';



export default {
  
    data(){
        return{
          msg:"",
          checkbox:false,
          selected:'',
          groupname:"",
          privacy:false,
          studentid:"",
          profilepicture:"",
          name:"",
          checkmsg:false
          
        }
    },
  mounted(){
    if (!localStorage.getItem('studentid')){
      this.$router.push('/login')
    }
    this.studentid=JSON.parse(localStorage.getItem('studentid'))
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
  },

  methods: {
  handleprivacy() {
   
    if (this.privacy === 'Public' || this.privacy === 'Private') {
      setTimeout(() => {
        this.checkbox = false; 
      }, 1000);
    }
  },

  createGroup(){
    if(this.groupname=='' || !this.privacy){
      this.checkmsg=true
      this.msg='The group name or Privacy cannot be empty'
      return
    }

    let groupData = {
      groupname: this.groupname,
      uniquenumber:Math.round(Math.random()*100000000000)+ Math.round(Math.random()*100000000000),
      student_id: this.studentid,
      privacy: this.privacy,
    };
    axios.post('https://backendhivex.onrender.com/api/creategroup',groupData)
    .then((res)=>{
      if(res.data.status===true){
        console.log(res.data);
         this.checkmsg=true
        this.msg=res.data.message
        setTimeout(() => {
          this.$router.push({name:'groupsparam',params:{id:res.data.group.uniquenumber}})
        }, 6000);
      }        
    }).catch((err)=>{
      this.checkmsg=true
      this.msg = 'Failed to create. Try again!'
      console.log(err.respose?.data || err.message);
      
    })

    setTimeout(() => {
      this.msg=''
      this.checkmsg=false
    }, 6000);
  }
},

components:{
  NavBar,
  GroupComponent
}
}
</script>

<style>

</style>