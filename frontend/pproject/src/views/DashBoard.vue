<template>
    <div>Dashboard</div>
    <div class="col-10 mx-auto shadow">
        <p>{{ msg }}</p>
        <div class="row">
   <div class="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-4 my-2" v-for="student in getfollow" :key="student.student_id">
   <div>
    <p> {{ student.fullname }}</p>
    <img :src="`http://localhost:8000/profilepictures/`+student.profilepicture" alt="picture" width="200px" height="200px" style="border-radius: 100%; border: 2px solid green;">
    <!-- <p>{{student.phonenumber?student.phonenumber:'No phonenumber'  }}</p> -->
    <p>
        <button class="btn btn-primary" @click="follow(student.student_id)">{{check===false?'follow':'following'}}</button>
    </p>
    <hr>
   </div>
   </div>
        </div>
    </div>
    <div>
        <h1>Make a post</h1>
       
        <div>
            <textarea name="" rows="5" cols="10" id="" v-model.trim="content" class="form-control my-2"></textarea>
            <input type="file" class="form-control my-2" @change="handleChange">
            <button class="btn btn-success" @click="createpost">Make a post!</button>
        </div>
    </div>
    <div class="col-10 mx-auto shadow">
        <p>{{ msg }}</p>
        <div class="row">
   <div class="col-sm-6 col-md-6 col-lg-3 col-xl-3 col-xxl-4 my-2" v-for="post in allposts" :key="post.id">
   <div>
    <p>fullname: {{ post.student.fullname }}</p>
    <img :src="`http://localhost:8000/postimages/`+post.post_img" alt="post image" width="200px" height="200px" style="border-radius: 100%; border: 2px solid green;">
    <!-- <p>Phonenumber:{{post.student.phonenumber?post.student.phonenumber:'No phonenumber'  }}</p> -->
    <p>Content: {{ post.content }}</p>
    <p>{{ post.created_at }}</p>
<textarea cols="10" rows="10" class="form-control my-2" v-model.trim="comment[post.id]"></textarea>
    <p><button class="btn btn-success" @click="commentpost(post.id)">Comment</button></p>
    <div v-for="comment in post.comments" :key="comment.id">
     <p>comment: {{ comment.comment ??'' }}</p>
     <p>post id: {{ comment.post_id ?? '' }}</p>
     <p>studentid: {{ comment.student_id ?? ''}}</p>
    </div>
    <hr>
   </div>
   </div>
        </div>
    </div>


</template>
<script>
import axios from 'axios';

export default{
    data(){
        return{
    check:false,
    followcomment:'follow',
    allposts:[],
        comment:{},
        allcomments:[],
    allusers:[],
    msg:'',
    allstudents:[],
    userid:"",
    fullname:"",
    file:''

        }
    },  

  mounted(){
    //  this.createpost();  // Get the first set of posts
  setInterval(() => {
    // this.createpost();
  }, 5000);
      this.userid=JSON.parse(localStorage.getItem('honeyuserid'))
    axios.get('http://127.0.0.1:8000/api/allusers').then((res)=>{
        this.allstudents=res.data.allstudents
       
    })
    axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{
    
        this.allposts=res.data.post
        
        // this.allstudents=res.data.allstudents
       
    })
//  this.allusers=JSON.parse(localStorage.getItem('allsignupusers')) || []
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
       
            if(res.data.status=='201'){
                this.msg=res.data.msg
            }
            else if(res.data.status=='205'){
           
       this.check=true
    
            }
            else if(res.data.status=='204'){
                // this.$router.push('/login')
       this.msg=res.data.msg
            }
            
        })
    },
    handleChange(e){
this.file=e.target.files[0]

    },
    createpost(){
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
          if(res.data){
            axios.post('http://127.0.0.1:8000/api/allfollowing',{userid:this.userid}).then((res)=>{
        
        this.allposts=res.data.post
        
        // this.allstudents=res.data.allstudents
        
    })
}
        
        
       })
       .catch((err)=>{
        this.msg=err
        
       })
 
      
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
        
        // this.allstudents=res.data.allstudents
        
    })
        }
       
        
       })
       .catch((err)=>{
        this.msg=err
        
       })
    }
 },
 computed:{
getfollow(){
    // let follow=this.allstudents.length
    // let random=Math.round(Math.random()*follow)
    return this.allstudents.filter((student)=>student.student_id!=this.userid);
}
  },
  }  

</script>
<style scoped>
</style>