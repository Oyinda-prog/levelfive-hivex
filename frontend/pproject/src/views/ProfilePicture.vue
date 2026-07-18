<template>
  <div>
    <NavBar />

    
    <div class="container-fluid  d-flex justify-content-center align-items-center  gradient-bg">
      <div class="col-12 col-md-5 col-lg-4  mt-5">
        <div class="mt-5">
          
        </div>
        <div class="mt-5">
          
        </div>
        <div class="mx-auto p-4 mt-5 shadow-lg border-0 rounded-4">
<div class="mt-5">
          
        </div>
        
          <div class="alert alert-primary text-center" v-if="msg !== ''">
            {{ msg }}
          </div>

       
          <div class="card-body text-center">
            <h4 class="fw-bold mb-2 text-primary">Update Profile Picture</h4>
            <p class="text-muted small mb-4">Choose a clear, recent photo for your profile.</p>

          
            <div class="mb-4">
              <img
                v-if="preview"
                :src="preview"
                alt="Profile Preview"
                class="rounded-circle border border-3 border-light shadow-sm profile-img"
              />
              <img
                v-else
                src="../assets/images/default.jpg"
                alt="Default Profile"
                class="rounded-circle border border-3 border-light shadow-sm profile-img"
              />
            </div>

           
            <input
              type="file"
              class="form-control mb-3 custom-file-input"
              accept="image/*"
              @change="handleProfile"
            />

         
            <button
              class="btn custom-btn w-100"
              @click="uploadPicture"
            >
              Upload Profile Picture
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default {
  components: { NavBar },

  data() {
    return {
      msg: "",
      profilepicture: "",
      userid: "",
      preview: null
    };
  },

  mounted() {
    let user = localStorage.getItem('honeyuserid');
    if(user){
      this.userid=JSON.parse(user)
    }
    else{
      this.$router.push('/login')
    }
  },

  methods: {
    handleProfile(e) {
      const file = e.target.files[0];
      if (file) {
        this.profilepicture = file;
        this.preview = URL.createObjectURL(file); 
      }
    },

    uploadPicture() {
      if (!this.profilepicture) {
        this.msg = "Please select a picture before uploading.";
        return;
      }

      const post = new FormData();
      post.append('student_id', this.userid);
      post.append('image', this.profilepicture);

      axios.post('https://backendhivex.onrender.com/api/studentprofilepicture', post, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(res => {
        if(res.data.status == 200){
          this.msg = res.data.msg || "Profile picture uploaded successfully!";
          setTimeout(() => this.$router.push('/'), 3000);
        } else if(res.data.status == 201) {
          this.msg = res.data.msg;
        }
      })
      .catch(err => {
        console.error(err);

  this.msg =
    err.response?.data?.message ||
    err.response?.data?.error ||
    JSON.stringify(err.response?.data) ||
    err.message;
        // this.msg = "An error occurred while uploading."+err;
      });

      setTimeout(() => this.msg='', 6000);
    }
  }
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(to right, rgba(79,172,254,0.04), rgba(251,40,196,0.04));
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}


.pt-navbar {
  padding-top: 100px;
}

.profile-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
}

.custom-btn {
  background: linear-gradient(90deg, #ffb6c1, #87ceeb);
  border: none;
  color: white;
  font-weight: bold;
  padding: 10px;
  border-radius: 50px;
  transition: 0.3s ease-in-out;
}

.custom-btn:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.custom-file-input {
  border-radius: 50px;
}
</style>
