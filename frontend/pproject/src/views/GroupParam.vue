<template>
  <div class="container-fluid"  style="background-color: #f5f9ff;">
   <NavBar/>
   <div class="row mt-5 shadow">
    <div class="col-md-3 col-12 mt-5 shadow">
 <div class="d-flex mt-5">
 <img src="../assets/groupbg.png" alt="" class="rounded-3 w-100"  height="80px" style="max-width: 100px; filter: grayscale(100%);position: relative; z-index: 1;">
 <div class="ms-2 mt-3">
    <h6>{{ group.name  }}</h6>
    <div v-if="group.privacy=='Private'"> <img src="../assets/padlock.png" alt="" width="10px" height="10px"> {{ group.privacy }} group. <span>{{ 1 }} member</span></div>
    <div v-if="group.privacy=='Public'"> <img src="../assets/public.png" alt="" width="10px" height="10px"> {{ group.privacy }} group. <span>{{ 1 }} member</span></div>
    
 </div>
</div>
<h5 class="mt-3">Manage</h5> 
<hr>
<div class=" shadow">
    <div class="p-3 m-2">
 <h6>What's on your mind?</h6>
 <p>Start a discussion, share an update, or ask a question — this is your space to connect with the group!</p>
 <button class="btn btn-outline-primary d-block m-2" data-bs-toggle="modal" data-bs-target="#exampleModal">Create a post</button>
 <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModalone">Invite People to Join</button>
    </div>
</div>
<div class="shadow p-2">
    <ul class="list-group list-group-flush list-unstyled m-4 ">
         GROUP RULES
<li class="m-3">
1️⃣ Be Respectful  
Treat everyone with kindness. Personal attacks, hate speech, or bullying will not be tolerated.</li>
<li class="m-3">
2️⃣ No Spam or Self-Promotion  
Avoid irrelevant links, repeated messages, or promotional content unless allowed by admins.
</li>
<li class="m-3">3️⃣ Stay On Topic  
Keep discussions relevant to the purpose of the group. Off-topic posts may be removed</li>
<li class="m-3">4️⃣ Protect Privacy  
Do not share private information (yours or others') without consent.</li>
<li class="m-3">
5️⃣ Report Issues  
If you see any harmful or inappropriate behavior, report it to the group admins immediately.</li>
<li class="m-3">

By staying in this group, you agree to follow these rules and keep the community safe and welcoming.</li>

        <!-- <li class="list-group-item"><a href="#" class="text-decoration-none text-dark">Group Settings</a></li>  -->
        </ul>
        <hr>
</div>
   
    </div>
    <div class="col-md-9 col-12 mt-5 shadow">
     <div class="mt-5">
        <img src="../assets/groupbg.png" alt="" class="w-100 rounded d-block mt-2" style="filter: grayscale(100%); position: relative; z-index: 1;">
        <div class="p-3">
<h4>{{group.name}}</h4>
 <div v-if="group.privacy=='Private'"> <img src="../assets/padlock.png" alt="" width="10px" height="10px"> {{ group.privacy }} group. <span>{{ 1 }} member</span></div>
    <div v-if="group.privacy=='Public'"> <img src="../assets/public.png" alt="" width="10px" height="10px"> {{ group.privacy }} group. <span>{{ 1 }} member</span></div>
      <div class="mt-2"></div>
    <div class="d-flex">
        <img :src="profilepicture || require('../assets/images/default.jpg')" alt="" width="50px" class="rounded-pill-" height="50px"  style="border-radius: 100%; border: none;">
        
        <div class="m-3">
            <h5>{{ name }}</h5>
        <h6>Admin</h6>
        </div>
    </div>
        </div>
        <hr>
        <div class="col-md-10 col-12 mx-auto shadow">
  <div class="m-2 p-2">
<h5>WELCOME TO YOUR GROUP!</h5>

<p>This group is your space to connect with others who share similar interests. Whether it's for learning, sharing updates, getting support, or just having fun — you’re in the right place.</p>

<p> What you can do here:</p>
<p>• Share thoughts, updates, photos, or videos</p> 
<p>• Start and join conversations </p> 
<p>• Ask questions or give advice  </p>
<p>• Collaborate on topics or projects </p> 
<p>• Invite others who may be interested </p> 

<h6> Group Purpose:</h6>
<p>Use this group to stay connected, informed, and inspired. Every member adds value, so feel free to contribute positively and engage with others.</p>
<p>
     Admins may post announcements or updates occasionally, so make sure your notifications are on if you don’t want to miss anything important.
</p>
<p> Let’s grow this community together — invite your friends, share useful content, and be an active part of the conversation!</p>
<h6>
 Enjoy your time here and make the most of the group!</h6>

  </div>
        </div>
<div class="col-12 col-md-6 mx-auto shadow" v-if="grouppost && grouppost.length>0">
    <div class="m-3 p-3">
  
        <div class="" v-for="post in grouppost" :key="post.id">
            <div  class="d-flex mt-3">
        <img :src="`http://localhost:8000/profilepictures/`+group.profilepicture" alt="" width="50px" class="rounded-pill-" height="50px"  style="border-radius: 100%; border: none;">
        <div class="ms-3 mb-5">
            <h5>{{ name }}</h5>
        </div>
        </div> 
            <p class="text-muted text-align">{{ post.created_at }}</p>
            <p>{{ post.content }}</p>
            <img v-if="post.image" :src="`http://localhost:8000/grouppostimages/`+post.image" alt="" width="100%" height="300px" class="rounded-3" style="max-height: 400px;">
            <hr>
            <div class="d-flex justify-content-between w-50">
                 <div class="d-flex">
                    <img src="../assets/images/likeone.jpg" alt="" width="50px" height="50px">
                    <span class="d-block mt-3">Like</span>
                 </div>
                 <div class="d-flex">
<img src="../assets/images/messageicon.jpg" alt="" width="30px" height="30px">
                    <span class="">Comment</span>
                 </div>

            </div>
            <hr>
            <hr>
  
        </div>
    </div>
</div>
     </div>    
    </div>

   </div>
  </div>
 
<div class="modal fade" id="exampleModalone" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title text-center  fs-5" id="exampleModalLabel">Invite followers to this group</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
            <p class="text-primary alert alert-success" v-if="msg!=''" >{{ msg }}</p>
           <div  class="d-flex mt-3">
        <img :src="profilepicture" alt="" width="50px" class="rounded-pill-" height="50px"  style="border-radius: 100%; border: none;">
        <div class="ms-3 mb-5">
            <h5>{{ name }}</h5>
        </div>
        </div> 
        <div class="d-flex justify-content-between" v-for="student in allstudents" :key="student.id">
         <div class="d-flex">
            <img v-if="student.profilepicture" :src="`http://localhost:8000/profilepictures/`+student.profilepicture" alt="" width="50px" class="rounded-pill mb-3" height="50px"  style="border-radius: 100%; border: none;">
        
            <img v-if="!student.profilepicture" src="../assets/images/default.jpg" alt="" width="50px" class="rounded-pill mb-3" height="50px"  style="border-radius: 100%; border: none;">
            <h5 class="ms-3 mt-3">{{student.fullname }}</h5>
         </div>
        <button type="submit" class="text-decoration-none mt-3 p-3 border rounded-4" @click="sendinvite(student.student_id)" >Send Invites</button>
        </div>
        </div>

      </div>
      <div class="modal-footer">
          <button type="button" class="btn-close me-4" data-bs-dismiss="modal" aria-label="Close"></button>
        
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title text-center  fs-5" id="exampleModalLabel">Create Post</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div>
           <div class="d-flex mt-3">
        <img :src="profilepicture" alt="" width="50px" class="rounded-pill-" height="50px"  style="border-radius: 100%; border: none;">
        <div class="ms-3 mb-5">
            <h5>{{ name }}</h5>
        </div>
        </div> 
        <textarea name="" id="" class="form-control my-3 shadow-none" v-model="content"></textarea>
    <div>
        <input type="file" class="form-control my-2" @change="handleChange">
    </div>
        </div>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" @click="createpost" data-bs-dismiss="modal">Post</button>
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
    check:true,
    studentid:"",
    profilepicture:'',
    name:"",
    group:{},
    msg:'',
    min:"",
    hour:"",
    day:'',
    content:"",
    file:"",
    grouppost:[],
    allstudents:[],
    group_id:""
}
    },
components:{
    NavBar
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
        this.profilepicture=res.data.student.profilepicture
        this.name=res.data.student.fullname
        console.log(res.data, this.profilepicture);
    })
    .catch((err) => {
        console.log(err.response?.data || err.message);
    });

    axios.post('http://127.0.0.1:8000/api/creategroup/api/allusers',{student_id:this.studentid}).then((res)=>{
       this.allstudents=res.data.students
    })

    let post={
     student_id:this.studentid,
     uniquenumber:this.$route.params.id

    }

    axios.post('http://127.0.0.1:8000/api/getgrouppost',post).then((res)=>{
            if(res.data.status==201){
    this.grouppost=res.data.posts
            }
            else if(res.data.status==501){
        this.msg=res.data.msg
            }
            
        })
        .catch((err)=>{
            this.msg=err
        })

    axios.get(`https://backendhivex.onrender.com/api/getgroup/${this.$route.params.id}`)
    .then((res)=>{
        console.log(res.data);
        
      if(res.data.status==true){
    this.group_id=res.data.group.group_id
    const givenDate = new Date(res.data.group.created_at);
    const now = new Date();

    const diffMs = now - givenDate;

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    this.day = days;
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.hour = hours;
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    this.min=minutes;
    this.group=res.data.group      
      }
      if(res.data.status==false){
       this.msg= res.data.message
      }
        
    })
    .catch((err)=>{
        this.msg = err.response?.data 
        console.log(err.response?.data || err.message);
        
    })
},

methods:{
    sendinvite(id){
        let data={
            inviter_id:this.userid,
            invitee_id:id,
            uniquenumber:this.$route.params.id
        }
        axios.post('http://127.0.0.1:8000/api/grouppostinvite',data).then((res)=>{ 
        if(res.data.status==200){
this.msg=res.data.msg
        }
        else if(res.data.status==501){
    this.msg=res.data.msg
        }
        else if(res.data.status==502){
         this.check=false
    this.msg=res.data.msg
        }
        
       })
       .catch((err)=>{
        this.msg=err
        
       })
       setTimeout(() => {
        this.msg=''
       }, 3000);
    },
    handleChange(e){
this.file=e.target.files[0]
    },
    createpost(){
        const post=new FormData()
        post.append('poster_id',this.userid)
        post.append('content',this.content)
        post.append('image',this.file)
        post.append('uniquenumber',this.$route.params.id)
        post.append('group_id',this.group_id)
        post.append('role','Admin') 
      axios.post('http://127.0.0.1:8000/api/creategrouppost',post,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
       }).then((res)=>{
        if(res.data){
            let post={
     student_id:this.userid,
     uniquenumber:this.$route.params.id

    }
axios.post('http://127.0.0.1:8000/api/getgrouppost',post).then((res)=>{
        if(res.data.status==201){
this.grouppost=res.data.posts
        }
        else if(res.data.status==501){
    this.msg=res.data.msg
        }
        
       })
       .catch((err)=>{
        this.msg=err
       })
        }  
       })
       .catch((err)=>{
        this.msg=err
       })
      
     },
}

}
</script>
 
<style scoped>
.disabled{
  pointer-events: none;
  user-select: none;
  opacity: 0.5;
}
</style>