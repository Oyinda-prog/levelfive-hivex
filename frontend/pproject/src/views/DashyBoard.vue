<template>
  <div class="container-fluid">
    
        <nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      
      
    <img :src="`http://localhost:8000/profilepictures/`+counter.returnprofile()" alt="picture"  height="80px" width="80px" style="border-radius: 100%; border: none;max-width: 100%;"><span class="honeywealths m-4">HoneyWealth App</span>
    </a>
   <button class="post" data-bs-toggle="modal" data-bs-target="#exampleModal">What's on your mind?</button>
  </div>
  
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
      </div>
      <div class="modal-body">
        <p class="text-success">{{ this.msg }}</p>
        <textarea name="" required rows="5" cols="10" id="" v-model.trim="content" class="form-control my-2" placeholder="What's on your mind?" style="width: 100%;"></textarea>
            <input type="file" class="form-control file my-2 shadow-none" @change="handleChange">
            <button :disabled="this.content===''" class="btn btn-outline-success" @click="createpost">Make a post!</button>
      </div>
      
    </div>
  </div>
</div>
</nav>
    
    <!-- {{ counter.returnprofile() }} -->
      <div class="col-lg-12 mx-auto shadow row p-5">
    <h1 class="honeywealth m-4">HoneyWealth App</h1>
    <div class="d-flex overflow-auto gap-3 p-3 bg-light rounded shadow-sm" style="white-space: nowrap;">
      <div class="card p-3" style="min-width: 250px;" v-for="student in this.allstudents" :key="student.student_id">
        <p>{{ student.fullname }}</p>
        <img :src="`http://localhost:8000/profilepictures/`+student.profilepicture" alt="picture" height="80px" width="80px" style="border-radius: 100%; border: none;">
        <div class="mt-3">
          <button class="btn btn-outline-primary" @click="follow(student.student_id)">Follow</button>
        </div>
      </div>
    </div>
</div>

    <div class="col-5 mx-auto mt-5">
        <div class="row mt-5">
          <h1 v-if="!Array.isArray(allposts)">No Posts Yet</h1>
<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 shadow  " v-for="post in allposts" :key="post.id">

    <div class="position-relative p-5 mt-5 shadow">
      <div v-if="post.post_img">
<img :src="`http://localhost:8000/postimages/`+post.post_img" alt="post image" class="img-fluid postimage" >
      </div>
        <img :src="`http://localhost:8000/profilepictures/`+post.student.profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;position: absolute;top: 5px;left: 50px;">
        <p style="position: absolute; top:12px ;left: 110px;font-size: 15px;"><b> {{ post.student.fullname }}</b></p>
        <p style="position: absolute;top: 38px;left: 110px;">{{ post.created_at }}</p>
        <p style="position: absolute;bottom: 10px;right: 100px;">{{ post.comments.length }} comments</p>
          <p style="position: absolute;bottom: 10px;right: 200px;">{{ post.likes.filter(like=>like.status==1).length }} Likes</p>
      <!-- <pre>{{post.likes}}</pre> -->
<div v-if="post.likes.find(like=>like.student_id == this.userid && like.status==1 )" @click="likebutton(post.id)" style="cursor: pointer;" >
    <img src="../assets/images/liketwo.jpeg" alt="" width="20px" height="20px"><span>Liked</span> 
</div>
<div v-else @click="likebutton(post.id)" style="cursor: pointer;">
  <img src="../assets/images/likeone.jpg" alt="" width="30px" height="30px"><span>Like</span>
</div>
     <hr>
          <div>
          </div>
     <div style="position: absolute;bottom: 10px;left: 200px;cursor: pointer;" @click="comments(post.id)">
         <img  src="../assets/images/messageicon.jpg" alt="" width="20px" height="20px"><span style="margin-left: 10px;">comment</span>
     </div>
      <div v-if="commentcheck==post.id">
        <div  v-if=" post.comments.length<1">
 <p> No comments yet</p>
 <p>Be the first to comment</p>
        </div>
         <div  v-for="comment in post.comments" :key="comment.id">
     
     <img :src="`http://localhost:8000/profilepictures/`+comment.student.profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;">
     <p> {{ comment.student.fullname ?? ''}}</p>
      <p>comment: {{ comment.comment ??'' }}</p>
      <div style="cursor: pointer;">
  <img src="../assets/images/likeone.jpg" alt="" width="30px" height="30px"><span>Like</span> <span><button class="btn btn-success" @click="replyComment(comment.id,post.id)">Reply</button></span>
</div>

    </div>
     <textarea cols="10" rows="5" class="form-control my-2" v-model.trim="comment[post.id]"></textarea>
    <p><button :disabled="this.comment===''" class="btn btn-success" @click="commentpost(post.id)">Comment</button></p>
      </div>
          
 <div class="mt-5 ">
        </div>
    <p class="content text-justify"> {{ post.content }}</p>
 </div>
    
    
    <hr>
    
</div>
    </div>
    </div>
    </div>
    
</template>

<script>
import axios from 'axios';
import { useCounterStore } from '@/stores/counter';
export default {
data(){
        return{
    check:false,
    box:false,
    checklike:{},
    followcomment:'follow',
    allposts:[],
        comment:{},
        allcomments:[],
    allusers:[],
    commentcheck:null,
    msg:'',
    allstudents:[],
    userid:JSON.parse(localStorage.getItem('honeyuserid')),
    fullname:"",
    file:'',
    allstudent:'',
    content:'',
    counter:useCounterStore()

        }
    },

  mounted(){
     
    //  this.createpost();  // Get the first set of posts
  setInterval(() => {
    // this.createpost();
  }, 5000);
      this.userid=JSON.parse(localStorage.getItem('honeyuserid'))
      axios.post('http://127.0.0.1:8000/api/dashboard',{student_id:this.userid})
     .then((res)=>{
   console.log(res.data);
    
        // this.allstudents=res.data.allstudents
        
    })
    .catch((err)=>{
        this.msg=err;
        
    })
    axios.post('http://127.0.0.1:8000/api/allusers',{student_id:this.userid}).then((res)=>{
    
        this.allstudents=res.data.allstudents
        
    })
    axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{
       
        this.allposts=res.data.post
        
    })
    // this.allposts.forEach(post => {
    //   //
      
    // });
    

 this.fullname=JSON.parse(localStorage.getItem('honeyfullname'))

 
  },
  
 methods:{
    viewstudent(index){
        localStorage.setItem('userindex',JSON.stringify(index))
        this.$router.push('/view')

    },
    follow(id){
        let user={
            follower_id:this.userid,
            follower_name:this.fullname,
            following_id:id
        }
        
        
        axios.post('http://127.0.0.1:8000/api/follower',user).then((res)=>{
         console.log(res.data);
            if(res.data.status=='201'){
                this.msg=res.data.msg
            }
            else if(res.data.status=='205'){
                // this.$router.push('/login')
    //    this.msg=res.data.msg
       this.check=true
    //    this.followcomment='Following'
            }
            else if(res.data.status=='204'){
                // this.$router.push('/login')
       this.msg=res.data.msg
            }
            
        })
    },
    handleChange(e){

this.file=e.target.files[0]
console.log(this.msg);
    },
    createpost(){
        if(this.content===''){
      this.msg='This cannot be empty'

        }
        else{
         
            
        const post=new FormData()
        post.append('student_id',this.userid)
        post.append('content',this.content)
        post.append('image',this.file)
       axios.post('http://127.0.0.1:8000/api/post',post,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
       })
       .then((res)=>{
          if(res.data.status=='200'){
            this.msg=res.data.msg
            this.content=''
            axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{
        
        this.allposts=res.data.post
    })
}
       
        
       })
       .catch((err)=>{
        this.msg=err;
        
       })
    // 
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
          studentid:this.userid,
          comment:this.comment[postid]
        }
       
        
        axios.post('http://127.0.0.1:8000/api/comment',comment)
       .then((res)=>{
        
        
        if(res.data){
            axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{
  
    
        this.allposts=res.data.post

    })
    this.comment=''
        }
     
        
       })
       .catch((err)=>{
       this.msg=err;
        
       })
    },
    replyComment(commentid,postid){
   let replyobj={
    commentid,postid,studentid:this.userid
   }
   console.log(replyobj);
   
    },
    likebutton(postid){
      let like={
        postid,
        studentid:this.userid
      }
       axios.post('http://127.0.0.1:8000/api/like',like)
       .then((res)=>{
           if(res.data){
           
            
            axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{
    
        this.allposts=res.data.post
        
    })
           }
        
       })
       .catch((err)=>{
        this.msg=err;
        
       })

},
 },
 
 
 computed:{

getcurrentuser(){
    return this.allstudents.find((student)=>student.student_id==this.userid);
},
  
  }
}
</script>

<style scoped>
.honeywealth{
    text-shadow: 2px 2px 4px blue;
}
.honeywealths{
    font-size: 17px;
    text-shadow: 2px 2px 4px green, 2px 2px 4px blue;
}
.post{
    border: 1px groove black;
    width: 200px;
    padding: 10px;
    /* height: 30px; */
    border-radius:15px;
}
/* textarea{
    border: none;
} */
.file{
    border: none;
    width: 100px;
}
.content{
    text-align: justify;
}
.postimage{
width: 100%;
max-height:500px ;
margin-top:100px;
}
</style>

