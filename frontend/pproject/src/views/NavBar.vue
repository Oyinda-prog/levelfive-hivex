<template>
   <div class="navbar navbar-expand-lg bg-light position-fixed top-0 shadow p-4 w-100 mb-5">
        
        <div class="d-flex justify-content-between w-100">
            <div >
                <img src="../assets/hivex.png" alt="" width="80">
            </div>
            <img src="../assets/creategroup.png" alt="Start a group" class="d-md-block d-none" width="40px" height="40px"   @click="this.$router.push('/groups/create')" style="cursor: pointer;" title="Start a Group" >
            <img src="../assets/images/homeicon.jpg" alt="" width="30px" height="30px" class=" d-none d-md-block"  @click="this.$router.push('/')" style="cursor: pointer;" title="Home">
             <div class="d-flex ">
<!-- <div class=" mt-2">
<button title="Notification" type="button" class="btn btn-primary position-relative"  @click="this.$router.push('/notification')">
  <strong>Notification</strong>
  <span class=" badge rounded-pill bg-danger">
    
    <span ><strong>{{ allinvites.length }}</strong></span>
  </span>
</button>
        </div> -->
        <div class="mt-2 ms-2 d-none d-md-block" title="Settings" >
            <img src="../assets/setting.png" alt="" width="30px" height="30px" class="d-block"  @click="this.$router.push('/settings')" style="cursor: pointer;">
        </div>
        <div class="mt-2 ms-2 d-block d-md-none" title="Menu"  @click="menu" >
            <img src="../assets/ham.png" alt="" width="30px" height="30px" class="d-block" style="cursor: pointer;">
        </div>
             </div>
            
        </div>
        <div v-if="showsidebar" class="sidebar-overlay" @click="showsidebar=false">

        </div>
        
        <SideBar v-if="showsidebar" />
       
    </div>
    <div>
        
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue'
import axios from 'axios'

export default {
    data(){
return{
    userid:"",
    profilepicture:"",
    name:"",
    allinvites:"",
    showsidebar:false
}
    },
mounted(){
    
    this.userid=JSON.parse(localStorage.getItem('honeyuserid'))
    this.profilepicture=JSON.parse(localStorage.getItem('honeyprofilepicture'))
    this.name=JSON.parse(localStorage.getItem('honeyfullname'))
    axios.post('http://127.0.0.1:8000/api/getinvite',{student_id:this.userid}).then((res)=>{
   
    if(res.data.status==200){

        this.allinvites=res.data.allinvites
    }
    else if(res.data.status==500){
this.msg=res.data.msg
    }
       
      
    })
},
methods:{
menu(){
  
    
    this.showsidebar=!this.showsidebar
}
},
components:{
SideBar
}
}
</script>

<style scoped>
.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.3);
  z-index: 1040;
}
</style>