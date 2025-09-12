<template>
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center gradient-bg">
    <div class="col-12 col-md-4">
      <div class="verification-card mx-auto p-5">
        <h4 class="text-center" style="color: rgb(0, 38, 77);">Change Password</h4>
        <div class="alert alert-primary" v-if="msg !== ''">{{ msg }}</div>
        <div class="card-body d-flex flex-column">
          <input
            v-model="password"
            type="password"
            placeholder="Enter password"
            class="form-control my-3 bg-transparent "
          />
          <input
            v-model="confirmpassword"
            type="password"
            placeholder="Confirm password"
            class="form-control my-3 bg-transparent"
          />
          <button class="btn-login mt-2 fs-5" style="background-color: rgb(0, 38, 77);" @click="changepassword">Change Password</button>
          <button class="btn  mt-2 fs-5 text-white" style="background-color: rgb(0, 38, 77)
;" @click="this.$router.push('/login')">Home</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      msg: '',
      password: '',
      confirmpassword: ''
    };
  },
  methods: {
    changepassword() {
      if(this.password === '' || this.confirmpassword === '') {
        this.msg = 'This field cannot be empty';
        return;
      } else if ((this.password?.length || 0) < 4 || (this.confirmpassword?.length || 0) < 4) {
        this.msg = 'Password must be at least 4 characters long';
        return;
      } else if(this.password !== this.confirmpassword) {
        this.msg = 'Passwords do not match';
        return;
      } else {
        axios.post('http://127.0.0.1:8000/api/passwordupdate', { password: this.password, token: this.$route.params.token })
          .then(res => {
            if(res.data.status === 200) {

              this.msg = res.data.msg;
               setTimeout(() => {
        this.$router.push({ name: 'login' });
      }, 3000);
            }
            else if(res.data.status === 501){
            this.msg = res.data.msg;
            setTimeout(() => {
        this.$router.push({ name: 'register' });
      }, 3000);
            } 
              
          })
          .catch((err) => 
          this.msg = 'Something went wrong. Try again!'+err
         
        );
      }

      this.password = '';
      this.confirmpassword = '';
     setTimeout(() => {
      this.msg=''
     }, 3000);
    }
  }
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(180deg, #f5f9ff 0%, rgba(173,216,230,0.4) 70%, rgba(255,255,255,0) 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.verification-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  color: white;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

input.form-control {
  border: 1px solid rgba(255,255,255,0.5);
  border-radius: 8px;
  padding: 10px;
   
}

input::placeholder {
  color: rgb(0, 38, 77);
  opacity: 1; 
}
.btn-login {
    background: linear-gradient(135deg, #00aaff, #ff70a6);
    border: none;
    padding: 12px;
    border-radius: 8px;
    font-weight: 600;
    color: white;
    transition: 0.3s;
}
.btn-login:hover {
    background: linear-gradient(135deg, #ff70a6, #00aaff);
    transform: translateY(-2px);
}
.btn {
  border: none;
  color: white;
  transition: all 0.3s ease;
}

.btn:hover {
  opacity: 0.9;
}

@media (max-width: 768px) {
  .verification-card {
    padding: 30px 20px;
  }
}
</style>


