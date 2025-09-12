<!-- <script>
export default{
    mounted(){
        let userindex=JSON.parse(localStorage.getItem('userindex'))
        
        this.userindex=userindex
        this.allusers=JSON.parse(localStorage.getItem('allsignupusers')) || []
     
        this.$router.push({name:'viewpage',params:{user:this.allusers[userindex]}})
    },
    data(){
        return{
            allusers:[],
            userindex:''
        }
    },
}
</script>
<template>
    
  <div v-if="allusers.length>0 && allusers[userindex]">
    <div>{{ allusers[userindex].fullname }}</div>
    <div>{{ allusers[userindex].email }}</div>
  </div>
</template> -->
<template>
  <div class="profile-page">
    <!-- Profile Header -->
    <div class="profile-header text-center text-white py-5">
      <img
        :src="profile.cover"
        alt="Cover"
        class="cover-img img-fluid w-100"
      />
      <div class="profile-info mt-n5">
        <img
          :src="profile.picture"
          alt="Profile Picture"
          class="profile-picture rounded-circle border border-3 border-white"
        />
        <h2 class="mt-3">{{ profile.name }}</h2>
        <p class="text-light">@{{ profile.username }}</p>
        <button class="btn btn-light btn-sm mt-2">Edit Profile</button>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="container my-4">
      <div class="row text-center">
        <div class="col">
          <h5>{{ profile.posts }}</h5>
          <small>Posts</small>
        </div>
        <div class="col">
          <h5>{{ profile.followers }}</h5>
          <small>Followers</small>
        </div>
        <div class="col">
          <h5>{{ profile.following }}</h5>
          <small>Following</small>
        </div>
      </div>
    </div>

    <!-- Bio & Info -->
    <div class="container">
      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <h5 class="card-title">Bio</h5>
          <p class="card-text">{{ profile.bio }}</p>
        </div>
      </div>

      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <h5 class="card-title">Skills</h5>
          <ul class="list-inline">
            <li
              v-for="(skill, index) in profile.skills"
              :key="index"
              class="badge bg-gradient px-3 py-2 m-1"
            >
              {{ skill }}
            </li>
          </ul>
        </div>
      </div>

      <div class="card shadow-sm mb-3">
        <div class="card-body">
          <h5 class="card-title">Information</h5>
          <p><strong>Location:</strong> {{ profile.location }}</p>
          <p><strong>Website:</strong> <a :href="profile.website" target="_blank">{{ profile.website }}</a></p>
          <p><strong>Joined:</strong> {{ profile.joined }}</p>
        </div>
      </div>
    </div>

    <!-- Posts Section -->
    <div class="container my-4">
      <h4 class="mb-3">Posts</h4>
      <div v-if="profile.postsList.length">
        <div
          v-for="(post, index) in profile.postsList"
          :key="index"
          class="card mb-3 shadow-sm"
        >
          <div class="card-body">
            <p>{{ post }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center text-muted py-5">
        <p>No posts yet</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  data() {
    return {
      profile: {
        cover: "https://via.placeholder.com/1200x300.png?text=Cover+Photo",
        picture: "https://via.placeholder.com/150.png?text=Profile",
        name: "John Doe",
        username: "johndoe",
        bio: "Passionate developer and tech enthusiast. Sharing thoughts on coding, design, and life.",
        skills: ["Vue.js", "Laravel", "PHP", "Bootstrap", "Docker"],
        location: "Lagos, Nigeria",
        website: "https://example.com",
        joined: "January 2025",
        posts: 12,
        followers: 250,
        following: 180,
        postsList: [
          "Excited to share my new project!",
          "Learning Vue is fun 🎉",
          "Just deployed my app with Docker 🚀"
        ]
      }
    };
  }
};
</script>

<style scoped>
/* Gradient background */
.profile-header {
  background: linear-gradient(135deg, #4facfe 0%, #ff6ec4 100%);
  position: relative;
}

.cover-img {
  height: 200px;
  object-fit: cover;
}

.profile-info {
  margin-top: -70px;
}

.profile-picture {
  width: 130px;
  height: 130px;
  object-fit: cover;
}

.badge.bg-gradient {
  background: linear-gradient(135deg, #4facfe 0%, #ff6ec4 100%);
  color: white;
  font-weight: 500;
  border-radius: 20px;
}
</style>
