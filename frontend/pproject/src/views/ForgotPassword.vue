<template>
  <div class="container-fluid vh-100 d-flex justify-content-center align-items-center gradient-bg">
    <div class="col-12 col-md-4">
      <div class="verification-card mx-auto p-5">
      <h4 class="text-center" style="color: rgb(0, 38, 77)
;">Change Password</h4>
        <div class="alert alert-primary" v-if="msg !== ''">{{ msg }}</div>
        <div class="card-body d-flex flex-column">
          <input
            v-model="email"
            type="text"
            name="email"
            placeholder="Enter valid email address"
            class="form-control my-3 bg-transparent"
          />
          <button class="btn-login mt-2 fs-5 text-white" style="background-color: rgb(0, 38, 77)
;" @click="verifyemail">Proceed</button>
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
      email: ''
    };
  },
  methods: {
    verifyemail() {
      let obj = {
        email: this.email,
        token: 'token=' + Math.ceil(Math.random() * 1000000000) + Math.ceil(Math.random() * 1000000000)
      };
      if(this.email===''){
        this.msg='Please enter your email address'
      }
      else{

        axios.post('http://127.0.0.1:8000/api/verifyemail', obj)
          .then((res) => {
            if (res.data.status == 200) {
              this.msg = res.data.msg;
              setTimeout(() => {
                this.$router.push({ name: 'passwordupdate', params: { token: res.data.token } });
              }, 3000);
            } else if (res.data.status == 501 || res.data.status == 504) {
              this.msg = res.data.msg;
            } else {
              this.msg = 'An error occurred, please try again later.';
            }
            
          }).catch((err) => {
            this.msg=err;
          });
      }
      

      setTimeout(() => {
        this.msg = '';
      }, 3000);
    }
  }
};
</script>

<style scoped>
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
  color: rgb(0, 38, 77)
;
}

.btn-outline-light {
  border: 1px solid #fff;
  color: #fff;
  transition: all 0.3s ease;
}

.btn-outline-light:hover {
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

@media (max-width: 768px) {
  .verification-card {
    padding: 30px 20px;
  }
}
</style>
