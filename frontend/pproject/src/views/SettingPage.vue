<template>
  <div>
<NavBar/>
    <div class="container-fluid">
      <div class="d-flex justify-content-end mt-2">
        <button class="btn btn-primary btn-lg" @click="this.$router.push('/')">Home</button>
      </div>
<div class="mt-5"></div>
<div class="mt-5"></div>
      <div class="profile-header text-center text-white col-lg-8 col-12 mx-auto">
        <div class="mt-3" style="visibility: hidden;">
            Lorem, ipsum dolor sit amet consectetur adi.
        </div>
        <img
          :src="profilepicture!=''
            ? `http://localhost:8000/profilepictures/${profilepicture}`
            : require('../assets/images/default.jpg')"
          alt="picture"
          style="width: 100px; height: 100px; border-radius: 100%;"
          class="rounde w-5 mx-auto d-block object-fit "
        />
      </div>

   
      <div class="container my-4">
        <div class="row text-center">
          <div class="col">
            <h5>{{ posts.length }}</h5>
            <small>Posts</small>
          </div>
          <div class="col">
            <h5>{{ followers.length }}</h5>
            <small>Followers</small>
          </div>
          <div class="col">
            <h5>{{ following.length }}</h5>
            <small>Following</small>
          </div>
        </div>
      </div>

      <div class="container">
    
        <div class=" shadow p-3  mb-3">
          <div class="alert alert-primary " v-if="check">{{ msg }}</div>
          <div class="card-body">
            <h5 class="card-title">Bio</h5>
            <p v-if="profile.bio">{{ profile.bio }}</p>
            <div v-else class="text-center text-muted">
              <p v-if="bio==''">No bio yet.</p>
              <div class="shadow border col-md-8 col-12 mx-auto">
                <textarea
                  name=""
                  rows="10"
                  cols="10"
                  v-model="bio"
                  id=""
                  class="form-control shadow-none"
                  placeholder="Create bio......"
                ></textarea>
              </div>
              <button
                @click="createbio"
                class="btn btn-outline-primary btn-sm my-3"
                v-if="bio!=''"
              >
                Update Bio
              </button>
              <button
                v-if="bio==''"
                @click="createbio"
                class="btn btn-outline-primary btn-sm my-3"
              >
                Create Bio
              </button>
            </div>
          </div>
        </div>

      
        <div class="p-2 shadow mb-3">
          <div class="card-body">
            <h5 class="card-title my-2">Information</h5>
            <p><strong>Joined:</strong> {{ this.joinedat }}</p>
            <div class="d-flex justify-content-between">
              <span class="mt-2"><strong>Name: </strong></span>
              <input
                type="text"
                v-model="fullname"
                class="shadow-none form-control m-2"
              />
              <button class="btn btn-outline-primary" @click="editname">
                Edit Name
              </button>
            </div>
          </div>
        </div>

        <div class="shadow p-2 mb-3">
          <div class="card-body">
            <h5 class="card-title">Analytics</h5>
            <div style="max-height:300px">
              <DoughnutChart :data="chartData" :options="chartOptions" />
            </div>
          </div>
        </div>
      </div>

          </div>
  </div>
</template>

<script>
import axios from "axios";
import { Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import NavBar from "./NavBar.vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  components: {
    DoughnutChart: Doughnut,
    NavBar
  },
  data() {
    return {
      userid: "",
      profilepicture: "",
      fullname: "",
      profile: { bio: "" },
      posts: [],
      followers: [],
      following: [],
      bio: "",
      joinedat: "",
      check: false,
      msg: "",
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    chartData() {
      return {
        labels: ["Posts", "Followers", "Following"],
        datasets: [
          {
            data: [
              this.posts.length,
              this.followers.length,
              this.following.length,
            ],
            backgroundColor: [
              "rgb(0, 38, 77)",
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
            borderColor: [
              "rgba(75, 192, 192, 1)",
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1,
          },
        ],
      };
    },
  },
  mounted() {
    if (!localStorage.getItem("honeyuserid")) {
      this.$router.push("/login");
    }

    this.userid = JSON.parse(localStorage.getItem("honeyuserid"));

    axios.post("http://127.0.0.1:8000/api/getcurrentstudent", { id: this.userid })
      .then((res) => {
        if (res.data.status == 200) {
          this.profilepicture = res.data.student.profilepicture;
          this.fullname = res.data.student.fullname;
          this.bio = res.data.student.bio;
          let date = res.data.student.created_at;
          this.joinedat = new Date(date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          });
        } else if (res.data.status == 201) {
          this.msg = res.data.msg;
        }
      });

    axios
      .post("http://127.0.0.1:8000/api/mypost", { student_id: this.userid })
      .then((res) => {
        if (res.data.status == 200) {
          this.posts = res.data.post;
        }
      });

    axios
      .post("http://127.0.0.1:8000/api/allfollowers", {
        student_id: this.userid,
      })
      .then((res) => {
        if (res.data.status == 200) {
          this.followers = res.data.follower;
        }
      });

    axios
      .post("http://127.0.0.1:8000/api/allfollowing", {
        student_id: this.userid,
      })
      .then((res) => {
        if (res.data.status == 200) {
          this.following = res.data.following;
        }
      });
  },
  methods: {
    createbio() {
        if(this.bio==''){
 this.msg='Bio cannot be empty '
        }
      let obj = {
        student_id: this.userid,
        bio: this.bio,
      };
      axios.post("http://127.0.0.1:8000/api/createbio", obj).then((res) => {
        if(res.data.status==200){
            this.msg = res.data.msg;
            axios.post("http://127.0.0.1:8000/api/getcurrentstudent", { id: this.userid })
      .then((res) => {
        if (res.data.status == 200) {
          this.bio = res.data.student.bio;
          
        } 
        else if (res.data.status == 201) {
          this.msg = res.data.msg;
          this.check = true;
        }
      });

        }
        else if(res.data.status==201){
             this.msg=res.data.msg
        }
        setTimeout(() => {
          this.check = false;
        }, 3000);
      });
    },
    editname() {
      let obj = {
        student_id: this.userid,
        fullname: this.fullname,
      };
      axios.post("http://127.0.0.1:8000/api/editname", obj).then((res) => {
        if(res.data.status==200){
axios.post("http://127.0.0.1:8000/api/getcurrentstudent", { id: this.userid })
      .then((res) => {
        if (res.data.status == 200) {
          this.fullname= res.data.student.fullname;
          
        } 
        else if (res.data.status == 201) {
          this.msg = res.data.msg;
        }
      });
            this.msg = res.data.msg;
        }
        else if(res.data.status==201){
this.msg=res.data.msg
        }
        setTimeout(() => {
          this.check = false;
        }, 3000);
      });
    },

    logout() {
      localStorage.removeItem("honeyuserid");
      localStorage.removeItem("honeyprofilepicture");
      localStorage.removeItem("honeyfullname");
      this.$router.push("/login");
    },
  },
};
</script>
