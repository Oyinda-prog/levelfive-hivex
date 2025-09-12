<template>
  <div class="container-fluid"  style="background-color: #f5f9ff;">
<div>
    <NavBar/>
</div>
<div class="row mt-5">
   <div class="col-md-3 col-lg-3 col-12 border-3 mt-5">
       <PanelComponent  :group="group"/>    
   </div>
   <div class="col-md-9 col-12 bg-light mt-5">
     <GroupComponent :create="btn" :check="check"/>   
   </div>
</div> 
  </div>
</template>
<script>
import axios from 'axios';
import GroupComponent from './GroupComponent.vue';
import NavBar from './NavBar.vue';
import PanelComponent from './PanelComponent.vue';
export default {
  data(){
      return{
      btn:'Create New Group',
      check:true,
      userid:"",
      profilepicture:"",
      name:"",
      group:[],
      msg:""
      }
  },
  mounted(){
    
    this.userid=JSON.parse(localStorage.getItem('honeyuserid'))
  
    
    this.profilepicture=JSON.parse(localStorage.getItem('honeyprofilepicture'))
    this.name=JSON.parse(localStorage.getItem('honeyfullname'))
    axios.post('http://127.0.0.1:8000/api/getallgroups',{student_id:this.userid}).then((res)=>{
    if(res.data.status==200){

      this.group=res.data.allgroups
    }
    else if(res.data.status==201){
this.msg=res.data.msg
    }
      
    })
},
components:{
    NavBar,
    PanelComponent,
    GroupComponent
}

}
</script>

