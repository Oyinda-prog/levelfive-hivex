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

    <div class="col-md-1 col-12">

    </div>
      <div class="col-12 col-sm-12 col-md-6 mx-auto two offset-md-3">
        
      <div class="w-100 mx-auto shadow row p-5">
        <h5 class="" style="color:  rgb(0, 38, 77);">See who you can follow</h5>
  <div
    class="d-flex  bg-success border-2 overflow-auto gap-3 p-3 bg-light rounded shadow-sm"
    style="white-space: nowrap; height: 400px;"
  >
    <div
      class=" p-3 d-flex flex-column align-items-center"
      style="min-width: 300px;"
      v-for="student in allstudents"
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

      <!-- <div class="mt-5" v-if="student.follow_status==='follow'">
        <button class="btn btn-outline-primary" @click="follow(student.student_id,student.fullname,student.follow_status)">Unfollow</button>
      </div>
      <div class="mt-5" v-else>
        <button class="btn btn-outline-primary" @click="follow(student.student_id,student.fullname,student.follow_status)">Follow</button>
      </div> -->

      <div class="mt-5">
        <button
        v-if="student.is_following"
        class="btn btn-outline-primary"
        @click="follow(student.student_id)"
        >
        Unfollow
       </button>

       <button
        v-else
        class="btn btn-primary"
        @click="follow(student.student_id)"
       >
        Follow
       </button>
      </div>

    </div>
  </div>
</div>

 <div class="mx-auto shadow p-5" v-if="!Array.isArray(allposts)">
     <h3 class="text-center" style="color:  rgb(0, 38, 77);">No posts yet, follow friends to see posts</h3>
 </div>

        <div 
  class="col-12 shadow mb-4"
  v-for="post in allposts"
  :key="post.id"
  
>
  <div class="d-flex align-items-center gap-3 mb-2 p-3" v-if="post.student">
    <img
      :src="`http://localhost:8000/profilepictures/` + post.student.profilepicture"
      alt="profile"
      width="50"
      height="50"
      class="rounded-circle"
      style="object-fit: cover;"
    />
    <h5 class="mb-0">{{ post.student.fullname }}</h5>
  </div>

 
  <div class="mx-auto col-11">
    <p class="mb-3 content">{{ post.content }}</p>
  </div>
  
  
  <div v-if="post.post_img" class="d-flex justify-content-center mt-3">
    <img
      :src="`http://localhost:8000/postimages/` + post.post_img"
      alt="post image"
      class="rounded"
      style="width: 100%; max-width: 600px; height: 400px; object-fit: cover;"
    />
    
</div>
<hr>
<div class="row justify-content-evenly">
        <div class="col-3 " >
          <p v-if="Array.isArray(post.likes)" class="text-primary">{{ post.likes.filter(like=>like.status==1).length }} Likes</p>
        </div>
        <div class="col-4" ><p>{{ post.comments.length }} comments</p></div>
      </div>
<div class="row justify-content-evenly p-3">
<div class="col-3 ms-5">
    <div v-if="post.likes.find(like=>like.student_id == this.studentid && like.status==1 )" @click="likebutton(post.id)" style="cursor: pointer;" >
    <img src="../assets/images/liketwo.jpeg" alt="" width="15px" height="15px">
   
</div>
<div v-else @click="likebutton(post.id)" style="cursor: pointer;">
  <img src="../assets/images/likeone.jpg" alt="" width="30px" height="30px">
  
</div>
</div>
<div class="col-3">
<div style="cursor: pointer;" @click="openmodal(post)" data-bs-toggle="modal" data-bs-target="#exampleModal">
         <img  src="../assets/images/messageicon.jpg" alt="" width="20px" height="20px">
        
     </div>
</div>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body ">
       <div v-if="selectedpostimage" class=" mx-auto">


    <div v-if="selectedpostimage.post_img" class="d-flex justify-content-center m-5">
        <img
      :src="`http://localhost:8000/postimages/` + selectedpostimage.post_img"
      alt="post image"
      class="rounded"
      style="width: 100%; max-width: 600px; height: 400px; object-fit: cover;"
    />
    </div>
      
    <div class="row justify-content-around p-5">
<div class="col-3">
   <div v-if="selectedpostimage.likes.find(like=>like.student_id == this.studentid && like.status==1 )" @click="likebutton(selectedpostimage.id)" style="cursor: pointer;" >
    <img src="../assets/images/liketwo.jpeg" alt="" width="15px" height="15px">
    
</div>
<div v-else @click="likebutton(selectedpostimage.id)" style="cursor: pointer;">
  <img src="../assets/images/likeone.jpg" alt="" width="30px" height="30px">
  
</div>
</div>
<div class="col-3">
    <div style="cursor: pointer;" >
          <img  src="../assets/images/messageicon.jpg" alt="" width="20px" height="20px">
         
     </div>
''</div>
<div class="col-3">
    <div style="cursor: pointer;" >
         <img  src="../assets/images/send.png" alt="" width="20px" height="20px">
         
     </div>
</div>
<div >
    <div>
      <div  v-for="comment in selectedpostimage.comments" :key="comment.id">
     <div v-if="selectedpostimage.comments.length===0">
<p>No posts found</p>
     </div>
     <div class="row justify-content-between my-3">
<img :src="`http://localhost:8000/profilepictures/`+comment.student.profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;" class="col-auto col-sm-auto col-xxl-auto">
     <div class="col-11 col-sm-8 col-xxl-9 p-3  shadow bg-body-secondary">
      <h5> {{ comment.student.fullname ?? ''}}</h5>
      <p> {{ comment.comment ??'' }}</p>
        <div style="cursor: pointer;">
  <img src="../assets/images/likeone.jpg" alt="" width="30px" height="30px">
  <!-- <span>Like</span>  -->
  <span>
    <button class="btn btn-success" @click="replyComment(comment.id)">Reply</button></span>
      
   
</div>


<div v-if="this.replycheck===comment.id" class="my-5">
  <p>Replying to {{ comment.student.fullname }} <button @click="cancelreply()">cancel</button></p>
    <textarea name="" id="" cols="" rows="" class="form-control my-2"  v-model="reply[comment.id]"></textarea> 
    <button class="btn btn-outline-primary" @click="replies(comment.id,selectedpostimage.id)">reply</button>

    
  </div>
  <div class="shadow my-5 bg-body text-dark rounded-1 col-9 mx-auto">
  <div  v-for="replies in comment.replies" :key="replies.id">
    <div class="row justify-content-between my-3 p-3 shadow ">
    <div class="col-md-2 col-12 ">
      <img :src="`http://localhost:8000/profilepictures/`+replies.student.profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;" class="img-fluid" >
    </div>
    <div class="col-5 col-xxl-9">
      <h5>{{ replies.student.fullname }}</h5>
        <p>{{ replies.reply }}</p>
        
    </div>
    </div>
    <hr>
      </div>
</div>
     </div>
     
     </div>
    

    </div>
    
    </div>
    
<div class="d-flex my-5">
          <img :src="`http://localhost:8000/profilepictures/`+profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;">
          <textarea
  cols="10"
  rows="4"
  class="form-control ms-4"
  v-model.trim="comment[selectedpostimage.id]"
  @focus="comment[selectedpostimage.id] === 'Comment as ' + fullname ? comment[selectedpostimage.id] = '' : null"
/>

</div>

       <div @click="commentpost(selectedpostimage.id)">
        
<img  src="../assets/images/send.png" alt="" width="20px" height="20px">
    </div>
</div>
    </div>
     
</div>

      </div>
    </div>
  </div>
</div>
<div class="col-3">
    <div style="cursor: pointer;" >
         <img  src="../assets/images/send.png" alt="" width="20px" height="20px">
         <!-- <span style="margin-left: 10px;">Send</span> -->
     </div>
</div>
</div>
</div>
      </div>

      <!-- <div class=" childthree col-md-2 d-md-block d-none d-sm-none">
        <div v-if="this.otherpost">

          <p>{{ otherpost.content }}</p>
            <img
      :src="`http://localhost:8000/postimages/` + otherpost.post_img"
      alt="post image"
      class="rounded"
      style="width: 100%; max-width: 600px; height: 400px; object-fit: cover;"
    />
           
        </div>
      </div> -->

    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { useCounterStore } from '@/stores/counter';
import NavBar from './NavBar.vue';
export default {
   
data(){
        return{
    check:false,
    box:false,
    checklike:{},
    followcomment:'follow',
    allposts:[],
        comment:{},
        reply:{},
        replycheck:null,
        selectedpostimage:null,
        allcomments:[],
    allusers:[],
    commentcheck:null,
    msg:'',
    allstudents:[],
    studentid:"",
    fullname:"",
    file:'',
    allstudent:'',
    content:'',
    profilepicture:'',
    modalcheck:false,
    followingstatus:'',
    counter:useCounterStore(),
    allpost:[],
    onepost:{},
    otherpost:{},

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
      // console.log(err);
  });
  
    
     axios.get('https://backendhivex.onrender.com/api/allposts').then((res)=>{
        
      this.allpost=res.data.post
       
        
    })
    
    axios.post('https://backendhivex.onrender.com/api/allusers',{student_id:this.studentid}).then((res)=>{
   
    
       this.allstudents=res.data.students
       console.log(this.allstudents);
       
        let length=this.allstudents.length-1
        
      let c=  Math.floor(Math.random()*length)
      let obj=this.allstudents[c]
    
      this.otherpost=obj
      
      
    })
    axios.post('https://backendhivex.onrender.com/api/allfollowing',{userid:this.studentid}).then((res)=>{
        
        this.allposts=res.data.post

        
    })
    
 
  },
  
 methods:{
    viewstudent(index){
        localStorage.setItem('userindex',JSON.stringify(index))
        this.$router.push('/view')

    },
    follow(followingid){
        let user={
            follower_id:this.studentid,
            following_id:followingid,
        }  
        axios.post('https://backendhivex.onrender.com/api/follower',user).then((res)=>{
            
          if(res.data){
axios.post('https://backendhivex.onrender.com/api/allusers',{student_id:this.studentid}).then((res)=>{
     
    
       this.allstudents=res.data.students
       
      
    })
    axios.post('https://backendhivex.onrender.com/api/allfollowing',{userid:this.studentid}).then((res)=>{
  
        this.allposts=res.data.post

        
    })
          }
            if(res.data.status=='201'){
                this.msg=res.data.msg
            }
            
            else if(res.data.status=='205'){
      
     this.msg.res.data.msg
      
    
            }
            else if(res.data.status=='204'){
           
       this.msg=res.data.msg
            }
            
        })
    },
    openmodal(post) {
  this.selectedpostimage = post;
  this.comment[this.selectedpostimage.id] = 'Comment as ' + this.fullname;

},

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
        if(this.content===''){
      this.msg='This cannot be empty'

        }
        else{
        const post=new FormData()
        post.append('student_id',this.studentid)
        post.append('content',this.content)
        post.append('image',this.file)
       axios.post('https://backendhivex.onrender.com/api/post',post,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
       })
       .then((res)=>{
          if(res.data.status=='200'){
            this.msg=res.data.msg
            this.content=''
            axios.post('https://backendhivex.onrender.com/api/allfollowing',{userid:this.studentid}).then((res)=>{
        this.allposts=res.data.post
    })
}
       
        
       })
       .catch((err)=>{
        this.msg=err
        
       })
    
      }
      setTimeout(() => {
        this.msg=''
      }, 3000);
    },
comments(postid){
    
    if(this.commentcheck===postid){
        this.commentcheck=null
    }
    else{
        this.commentcheck=postid
    }
},
    commentpost(postid){
     
        let comment={
          postid,
          studentid:this.studentid,
          comment:this.comment[postid]
        }
        
        axios.post('https://backendhivex.onrender.com/api/comment',comment)
       .then((res)=>{
      
        
        if(res.data){
            axios.post('https://backendhivex.onrender.com/api/allfollowing',{userid:this.studentid}).then((res)=>{
    
        this.allposts=res.data.post
        if (this.selectedpostimage && this.selectedpostimage.id === postid) {
              this.selectedpostimage = this.allposts.find(post => post.id === postid);
            }

    })
    this.comment=''
        }
        
       })
       .catch((err)=>{
        this.msg=err
     
        
       })
    },
    replyComment(commentid){
      if(this.replycheck===commentid){
        this.replycheck=null
    }
    else{
        this.replycheck=commentid
    } 
    },
    cancelreply(){
this.replycheck=null
    },
    replies(commentid,postid){
      let replyobj={
    commentid,postid,studentid:this.studentid,
    reply:this.reply[commentid]
   }
    axios.post('https://backendhivex.onrender.com/api/reply',replyobj).then((res)=>{
      if(res.data){
        this.replycheck=null      
            axios.post('https://backendhivex.onrender.com/api/allfollowing',{userid:this.studentid}).then((res)=>{
    
        this.allposts=res.data.post
         if (this.selectedpostimage && this.selectedpostimage.id === commentid) {
              this.selectedpostimage = this.allposts.find(post => post.id === commentid);
            }
       
        
    })
           
      }
      
    }).catch((err)=>{
      this.msg=err 
    })
  
    },

    likebutton(postid){
      let like={
        postid,
        studentid:this.studentid
      }
       axios.post('https://backendhivex.onrender.com/api/like',like)
       .then((res)=>{
           if(res.data){
           
            
            axios.post('https://backendhivex.onrender.com/api/allfollowing',{userid:this.studentid}).then((res)=>{
    
        this.allposts=res.data.post
         if (this.selectedpostimage && this.selectedpostimage.id === postid) {
              this.selectedpostimage = this.allposts.find(post => post.id === postid);
            }
    })
           }
        
       })
       .catch((err)=>{
        this.msg=err
        
       })

},
 },
 
 
 computed:{

getcurrentuser(){
    return this.allstudents.find((student)=>student.student_id==this.studentid);
},
  
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
