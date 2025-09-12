<template>
     
  <div class="container-fluid shadow mt-5">
   
    <div class="row shadow justify-content-between">
      
      <div class=" bg-light childone col-md-3 d-md-block d-none d-sm-none">
           <div class="d-flex flex-column p-3 gap-3 mt-2">
         <div class="d-flex my-3">
   <div><img :src="`http://localhost:8000/profilepictures/`+profilepicture" alt="picture" height="50px" width="50px" style="border-radius: 100%; border: none;"></div>
   <div><h5 class="mt-3 ms-3">{{ followername }}</h5></div>
         </div>
          <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/')">
     <img src="../assets/homepage.png" alt="img" width="41px"> 
     <h5 class="mt-3 ms-3">Home</h5>
         </div>
         <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/friend')" >
     <img src="../assets/friend.png" alt="img"> 
     <h5 class="mt-3 ms-3">Friends</h5>
         </div>
         <div class="d-flex my-2" style="cursor: pointer;" @click="this.$router.push('/feeds')">
     <img src="../assets/feed.png" alt="img" width="41px"> 
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
        <hr>
         <h6 v-if="group.length>0">Your Shortcuts</h6>
         <div v-for="g in group" :key="g.group_id" style="cursor: pointer;" @click="this.$router.push({name:'groupsparam',params:{id:g.uniquenumber}})">
        <div class="d-flex">
   <img src="../assets/images/default.jpg" alt="" width="20px" class="" v-if="!g.profilepicture">
   <img :src="`http://localhost:8000/profilepictures/`+g.profilepicture" alt="picture" height="30px" width="30px" style="border-radius: 100%; border: none;" class="col-auto col-sm-auto col-xxl-auto">
   <p class="ms-2"><strong>{{ g.name }}</strong></p> 
        </div>
         </div>
           </div>
      </div>

    </div>
      
  </div>
</template>

<script>
import axios from 'axios';
import { useCounterStore } from '@/stores/counter';
export default {
   props:['id','group'],
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
    userid:"",
    fullname:"",
    file:'',
    allstudent:'',
    content:'',
    profilepicture:'',
    modalcheck:false,
    followingstatus:'',
    counter:useCounterStore(),
    followername:"",
    allpost:[],
    onepost:{},
    otherpost:{},

        }
    },

  mounted(){
    if(!localStorage.getItem('honeyuserid')){
      this.$router.push('/login')
    }
    
    
  setInterval(() => {
    
  }, 5000);
      this.userid=JSON.parse(localStorage.getItem('honeyuserid'))
      this.profilepicture=JSON.parse(localStorage.getItem('honeyprofilepicture'))
      this.followername=JSON.parse(localStorage.getItem('honeyfullname'))  
     axios.get('http://127.0.0.1:8000/api/allposts').then((res)=>{
        this.allpost=res.data.post
    })
    
    axios.post('http://127.0.0.1:8000/api/allusers',{student_id:this.userid}).then((res)=>{ 
       this.allstudents=res.data.students
        let length=this.allstudents.length-1
      let c=  Math.floor(Math.random()*length)
      let obj=this.allstudents[c]
      this.otherpost=obj
    })
    axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{
        this.allposts=res.data.post 
    })
 this.fullname=JSON.parse(localStorage.getItem('honeyfullname'))
  },
  
 methods:{
    viewstudent(index){
        localStorage.setItem('userindex',JSON.stringify(index))
        this.$router.push('/view')
    },
    follow(id,fullname,follow_status){
        let user={
            follower_id:this.userid,
            follower_name:this.followername,
            following_id:id,
            following_name:fullname,
            follow_status
        }
        axios.post('http://127.0.0.1:8000/api/follower',user).then((res)=>{
          if(res.data){
axios.post('http://127.0.0.1:8000/api/allusers',{student_id:this.userid}).then((res)=>{
       this.allstudents=res.data.students  
    })
          }
            if(res.data.status=='201'){
                this.msg=res.data.msg
            }
            
            else if(res.data.status=='205'){
      this.msg=res.data.msg
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
      localStorage.removeItem('honeyuserid')
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
          studentid:this.userid,
          comment:this.comment[postid]
        }   
        axios.post('http://127.0.0.1:8000/api/comment',comment)
       .then((res)=>{
        console.log(res.data);
        
        if(res.data){
            axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{  
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
    commentid,postid,studentid:this.userid,
    reply:this.reply[commentid]
   }
    axios.post('http://127.0.0.1:8000/api/reply',replyobj).then((res)=>{
      if(res.data){
        this.replycheck=null   
            axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{
    
        this.allposts=res.data.post
         if (this.selectedpostimage && this.selectedpostimage.id === commentid) {
              this.selectedpostimage = this.allposts.find(post => post.id === commentid);
            } 
    })
           
this.msg=res.data.msg
      }
      
    }).catch((err)=>{
      this.msg=err 
    })
  
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
    return this.allstudents.find((student)=>student.student_id==this.userid);
},
  
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
